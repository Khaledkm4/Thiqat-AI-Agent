"use client";
import { useState } from "react";

export default function Home() {
  // حالات لوحة التحكم: idle, processing, success, denied
  const [status, setStatus] = useState("idle");
  const [prUrl, setPrUrl] = useState("");

  // دالة زر Modify (تطبيق الإصلاح عبر الذكاء الاصطناعي)
  const handleModify = async () => {
    setStatus("processing");
    try {
      const res = await fetch("http://127.0.0.1:8000/api/run-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          github_repo: "Khaledkm4/thiqat-demo",
          target_file: "transfer.py",
        }),
      });
      const data = await res.json();
      
      if (data.status === "success") {
        setStatus("success");
        if (data.pr_url) setPrUrl(data.pr_url);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  // دالة زر Deny (رفض العملية)
  const handleDeny = () => {
    setStatus("denied");
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-300 font-sans selection:bg-emerald-500/30">
      {/* شريط التنقل (Navbar) */}
      <header className="border-b border-slate-800/60 bg-[#0a0e17]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <h1 className="text-xl font-bold text-white tracking-wide">THIQAT<span className="text-emerald-500">.AI</span></h1>
            </div>
            <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
              <span className="text-emerald-400 cursor-pointer">Live Audit</span>
              <span className="hover:text-slate-200 cursor-pointer transition-colors">Policies</span>
              <span className="hover:text-slate-200 cursor-pointer transition-colors">Integrations</span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              SAMA Engine Active
            </div>
          </div>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Compliance Incident #892</h2>
            <p className="text-slate-400 text-sm mt-1">Detected a regulatory violation in recent commit on <code className="text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">main</code> branch.</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500 font-mono">TIMESTAMP</div>
            <div className="text-sm font-medium text-slate-300">Just now</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* العمود الأول: محرر الكود */}
          <div className="lg:col-span-2 flex flex-col rounded-xl border border-slate-800 bg-[#0d121c] shadow-2xl overflow-hidden relative">
            {/* شريط عنوان الكود */}
            <div className="h-12 border-b border-slate-800 bg-[#111724] flex items-center px-4 justify-between">
              <div className="flex items-center gap-2 text-sm font-mono text-slate-400">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                transfer.py
              </div>
              <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded text-xs font-semibold tracking-wider">CRITICAL</span>
            </div>
            
            {/* الكود نفسه */}
            <div className="p-6 font-mono text-sm overflow-x-auto leading-loose text-slate-300">
              <div className="text-slate-500 select-none">
                12 | def handle_transfer(amount, user_id):<br/>
                13 |     # Initialize transaction processing<br/>
                14 |     <span className="text-pink-500">if</span> (amount {"<="} 0):<br/>
                15 |         <span className="text-pink-500">return</span> False
              </div>
              <div className="relative my-4">
                <div className="absolute inset-0 bg-red-500/10 border-l-4 border-red-500 -mx-6 px-6 pointer-events-none"></div>
                <div className="relative text-red-200">
                  16 |     <span className="line-through text-red-400/70">tx_id = generate_tx_id()</span> <span className="text-red-400"># ❌ SAMA VIOLATION</span><br/>
                  17 |     authorize(amount, user_id)
                </div>
              </div>
              <div className="text-slate-500 select-none">
                18 |     <span className="text-pink-500">return</span> tx_id
              </div>
            </div>
          </div>

          {/* العمود الثاني: لوحة تحكم الذكاء الاصطناعي */}
          <div className="flex flex-col rounded-xl border border-slate-800 bg-[#0d121c] shadow-2xl relative overflow-hidden">
            {/* تأثير إضاءة علوي */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 className="text-lg font-bold text-white">AI Analysis</h3>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4 mb-6">
                <div className="text-xs text-slate-400 font-semibold mb-1 uppercase tracking-wider">Reasoning</div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The current logic generates a transaction ID <span className="text-red-400 font-bold">before</span> authorization. This violates <strong className="text-white">SAMA Reg 2026-001</strong> (Requirement 4) which mandates an immutable audit event strictly prior to transfer execution.
                </p>
              </div>

              {/* أزرار الإجراءات */}
              <div className="mt-auto space-y-3">
                {status === "idle" && (
                  <>
                    <button 
                      onClick={handleModify}
                      className="w-full group relative flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                      Modify via AI Agent
                    </button>
                    <button 
                      onClick={handleDeny}
                      className="w-full flex justify-center items-center gap-2 bg-transparent hover:bg-slate-800 text-slate-400 hover:text-red-400 border border-slate-700 hover:border-red-900/50 font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                      Deny & Ignore
                    </button>
                  </>
                )}

                {status === "processing" && (
                  <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-800/30 border border-slate-700 rounded-lg">
                    <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                    <span className="text-sm font-medium text-emerald-400 animate-pulse">Generating GitHub Patch...</span>
                  </div>
                )}

                {status === "success" && (
                  <div className="w-full flex flex-col items-center justify-center p-5 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-sm font-bold text-white mb-4">Patch Successfully Committed!</span>
                    <a 
                      href={prUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="w-full flex justify-center items-center gap-2 bg-white text-slate-900 hover:bg-slate-200 font-bold py-2.5 px-4 rounded-md transition-colors"
                    >
                      {/* أيقونة جيت هاب */}
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
                      View Real Pull Request
                    </a>
                  </div>
                )}

                {status === "denied" && (
                  <div className="w-full p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-center">
                    <span className="text-red-400 font-bold block mb-1">Incident Closed</span>
                    <span className="text-xs text-red-300/70">You chose to ignore this violation.</span>
                    <button onClick={() => setStatus("idle")} className="mt-3 text-xs text-slate-400 hover:text-white underline">Reopen Ticket</button>
                  </div>
                )}
                
                {status === "error" && (
                  <div className="w-full p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-center">
                    <span className="text-red-400 font-bold block">Backend Disconnected</span>
                    <span className="text-xs text-slate-400 mt-1 block">Please start FastAPI</span>
                    <button onClick={() => setStatus("idle")} className="mt-3 text-xs text-white bg-slate-700 px-3 py-1 rounded">Reset</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}