"""## Environment"""
import os
from dotenv import load_dotenv
load_dotenv()

os.environ['LANGCHAIN_TRACING_V2'] = 'true'
os.environ['LANGCHAIN_ENDPOINT'] = 'https://api.smith.langchain.com'
LANGCHAIN_API_KEY = os.getenv('LANGCHAIN_API_KEY')

GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')

PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')

MONGO_URL=os.getenv('MONGO_URL')

"""## Importing Libraries"""

from typing import List, Dict ,Literal
from datetime import datetime

# Core ML and RAG Libraries
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_google_genai import ChatGoogleGenerativeAI
from pinecone import Pinecone
from langchain_pinecone import PineconeVectorStore
from langchain_huggingface import HuggingFaceEmbeddings
from pydantic import BaseModel,Field
from functools import lru_cache
from langchain.load import dumps,loads
import pymongo
from pymongo import MongoClient

def create_memory():
    return {"history": []}  # Simple dictionary-based memory

@lru_cache(maxsize=1)
def get_llm(temp=0):
    return ChatGoogleGenerativeAI(model='gemini-2.0-flash',temperature=temp)

llm = get_llm()

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from pydantic import BaseModel, Field

class language_detector(BaseModel):
    language: str = Field(..., description="Detected Language")
    translated: str = Field(..., description="Translated to English")

def query_to_english(query:str,memory) -> dict:
    """Detects the language of the input query and translates it to English."""

    lan_example = '''{
        "language": "Hindi",
        "translated": "Hello, how are you?"
    }'''

    # history_context = memory.get("history", []) if isinstance(memory, dict) else []

    prompt = """Translate the following query to clear English while preserving its context and intent you may imporve its wordings for better understanding.
    If the query is ambiguous, you can rephrase it, but do not change its original meaning utilize this Chat history to rewrite
    this ambigous query : {memory}

    Query: {query}

    Also, detect the language of the query and store it in "language".

    Output should strictly follow this format:
    {example}
    """

    llm3 = get_llm().with_structured_output(language_detector)

    trans_template = ChatPromptTemplate.from_template(
        template=prompt,
        partial_variables={
            'example': lan_example,
            'memory': memory
            }
    )

    trans_chain = trans_template | llm3  # No need for StrOutputParser since output is structured
    return trans_chain.invoke({'query': query}).model_dump()  # Ensure structured dict output

class TalkBack(BaseModel):
    talkback: bool = Field(..., description="Talkback")

#This decide should it talkback or should go for direct retrieval which ia a little time consuming!
def should_talkback(query: str,memory) -> dict:
    """Should talkback or not"""

    # history_context = memory.get("history", []) if isinstance(memory, dict) else []

    prompt = '''
As a legal assistant for NyayaSetu,utilize memory for deciding -- only return `True` if:
    1. The query is impossible to answer without more details (e.g., "What happens?" without context)
    2. Combines 3+ unrelated legal issues
    3. Contains contradictory information
    4. Contains greeting or useless information or talk (cross check using chat_history)

    Return `False` if:
    1. Query describes a single clear legal issue
    2. User has provided sufficient context
    3. Query is a greeting or simple request
    4. User has already been asked for clarification but he choose not to based on Chat History.
    5. He asks for services we offer or other things related to website or bot.

    **Query Examples:**
    Ambiguous: "What happens if I have a problem with railway staff?"
    → `True`

    Clear: "What are my rights if RPF detains me for ticketless travel?"
    → `False`

    Ambiguous: "What can I do if police refuse to help me?"
    → `True`

    Clear: "How do I file a complaint against police misconduct during detention?"
    → `False`

    Direct ask: "Just give me the details/information/answer"
    -> `False`

    Ambigous: Based on Chat History , 2-3 clarifying questions has already been asked from the user
    -> `False`

    **User Query:** {query}

    **Chat History:** {memory}
    '''

    template = ChatPromptTemplate.from_template(
        template = prompt,
        partial_variables = {
            'memory': memory
        }
    )

    llm = get_llm().with_structured_output(TalkBack)

    chain = template | llm
    return chain.invoke({'query': query}).model_dump()['talkback']

"""## Talkback message"""

