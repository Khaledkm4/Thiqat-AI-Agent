import os
from dotenv import load_dotenv
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document

# تحميل مفاتيح API من ملف .env
load_dotenv()

def update_sama_regulations():
    print("🔄 Initializing Thiqat Knowledge Base Update...")
    
    # محاكاة: هنا نضع قرارات ساما الجديدة
    new_regulations = [
        "Requirement 1: All outward bank-transfer requests must explicitly validate customer authorization before processing.",
        "Requirement 2: Automatically reject any non-positive or zero amounts for any transfer.",
        "Requirement 3: Enforce a strict maximum transfer limit of 20,000 SAR per transaction. Transactions exceeding this limit must be blocked.",
        "Requirement 4: Write an immutable audit event containing the transaction identifier and authorization result BEFORE the transfer is sent."
    ]

    # تحويل النصوص إلى مستندات
    documents = [Document(page_content=reg) for reg in new_regulations]

    # الاعتماد على نموذج مفتوح المصدر ومحلي للـ Embeddings (لا يحتاج API Key!)
    print("📥 Loading local AI Embedding model (all-MiniLM-L6-v2)...")
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

    # إنشاء قاعدة البيانات الاتجاهية وحفظها في مجلد محلي
    print("🧠 Vectorizing regulations and building HNSW index...")
    vector_db = Chroma.from_documents(
        documents=documents,
        embedding=embeddings,
        persist_directory="./sama_vectordb" # المجلد الذي ستحفظ فيه البيانات
    )
    
    print("✅ Success! New SAMA regulations embedded and stored locally.")

if __name__ == "__main__":
    update_sama_regulations()