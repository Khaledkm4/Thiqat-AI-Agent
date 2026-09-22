# Thiqat (ثِقَات) - Autonomous RegTech AI Agent

<img width="2628" height="1428" alt="لقطة شاشة 2026-09-21 022316" src="https://github.com/user-attachments/assets/1048032a-9700-42a7-a843-3e58e4eb3a2c" />


Thiqat is an enterprise-grade Autonomous Regulatory Technology (RegTech) AI Agent designed to ensure seamless and continuous codebase compliance with the Saudi Central Bank (SAMA) regulations. 

By leveraging a local Retrieval-Augmented Generation (RAG) architecture and Large Language Models, Thiqat continuously monitors regulatory updates, scans repositories for compliance violations, and automatically generates corrective Python code via GitHub Pull Requests.

## 🌟 Proof of Concept (Autonomous Execution)

When a compliance violation is detected, the AI Agent acts independently to resolve it:
1. Performs semantic search on the local Vector DB to retrieve SAMA regulations.
2. Rewrites the logic to achieve strict compliance.
3. Automatically opens a PR with the corrected logic and regulatory justification.

<img width="2662" height="964" alt="لقطة شاشة 2026-09-22 035647" src="https://github.com/user-attachments/assets/a03baa4d-a2be-4e82-ab41-8080e778a52d" />


## 🏗️ System Architecture

* **Knowledge Ingestion (Vector DB):** SAMA regulatory documents are processed and embedded locally using HuggingFace (`all-MiniLM-L6-v2`) and stored in a ChromaDB instance utilizing HNSW vector search algorithms.
* **Semantic Auditor:** Upon execution, the agent retrieves the target codebase and performs a semantic search against the Vector DB to extract the top-K relevant compliance rules.
* **Enterprise Fallback System:** Implements a dynamic failover mechanism that automatically routes requests through a hierarchy of LLMs (Gemini Flash/Pro) to bypass `503 Service Unavailable` API bottlenecks and ensure zero downtime.

<img width="2660" height="930" alt="لقطة شاشة 2026-09-21 023143" src="https://github.com/user-attachments/assets/e6d4cc53-b248-449d-b571-5c7415d102b5" />



## 🚀 Local Installation & Setup

### Prerequisites
* Python 3.10+
* Node.js 18+
* GitHub Personal Access Token (PAT)
* Google Gemini API Key

### 1. Backend Setup (FastAPI & Vector DB)
Navigate to the backend directory and set up the virtual environment:

```bash
cd Backend
python -m venv .venv

# Activate Virtual Environment (Windows)
.\.venv\Scripts\activate

# Install core dependencies
pip install fastapi uvicorn github python-dotenv google-genai langchain-huggingface langchain-chroma sentence-transformers pydantic