def talkback(query: str,memory,language: str) -> str:

    # history_context = memory.get("history", []) if isinstance(memory, dict) else []

    prompt = '''
    You are NyaySetu, an AI-powered legal assistant developed by Team Normally Distributed. Your goal is to refine vague user queries by asking for more details to provide accurate legal guidance.

    Also if the user require a normal response then provide it like answer to - Hi , morning etc.

    ## Context:
    - The user query may lack details, making it difficult to provide precise legal advice.
    - Use the chat history to understand the context and determine what information has already been provided.
    - Your task is to ask a single, logical follow-up question to clarify the user's intent or gather missing details.
    - Keep the follow-up question concise, polite, and relevant to the query.
    - You may ask multiple things or details in the same question so as to not irritate the user again and again.

    ## Chat History:
    {chat_history}

    ## User Query:
    {query}

    ## Response Format:
    - Reply in language as specified by the user in chat history but also see latest need (if available),secondary answer in {language} otherwise default to English.
    - Provide only one follow-up question that helps clarify the query or gather additional details. -> can include multiple questions if needed.
    - Ensure the response feels conversational and engaging.

    Reply with only the follow-up question, nothing else.
    '''

    template = ChatPromptTemplate.from_template(
        template = prompt,
        partial_variables = {
            'chat_history':memory,
            'language':language
        }
    )

    llm = get_llm(0.5)

    chain = template | llm | StrOutputParser()
    return chain.invoke({'query': query})

"""## RAG

### Retriever
"""

index_name = 'nyayasetu'
pc = Pinecone()
index = pc.Index(index_name)

embeddings = HuggingFaceEmbeddings(
        model_name="BAAI/bge-base-en-v1.5", #because our docs are written in english language that is why we used an specilised embedding model
        model_kwargs={'device': 'cpu'},
        encode_kwargs={'normalize_embeddings': True}
    )

vector_store = PineconeVectorStore(index=index,embedding=embeddings)
#Creating a retriever
retriever = vector_store.as_retriever(
    search_type = 'similarity_score_threshold',
    search_kwargs = {'k':3,'score_threshold':0.7},
)

def get_unique_union(documents:list[list]):
    """ Unique union of retrieved docs """
    # Flatten list of lists, and convert each Document to string
    flattened_docs = [dumps(docs) for sublist in documents for docs in sublist]
    # Get unique documents
    unique_docs = list(set(flattened_docs))
    #Return
    return [loads(doc) for doc in unique_docs]

class CounterDB:
    def __init__(self):
        self.client = MongoClient(os.getenv("MONGO_URL"))
        self.db = self.client.nayaSetu
        self.counters = self.db.chatstats

        # Create compound index matching your schema
        self.counters.create_index(
            [("department", 1), ("category", 1)],
            unique=True,
            name="dept_cat_index"
        )

    def update_counter(self, department: str, category: str):
        """Update counter and dates array per your schema"""
        self.counters.update_one(
            {"department": department, "category": category},
            {
                "$inc": {"counter": 1},
                "$push": {"dates": datetime.utcnow()}
            },
            upsert=True
        )

class DeptCategory(BaseModel):
    department: Literal[
        "Municipal Services",
        "Public Infrastructure",
        "Healthcare",
        "Education",
        "Transportation",
        "Public Utilities",
        "Law Enforcement",
        "Other"
    ] = Field(..., description="Primary department")

    category: Literal[
        "Corruption",
        "Misconduct",
        "Service Delays",
        "Infrastructure Issues",
        "Discrimination",
        "Other"
    ] = Field(..., description="Issue category")

def extract_dept_category(query: str) -> dict:
    prompt = ChatPromptTemplate.from_template(
        "Classify this Indian government complaint:\n\n"
        "**Departments (EXACT MATCH REQUIRED)**:\n"
        "- Municipal Services: Local governance, sanitation, property tax\n"
        "- Public Infrastructure: Roads, bridges, public buildings\n"
        "- Healthcare: Hospitals, clinics, medical services\n"
        "- Education: Schools, colleges, educational policies\n"
        "- Transportation: Buses, trains, traffic management\n"
        "- Public Utilities: Electricity, water, gas services\n"
        "- Law Enforcement: Police, FIRs, investigations\n"
        "- Other: Unclassifiable or multi-department issues\n\n"
        "**Categories (EXACT MATCH REQUIRED)**:\n"
        "- Corruption: Bribery, financial misconduct\n"
        "- Misconduct: Abuse of power, harassment\n"
        "- Service Delays: Late services, bureaucratic delays\n"
        "- Infrastructure Issues: Poor maintenance, construction defects\n"
        "- Discrimination: Unfair treatment based on identity\n"
        "- Other: Unclassifiable issues\n\n"
        "**RULES**:\n"
        "1. Choose ONE department and ONE category\n"
        "2. Use EXACT names from lists above\n"
        "3. Default to 'Other' if uncertain\n\n"
        "Complaint: \"{query}\"\n\n"
        "Output ONLY JSON with keys 'department' and 'category'"
    )

    llm = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash",
        temperature=0.1,
        convert_system_message_to_human=True
    )

    chain = prompt | llm.with_structured_output(DeptCategory)
    return chain.invoke({"query": query}).model_dump()

"""### Generation"""

