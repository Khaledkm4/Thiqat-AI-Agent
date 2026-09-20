Thiqat (ثِقَات) - Autonomous RegTech AI Agent
Thiqat (meaning Trustworthy or Reliable in Arabic) is an advanced autonomous AI agent designed for the Regulatory Technology (RegTech) landscape. It leverages Multi-Agent Systems (MAS) and Retrieval-Augmented Generation (RAG) to automate compliance monitoring, regulatory change management, and risk assessment for financial institutions and legal entities.

The agent is built to parse complex regulatory frameworks, compare them against internal corporate policies, and provide actionable insights with high precision and auditability.
Core Features
Autonomous Regulatory Monitoring: Periodically scans global and local regulatory bodies for updates.
Gap Analysis Engine: Automatically identifies discrepancies between new regulations and existing internal documentation.
Intelligent RAG Pipeline: Context-aware retrieval of legal clauses using hybrid search (Vector + Keyword).
Multi-Agent Orchestration: Specialized agents for research, drafting, and compliance validation.
Multilingual Support: Native support for Arabic and English regulatory texts.
Architecture
Thiqat utilizes a modular architecture powered by a "Brain" (Orchestrator) that delegates tasks to specialized sub-agents.

Ingestion Layer: Connectors for PDF, HTML, and API-based regulatory feeds.
Cognitive Layer (LangGraph): Manages the state and logic flow between agents.
Knowledge Base: A vector database (Pinecone/Milvus) storing indexed regulatory frameworks and internal policies.
Feedback Loop: A human-in-the-loop (HITL) interface for compliance officers to verify agentic outputs.
Tech Stack
Component
Technology
Orchestration
LangChain, LangGraph
LLMs
GPT-4o, Claude 3.5 Sonnet (Primary), Llama 3 (Local)
Backend
Python 3.10+, FastAPI
Vector Database
Pinecone / Qdrant
Database
PostgreSQL (with pgvector)
Frontend
Streamlit / React (for dashboard)

Project Structure
thiqat-ai/

├── agents/             # Custom agent definitions (Analyst, Researcher, Reviewer)

├── chains/             # Specialized LangChain sequences

├── data/               # Local storage for regulatory documents

├── db/                 # Vector store and SQL configurations

├── schemas/            # Pydantic models for data validation

├── tests/              # Unit and integration tests

├── .env.example        # Environment variables template

├── main.py             # Entry point for the FastAPI server

└── requirements.txt    # Python dependencies
Setup Instructions
Follow these steps to deploy Thiqat AI in your local environment.
Prerequisites
Python 3.10 or higher
A valid API key for OpenAI or Anthropic
Access to a Vector Database (local or cloud instance)
Installation
Clone the Repository:git clone https://github.com/thiqat-ai/core.git

cd core

Create a Virtual Environment:python -m venv venv

source venv/bin/activate  # On Windows: venv\Scripts\activate

Install Dependencies:pip install -r requirements.txt
Configuration
Create a .env file in the root directory and populate it with your credentials:OPENAI_API_KEY=your_openai_key_here

ANTHROPIC_API_KEY=your_anthropic_key_here

PINECONE_API_KEY=your_pinecone_key_here

DATABASE_URL=postgresql://user:password@localhost:5432/thiqat_db
Running the Application
Initialize the Database:python scripts/init_db.py
Launch the API Server:uvicorn main:app --reload
Access the Dashboard:
Navigate to http://localhost:8000/docs to interact with the API via Swagger UI.
Usage Example
To run a compliance check on a specific document, use the following endpoint:curl -X 'POST' \

  'http://localhost:8000/api/v1/compliance/check' \

  -H 'Content-Type: application/json' \

  -d '{

  "document_id": "policy_ref_001",

  "regulatory_framework": "SAMA_Banking_Rules_2024"

}'
License
This project is licensed under the Apache License 2.0. See the LICENSE file for more details.
Contributors
Person - Lead Architect
Person - AI Engineer

For support or collaboration inquiries, please contact Person or visit Place.
