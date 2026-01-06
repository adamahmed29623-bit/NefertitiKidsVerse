"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NexusControl() {
  const [command, setCommand] = useState("");
  const [visualState, setVisualState] = useState("idle"); // idle, avatar, building
  const [logs, setLogs] = useState([
    { type: 'sys', text: 'Nefertiti KidsVerse OS v1.0.4 initialized...' },
    { type: 'ai', text: 'أهلاً بك يا بطل في نكسوس. اكتب "خلق" لبدء تجسيد هويتك الملكية.' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = command.trim();
    if(!cmd) return;
    
    setLogs(prev => [...prev, { type: 'user', text: cmd }]);

    // محاكاة منطق الذكاء الاصطناعي (AI Flow Logic)
    if(cmd.includes("خلق") || cmd.includes("avatar")) {
      setVisualState("loading");
      setTimeout(() => {
        setVisualState("avatar");
        setLogs(prev => [...prev, { type: 'ai', text: 'تم استدعاء الأفاتار الملكي بنجاح! انظر لجهة اليمين.' }]);
      }, 2000);
    } else if(cmd.includes("بناء") || cmd.includes("build")) {
      setVisualState("building");
      setLogs(prev => [...prev, { type: 'ai', text: 'جاري تشييد معبد النيون... انتظر المعجزة.' }]);
    }

    setCommand("");
  };

  return (
    <div className="min-h-screen bg-[#05050a] p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* الجانب الأيسر: الترمنال الذكي */}
      <div className="bg-black/80 border border-[#D4AF37]/30 rounded-3xl p-6 flex flex-col backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-4 text-[10px] text-[#D4AF37] font-mono uppercase tracking-[0.2em]">Quantum Link: Secured</span>
        </div>

        <div className="flex-1 overflow-y-auto font-mono text-sm space-y-4 mb-4 pr-2">
          {logs.map((log, i) => (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={i} 
              className={log.type === 'ai' ? 'text-[#D4AF37]' : log.type === 'user' ? 'text-white' : 'text-gray-600'}>
              {log.type === 'user' ? `> ${log.text}` : log.text}
            </motion.div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="relative mt-auto">
          <input 
            className="w-full bg-white/5 border border-[#D4AF37]/20 rounded-xl py-4 px-6 text-white outline-none focus:border-[#D4AF37] transition-all font-mono"
            placeholder="أدخل شفرة الأمر..."
            value={command}
            onChange={(e) => setCommand(e.target.value)}
          />
        </form>
      </div>

      {/* الجانب الأيمن: فضاء التجسيد الخيالي (Visual Engine) */}
      <div className="relative bg-[#D4AF37]/5 rounded-3xl border border-[#D4AF37]/10 flex items-center justify-center overflow-hidden shadow-inner">
        <AnimatePresence mode="wait">
          {visualState === 'idle' && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }} className="text-center">
              <div className="text-9xl mb-4 grayscale">🏺</div>
              <p className="text-[#D4AF37] font-mono tracking-widest text-sm">SYSTEM_READY: WAITING_FOR_INPUT</p>
            </motion.div>
          )}

          {visualState === 'loading' && (
            <motion.div key="loading" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 border-t-2 border-[#D4AF37] rounded-full" />
          )}

          {visualState === 'avatar' && (
            <motion.div key="avatar" initial={{ scale: 0, rotate: 180 }} animate={{ scale: 1, rotate: 0 }} className="text-center">
               <div className="w-48 h-48 bg-[#D4AF37] rounded-full flex items-center justify-center text-8xl shadow-[0_0_60px_#D4AF37]">👤</div>
               <h2 className="mt-8 text-[#D4AF37] text-2xl font-black uppercase tracking-tighter">الهوية الرقمية مفعلة</h2>
            </motion.div>
          )}
          
          {visualState === 'building' && (
            <motion.div key="building" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center">
               <div className="text-9xl shadow-glow">🏛️</div>
               <h2 className="mt-8 text-white text-2xl font-black italic">جاري التشييد المعماري...</h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
