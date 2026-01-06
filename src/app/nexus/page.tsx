"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function NexusControl() {
  const [command, setCommand] = useState("");
  const [logs, setLogs] = useState([
    { type: 'sys', text: 'Nefertiti KidsVerse OS v1.0.4 loaded...' },
    { type: 'ai', text: 'أهلاً بك يا بطل. أنا المستشارة Gemini. ماذا سنبني اليوم؟' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!command) return;
    
    setLogs([...logs, { type: 'user', text: command }]);
    // هنا سنربط لاحقاً ملفات AI Flow لمعالجة الأمر
    setCommand("");
  };

  return (
    <div className="min-h-screen bg-[#05050a] p-6 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* الجانب الأيسر: الترمنال المتقدم */}
      <div className="bg-black/50 border border-[#D4AF37]/30 rounded-3xl p-6 flex flex-col backdrop-blur-md shadow-2xl">
        <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
          <span className="ml-4 text-[10px] text-gray-500 font-mono tracking-widest uppercase">Secure Connection: Active</span>
        </div>

        <div className="flex-1 overflow-y-auto font-mono text-sm space-y-4 mb-4 custom-scrollbar">
          {logs.map((log, i) => (
            <div key={i} className={log.type === 'ai' ? 'text-[#D4AF37]' : log.type === 'user' ? 'text-white' : 'text-gray-600'}>
              {log.type === 'user' ? `> ${log.text}` : log.text}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="relative mt-auto">
          <input 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white outline-none focus:border-[#D4AF37]/50 transition-all"
            placeholder="اكتب أمرك الملكي هنا..."
            value={command}
            onChange={(e) => setCommand(e.target.value)}
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37] hover:scale-110 transition-transform">
            ⚡
          </button>
        </form>
      </div>

      {/* الجانب الأيمن: فضاء التجسيد (The Simulation) */}
      <div className="relative bg-[#D4AF37]/5 rounded-3xl border border-dashed border-[#D4AF37]/20 flex items-center justify-center overflow-hidden">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute w-[150%] h-[150%] border-[1px] border-[#D4AF37]/5 rounded-full"
        />
        <div className="text-center z-10 p-8">
          <div className="text-8xl mb-6 opacity-40">🏺</div>
          <h3 className="text-[#D4AF37] font-bold text-2xl mb-2">منطقة التجسيد الخيالي</h3>
          <p className="text-gray-500 max-w-xs mx-auto">استخدم الترمنال لاستدعاء الأفاتار أو بناء قصورك الطائرة في الكيدز فيرس</p>
        </div>
      </div>
    </div>
  );
}
