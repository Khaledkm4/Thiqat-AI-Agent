# 🛡️ Thiqat (ثِقَات) - Headless RegTech AI Agent

## 💡 Overview

Thiqat is a Headless RegTech AI Agent designed with a Human-in-the-Loop (HITL) architecture to ensure seamless compliance with SAMA (Saudi Central Bank) regulations in FinTech and banking software. It acts as an intelligent, proactive compliance assistant for engineering teams. 

Instead of blind automation, Thiqat scans codebase changes, cross-references them against the latest SAMA regulatory documents using Retrieval-Augmented Generation (RAG), and explicitly flags logical conflicts. When a violation is detected, the agent autonomously generates a compliant code-fix and opens a GitHub Pull Request. This empowers the lead engineer to review, approve, and merge the code, ensuring strict compliance without sacrificing human oversight.

## ⚙️ Technical Highlights

* **Human-in-the-Loop (HITL) Agentic Workflows:** Orchestrates a structured reasoning pipeline (Ingest → Audit → Propose → PR) utilizing large language models, keeping the final architectural decision in the hands of the engineer.
* **RAG & Vector Search:** Implements a robust Knowledge Base mapping SAMA regulatory frameworks for semantic retrieval using high-dimensional embeddings.
* **Dynamic Resiliency:** Engineered with dynamic LLM routing (e.g., Gemini Pro/Flash fallback) to handle API bottlenecks and ensure zero system downtime during automated compliance scans.
* **Automated CI/CD Integration:** Leverages GitHub REST APIs securely via PyGithub to automate repository cloning, file manipulation, and Pull Request generation.

## 🛠️ Tech Stack
- **Backend:** Python 3.10+, FastAPI
- **AI & Reasoning:** Google Gemini API, RAG Architecture
- **Integration:** PyGithub (GitHub REST API)
- **Vector Database:** Local Embedding & Vector Search
- **Frontend:** Next.js (React), Node.js

---

## 📸 System Demonstration & Proof of Concept
**1. Thiqat AI Dashboard:** Initiating the automated SAMA compliance scan.

<img width="2646" height="1444" alt="لقطة شاشة 2026-09-21 023238" src="https://github.com/user-attachments/assets/b760c512-f0fb-495e-80e3-8692a8396a7a" />

---

**2. AI Reasoning & Violation Detection:** The agent analyzes the code and explicitly flags SAMA regulatory violations (e.g., Requirement 1 & 4) before generating a fix.

<img width="2670" height="1060" alt="لقطة شاشة 2026-09-22 035458" src="https://github.com/user-attachments/assets/c18da165-cfd2-4c8b-86f9-1758608c1521" />

---

**3. Automated Compliance Resolution:** The agent successfully identifies logic violations, applies SAMA rules, and opens a PR with the corrected code.

<img width="2662" height="964" alt="لقطة شاشة 2026-09-22 035647" src="https://github.com/user-attachments/assets/6b5396c6-b7a1-4d29-b8b1-fd7601b62f5b" />

---

**4. RAG Execution:** Backend terminal confirming successful vector database retrieval, semantic search, and successful agentic execution.

<img width="2660" height="930" alt="لقطة شاشة 2026-09-21 023143" src="https://github.com/user-attachments/assets/0a7909db-538a-4c51-b9e4-842c59561046" />




---

## 🚀 Local Installation & Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- GitHub Personal Access Token (PAT) with `repo` permissions
- Google Gemini API Key

### 1. Backend Setup (FastAPI & Vector DB)
Navigate to the backend directory and set up the virtual environment:

```bash
cd Backend
python -m venv .venv

# Activate Virtual Environment (Windows)
.\.venv\Scripts\activate

# Activate Virtual Environment (Mac/Linux)
source .venv/bin/activate

# Install core dependencies
pip install fastapi uvicorn github python-dotenv google-genai
```

Configure your environment variables by creating a `.env` file in the `Backend` directory:

```env
GITHUB_TOKEN=your_github_token_here
GEMINI_API_KEY=your_gemini_api_key_here
```

Initialize the Local Knowledge Base (Vector DB):

```bash
python update_knowledge.py
```

Start the FastAPI Server:

```bash
uvicorn main:app --reload
```

### 2. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and start the development server:

```bash
cd frontend
npm install
npm run dev
```

---

## 🎯 How It Works (The Agent Pipeline)
1. **Trigger:** The system receives a scan request for a specific target code file (e.g., `transfer.py`).
2. **Retrieve:** The RAG system queries the vector database for relevant SAMA compliance requirements (e.g., validating transaction amounts, explicit customer authorization, and ensuring immutable audit logs).
3. **Analyze & Fix:** The AI Agent compares the target code against the retrieved financial rules. If a violation is detected, it automatically rewrites the logic to enforce compliance.
4. **Push:** The agent securely connects to the GitHub repository, creates a new branch, commits the corrected code, and opens a Pull Request for human review.
