"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Sparkles, Trophy, Globe } from 'lucide-react';

export default function RoyalAcademy() {
  const [status, setStatus] = useState('IDLE'); // IDLE, LISTENING, SUCCESS, ERROR
  const [xp, setXp] = useState(0);
  const [message, setMessage] = useState("Tap to wake the Golden Voice");

  // اختراع "صدى الكلمات" بالعامية المصرية [cite: 2025-12-24]
  const startVoiceMagic = () => {
    const Recognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!Recognition) {
      setMessage("Update your browser to hear the Magic");
      return;
    }

    const mic = new Recognition();
    mic.lang = 'ar-EG'; // تفعيل اللهجة المصرية [cite: 2025-12-24]
    
    mic.onstart = () => {
      setStatus('LISTENING');
      setMessage("Gemini is listening... Say 'NOUR'");
    };

    mic.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      // التحقق من النطق بالعامية [cite: 2025-12-24]
      if (transcript.includes("نور") || transcript.toLowerCase().includes("nour")) {
        setStatus('SUCCESS');
        setXp(500);
        setMessage("MUBARAK! You brought the Light!");
      } else {
        setStatus('ERROR');
        setMessage(`You said '${transcript}', try again: 'NOUR'`);
      }
    };

    mic.onerror = () => setStatus('IDLE');
    mic.onend = () => { if(status !== 'SUCCESS') setStatus('IDLE'); };
    mic.start();
  };

  return (
    <div className={`min-h-screen transition-all duration-[2000ms] flex flex-col items-center justify-center overflow-hidden ${status === 'SUCCESS' ? 'bg-[#D4AF37]' : 'bg-[#050505]'}`}>
      
      {/* رادار التقدم الملكي */}
      <div className="fixed top-10 right-10 flex items-center gap-4 bg-white/5 p-4 rounded-full border border-white/10 backdrop-blur-xl">
        <Trophy className={status === 'SUCCESS' ? 'text-black' : 'text-[#D4AF37]'} />
        <span className={`text-2xl font-black ${status === 'SUCCESS' ? 'text-black' : 'text-white'}`}>{xp} XP</span>
      </div>

      {/* بوابة الاختراع المريخية [cite: 2025-12-24] */}
      <main className="text-center z-10">
        <motion.div
          animate={status === 'LISTENING' ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={startVoiceMagic}
          className={`w-48 h-48 mx-auto rounded-full flex items-center justify-center cursor-pointer relative shadow-2xl transition-all ${status === 'SUCCESS' ? 'bg-white' : 'bg-gradient-to-tr from-[#D4AF37] to-[#ffd700]'}`}
        >
          {status === 'LISTENING' ? <Sparkles className="w-20 h-20 text-white animate-pulse" /> : <Mic className={`w-20 h-20 ${status === 'SUCCESS' ? 'text-black' : 'text-white'}`} />}
          {status === 'LISTENING' && (
            <div className="absolute inset-0 rounded-full border-4 border-cyan-400 animate-ping" />
          )}
        </motion.div>

        <div className="mt-12 space-y-4">
          <motion.h1 
            key={message}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl font-serif tracking-[10px] uppercase ${status === 'SUCCESS' ? 'text-black' : 'text-[#D4AF37]'}`}
          >
            {status === 'SUCCESS' ? "Welcome Home" : "Yalla Masry"}
          </motion.h1>
          <p className={`text-xl font-light italic ${status === 'SUCCESS' ? 'text-black/60' : 'text-white/40'}`}>
            {message}
          </p>
        </div>
      </main>

      {/* الهوية البصرية للأكاديمية [cite: 2025-12-24] */}
      <footer className="fixed bottom-10 flex flex-col items-center gap-2">
        <div className="flex gap-2">
          <Globe className={`w-4 h-4 ${status === 'SUCCESS' ? 'text-black' : 'text-[#D4AF37]'}`} />
          <span className={`text-[10px] tracking-[10px] uppercase ${status === 'SUCCESS' ? 'text-black' : 'text-white/30'}`}>
            Nefertiti Academy • Mars Branch
          </span>
        </div>
        <div className={`h-1 w-24 rounded-full ${status === 'SUCCESS' ? 'bg-black/20' : 'bg-[#D4AF37]/20'}`}>
          <motion.div 
            animate={{ width: status === 'SUCCESS' ? '100%' : '30%' }}
            className={`h-full rounded-full ${status === 'SUCCESS' ? 'bg-black' : 'bg-[#D4AF37]'}`} 
          />
        </div>
      </footer>
    </div>
  );
}
