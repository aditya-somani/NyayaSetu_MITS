from Chatbot import query_to_english , chatbot_response , create_memory

import gradio as gr

import gradio as gr

def chatbot_interface(user_input, chat_history, session_state):
    if session_state.get("memory") is None:
        session_state["memory"] = create_memory()

    # Translate query and detect language
    trans_dict = query_to_english(user_input, session_state["memory"])
    eng_query = trans_dict["translated"]
    language = trans_dict["language"]

    # Get response
    response = chatbot_response(eng_query, session_state["memory"], language)

    # Store conversation history
    session_state["memory"]["history"].append((user_input, response))

    return "", chat_history + [(user_input, response)], session_state

def reset_chat_():
    return [], {"memory": None}

with gr.Blocks() as demo:
    session_state = gr.State(value={"memory": None})
    chatbot = gr.Chatbot([])
    user_input = gr.Textbox(placeholder="Ask something...")
    submit_btn = gr.Button("Send")
    reset_btn = gr.Button("Reset")

    outputs = [user_input, chatbot, session_state]

    user_input.submit(chatbot_interface, [user_input, chatbot, session_state], outputs)
    submit_btn.click(chatbot_interface, [user_input, chatbot, session_state], outputs)
    reset_btn.click(reset_chat_, [], [chatbot, session_state])

demo.launch()