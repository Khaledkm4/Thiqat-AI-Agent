import os
import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from github import Github
from google import genai

# استدعاء مكتبات الـ RAG وقاعدة البيانات
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------
# التحسين المعماري: تحميل النموذج وقاعدة البيانات مرة واحدة فقط عند بدء تشغيل الخادم
# ---------------------------------------------------------
print("📥 Loading local AI Embedding model (Global Scope)...")
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
print("🧠 Connecting to Vector DB...")
vector_db = Chroma(persist_directory="./sama_vectordb", embedding_function=embeddings)
print("✅ Knowledge Base Ready!")
# ---------------------------------------------------------

class AgentRequest(BaseModel):
    github_repo: str
    target_file: str

@app.post("/api/run-agent")
async def run_agent(request: AgentRequest):
    try:
        # 1. جلب الكود من جيت هاب
        g = Github(os.getenv("GITHUB_TOKEN"))
        repo = g.get_repo(request.github_repo)
        file_content = repo.get_contents(request.target_file)
        code = file_content.decoded_content.decode("utf-8")

        # 2. الاسترجاع الذكي (RAG) من قاعدة البيانات المحلية (سيكون فورياً الآن)
        print("🔍 Searching Vector DB for relevant SAMA rules...")
        docs = vector_db.similarity_search(code, k=3) 
        retrieved_rules = "\n".join([doc.page_content for doc in docs])
        print(f"📄 Found Rules:\n{retrieved_rules}")

        # 3. التحليل والتصحيح بواسطة Gemini
        client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        prompt = f"""You are a strict SAMA compliance RegTech AI. 
Analyze this code against the following official SAMA regulations retrieved from the database:

{retrieved_rules}

CODE:
{code}

If there is a violation, fix the code and return ONLY the raw corrected Python code. Do not include markdown formatting or explanations.
"""
        response = client.models.generate_content(
            model='gemini-3.8-flash',
            contents=prompt,
        )
        corrected_code = response.text.strip().replace("```python", "").replace("```", "").strip()

        # 4. رفع التعديل إلى جيت هاب (Pull Request)
       # 4. رفع التعديل إلى جيت هاب (Pull Request)
        main_branch = repo.get_branch("main")

        # إضافة رقم فريد (Timestamp) لاسم الفرع عشان جيت هاب ما يرفضه
        unique_id = int(time.time())
        new_branch_name = f"fix/sama-compliance-rag-{unique_id}"

        # إنشاء الفرع الجديد
        repo.create_git_ref(ref=f"refs/heads/{new_branch_name}", sha=main_branch.commit.sha)

        # تحديث الملف بالكود المصحح
        repo.update_file(
            path=file_content.path,
            message="Apply SAMA compliance fixes via AI RAG Agent",
            content=corrected_code,
            sha=file_content.sha,
            branch=new_branch_name
        )

        # فتح الـ Pull Request
        pr = repo.create_pull(
            title=f"🚨 SAMA Compliance Fix (Automated - {unique_id})",
            body=f"Thiqat AI Agent detected a violation based on these rules:\n\n{retrieved_rules}",
            head=new_branch_name,
            base="main"
        )

        return {"status": "success", "pr_url": pr.html_url}
        
    except Exception as e:
        print(f"Error: {e}")
        return {"status": "error", "message": str(e)}