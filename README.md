# Nyayasetu: Revolutionizing Governance with a Data-Driven Legal Ecosystem

*Nyayasetu is a comprehensive data platform designed to transform governance in India by turning routine citizen interactions into actionable insights for predictive analytics and evidence-based policymaking.*

**The Site is live at:** - **https://nyayasetu-mits-1.onrender.com/**

**The bot is live at:** [**Hugging Face Spaces**](https://huggingface.co/spaces/AdiSomani123/NyayaSetu_MITS)

(See the Getting Started to run it locally from the Table of Contents)


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

## Getting Started

Follow these steps to get a local copy up and running.

Certainly! Here's a clean, well-formatted section you can include in your README file to guide users on running your project:

## 🚀 Running the Project Locally

Follow these steps to set up and run both the backend and frontend servers.

**Clone the full repo:** 
```bash
https://github.com/aditya-somani/NyayaSetu_MITS.git
```

**Then move to**: 
```bash
cd NyayaSetu
```

**Then follow the following steps:**

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

> **Configure your backend `.env` file** with the following variables:

```env
PORT=8080
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm start
```

### 2. Frontend Setup

```bash
cd ../frontend/nyaya-setu-connect
npm install
cp .env.example .env
```

> **Configure your frontend `.env` file** with the following example:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Start the frontend development server:

```bash
npm run dev
```

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
