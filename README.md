# Nyayasetu: Revolutionizing Governance with a Data-Driven Legal Ecosystem

*Nyayasetu is a comprehensive data platform designed to transform governance in India by turning routine citizen interactions into actionable insights for predictive analytics and evidence-based policymaking.*



**The bot is live at:** [**Hugging Face Spaces**](https://huggingface.co/spaces/AdiSomani123/NyayaSetu_MITS)

Clone the full repo: https://github.com/aditya-somani/NyayaSetu_MITS.git
                     cd NyayaSetu


cd backend
npm install 
cp .env.example .env  
# Fill in your backend .env (PORT, MONGO_URI, JWT_SECRET, etc.)  
npm start


cd ../frontend/nyaya-setu-connect
npm install
cp .env.example .env
# Fill in your frontend .env
# Example:
# VITE_API_BASE_URL=http://localhost:8080

npm run dev


## 🎥 Demos & Presentation

-**Video Link to Site Demo(Drive):** [**View the Video**](https://drive.google.com/file/d/1jEuOTqCWiImJmlteXNLpUxf72UzySgkQ/view?usp=sharing)

-**Video Link to Bot Mockup(Drive)** [**View the Video**](https://drive.google.com/file/d/1TW_xBQuy6w05b6iSuR_WZElSlqthhgJP/view?usp=sharing)

-**Check out our presentation(Slides):** [**View the Slides**](https://docs.google.com/presentation/d/1BEnP3tiO8Sus9Y6A-NXrCugVpa1eEUGLiAyoeOA1qMw/edit?usp=sharing)

**Flow Chart of Advance RAG based ChatBot:**

<p align="center">
  <a href="https://drive.google.com/uc?export=view&id=1qyX74qsKfmrhkNBtY_ERYByv_d1aC0XR">
    <img src="https://drive.google.com/uc?export=view&id=1qyX74qsKfmrhkNBtY_ERYByv_d1aC0XR" alt="Architecture" width="600">
  </a>
</p>


## 📜 Table of Contents

- [The Problem](#-the-problem)
- [Our Solution](#-our-solution)
- [How It Works](#-how-it-works-the-governance-intelligence-flywheel)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Impact](#-impact)
- [Our Team](#-our-team)
- [Contact](#-contact)

## 🎯 The Problem

> "What’s one difference between government and private institutions that separates their decision-making? **DATA.** Government decisions today are made in the dark. While businesses use data to optimize everything, our governments lack the citizen data needed to predict problems, allocate resources, and prevent issues before they escalate."

Governance in India faces three critical challenges:
*   **Data Scarcity**: Governments often operate with fragmented and incomplete information about citizen needs, unlike private companies that leverage data for optimization.
*   **Service Fragmentation**: Citizens must navigate a complex maze of different complaint systems, information portals, and service providers, often leading to confusion and bureaucracy.
*   **Reactive Governance**: Without comprehensive data, authorities can only respond to problems after they become crises—repairing roads after accidents, adding staff after long queues, or addressing legal issues after they have multiplied.

**The result?** Citizens lose time and money, struggle to verify rules or file complaints, and find legal help to be costly and inaccessible.

## ✨ Our Solution

Nyayasetu creates India's first **integrated legal ecosystem** that transforms everyday citizen interactions into governance intelligence. Our platform offers a unified solution to these challenges.

*   **User-Friendly Complaint Portal**: A centralized hub for all government service issues. Citizens can report problems in seconds, track resolutions in real-time, and rate their experience. Each complaint becomes a valuable data point, tagged by location, service type, and resolution time.
*   **AI-Powered RAG Chatbot**: Provides instant, accurate answers in multiple languages. The AI uses intelligent follow-up questions to uncover deeper insights and patterns that traditional forms would miss.
*   **Comprehensive Lawyer Marketplace**: Connects citizens with legal help based on their specific needs or for urgent matters. The platform tracks legal service demand, highlighting where and when certain services are most needed.

> **The magic is in the integration.** These are not separate services. Every interaction, query, and service request contributes to a unified ecosystem, creating a comprehensive understanding of citizen needs.

## ⚙️ How It Works: The Governance Intelligence Flywheel

1.  **Citizen Interaction**: Citizens engage with the platform through the complaint portal, AI chatbot, or by seeking legal assistance.
2.  **Unified Data Collection**: Every interaction is captured and structured, recording the nature of the problem, its location, and the individuals affected.
3.  **Predictive Analytics & Inference**: Interactive dashboards provide government authorities with valuable insights from the collected data. (Full automation with predictive models is planned as more data is gathered.)
4.  **Proactive Governance**: Authorities receive actionable intelligence, enabling evidence-based decisions, proactive resource allocation, and effective crisis prevention.

## 🚀 Key Features

| Feature | Description |
| :--- | :--- |
| **Advanced RAG Chatbot** | Provides instant, multilingual support and gathers deep contextual data. |
| **Smart Ticketing System** | Manages, tracks, and analyzes citizen complaints and queries efficiently. |
| **Legal Support Platform** | Connects citizens with lawyers and provides insights into legal needs. |
| **Analytics Dashboard** | Offers AI-driven insights for authorities to make data-informed decisions. |

## 💻 Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, Chart.js/Recharts |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose (ODM) |
| **AI & ML** | LangChain, VectorDB, Gemini |
| **File Storage**| Multer |

## 🛠️ Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites
*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   `npm` (comes with Node.js)
*   `git`

### Installation
1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Atulkhiyani0909/NyayaSetu.git
    cd NyayaSetu
    ```
2.  **Install Backend Dependencies:**
    ```sh
    cd backend
    npm install
    ```
3.  **Install Frontend Dependencies:**
    ```sh
    cd ../frontend
    npm install
    ```
4.  **Set up Environment Variables:**
    *   In both the `frontend` and `backend` directories, rename `.env.example` to `.env`.
    *   Fill in the required environment variables as described in the files.
5.  **Run the Development Servers:**
    *   **Backend**: In the `/backend` directory, run:
        ```sh
        npm run dev
        ```
        The backend server will typically start on `http://localhost:8080`.
    *   **Frontend**: In the `/frontend` directory, run:
        ```sh
        npm run dev
        ```
        The Vite development server will start, usually at `http://localhost:5173`.
6.  **Access the Application:**
    Open your browser and navigate to the frontend URL (e.g., `http://localhost:5173`) to use the platform.

## 📈 Impact

*   **Reduces corruption** by promoting transparency and direct citizen engagement.
*   **Saves time and money** for both citizens and government officials.
*   **Boosts efficiency and trust** in government services.
*   **Creates a feedback loop** that continuously improves governance.

## 🤝 Our Team

*   **Aditya Somani** – AI Engineer | Developed the Advanced RAG chatbot and data extraction pipeline.
*   **Annepu Pawan Kumar** , **Atul Khiyani** & **Sumit Thakur** – Full-Stack Developers | Crafted the entire website, backend logic, and user-centric software.

## 📫 Contact

For inquiries or collaboration, please reach out to us.
*   **Email(Yes, it is real!)**: [nyayasetportal@gmail.com](mailto:nyayasetportal@gmail.com)

> **Nyayasetu turns every citizen interaction into actionable intelligence, paving the way for transparent, efficient, and citizen-centric governance.**