def rag(query: str,memory,language:str):

    # Step 1: Extract department/category
    try:
        dept_cat = extract_dept_category(query)
    except Exception as e:
        print(f"Extraction failed: {e}")
        dept_cat = {"department": "other", "category": "other"}

    # Step 2: Update MongoDB counters - USING YOUR SCHEMA
    db = CounterDB()
    db.update_counter(dept_cat["department"], dept_cat["category"])


    query_prompt = '''
    You are a legal query optimization assistant.
     Generate 5 distinct versions of the user’s question to improve retrieval of relevant legal documents from a vector database.

    1. Make the 3 query generalised and rest 2 more concise.
    2. Try to inlcude variations of how it can be asked by user or people.

    Provide only the 5 rewritten questions separated by ',' i.e. a comma and do not include even a extra word other than these, this format is a must

    Output format : query1,query2,query3,query4,query5

    **Original Question**: {query}
    '''

    template = ChatPromptTemplate.from_template(
        template = query_prompt
    )

    generate_queries = (
        template
        | get_llm(0.3)
        | StrOutputParser()
        | (lambda x: x.split(','))
    )

    # Retrieve Docs & Merge → Use rewritten queries to get unique union of documents.
    retriever_chain = (
        generate_queries
        | retriever.map()
        | (lambda x:get_unique_union(x))
    )

    rag_docs_list = retriever_chain.invoke(query)
    rag_docs = '\n'.join(str(doc) for doc in rag_docs_list) if rag_docs_list else "No relevant RAG documents found."

    prompt = '''
You are NyayaSetu, one the best AI-powered legal assistant ,developed by Team Normally Distributed. Your primary role is to guide users through legal queries, government service issues, and complaint processes in India. You use advanced retrieval (RAG) technology to provide accurate, context-aware responses and always act with empathy and clarity.

**Services you offer:**
- **Complaint Management:** Help users submit and track complaints related to municipal services, public infrastructure, healthcare, education, transportation, public utilities, law enforcement, and more.
  - When a user files a complaint, you guide them to select the relevant category, fill in details (subject, description, location, evidence etc.), and submit the form.
  - Once submitted, the application is routed to the appropriate government authority for resolution.
  - The user will be notified of the outcome: if resolved, the process ends; if rejected, the user can either escalate the complaint to a higher authority or directly connect with a lawyer via your platform.
- **Legal Assistant:** Connect users with legal professionals for personalized advice. There are two options:
  - **Instant Connect:** For urgent matters, users can immediately speak to an available lawyer.
  - **Relevant Match:** Users can choose to be matched with a lawyer who specializes in the specific area of law related to their issue.
- **Support Chatbot:** Provide instant, AI-powered guidance for general legal and government service questions.
- **Document Verification & Other Services:** Inform users that these services are not currently available, but keep them updated about future offerings.They can see the services page on website

**How you respond:**
- Always suggest the most relevant service based on the user’s query, especially for complaints in the listed categories suggest that they can replort via our website along with the retrieved result include both but prompt our website a little more as convient and user friendly.
- For legal or procedural questions, use your retrieval system to provide authoritative information and clear guidance.
- If a user’s request cannot be addressed by your services or available data, politely inform them of the limitation and encourage them to seek help from the appropriate authority. Never provide incorrect or misleading information.
- Please do not give any link like [Website URL] instead either give the link properly or just say to search or navigate it by himself politely.

**Tone and approach:**
- Be supportive, professional, and concise.
- Guide users step-by-step through processes, ensuring they understand their options at every stage.
- Emphasize that your goal is to make legal and government services accessible and understandable for everyone.
- Do not give our website link as I have not provided it to you , so do not hallucinate you can say no if you don't understand or know but do not hallucinate
- In the case user is offensive , please tell him to stop or he may face ban.
- Do not give extra information until asked

Always act as a knowledgeable, ethical, and user-focused legal gateway.

    ## **User Query:**
    {query}

    ## **Context Information:**
    You have access to three types of information:

    1. **Conversation Memory**:
    - Summary of the conversation till now between you and the user.
    - Includes user preferences (language, tone, type of answers), major problems, and any prior responses.
    - Avoid repeating answers unless explicitly requested by the user.

    2. **Relevant Legal Documents (RAG Context)**:
    - These are snippets from legal documents , Use them to provide accurate legal references or explanations.

    3. **User Preferences**:
    - Language preference specified by the user.
    - Secondary use {language}
    - Default language is English if no preference is clear.

    ---

    ### **Data Retrieved:**
    **Conversation History:**
    {memory}

    **RAG Context (Relevant Legal Documents):**
    {rag_docs}

    ---
    Now, based on the above context, generate the best possible response for the user.
    ---
    '''

    rag_template = ChatPromptTemplate.from_template(
        template = prompt,
        partial_variables = {
            'memory':memory,
            'rag_docs':rag_docs,
            'language':language
        }
    )

    rag_chain = rag_template | get_llm(0.5) | StrOutputParser()
    return rag_chain.invoke({'query': query})

def chatbot_response(query:str,memory:list,language:str):
    intent = should_talkback(query,memory)
    if intent == True:
        return talkback(query,memory,language)
    else:
        return rag(query,memory,language)



