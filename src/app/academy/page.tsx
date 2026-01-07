"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoyalDialect } from '@/lib/dialect-engine';

export default function MarsAcademy() {
  const [activeWord, setActiveWord] = useState(RoyalDialect.nurture[0]);
  const [status, setStatus] = useState('IDLE'); // IDLE, LISTENING, SUCCESS, ERROR
  const [xp, setXp] = useState(0);

  const startMagic = () => {
    const Recognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!Recognition) return alert("Space tech not supported here!");

    const mic = new Recognition();
    mic.lang = 'ar-EG';
    mic.onstart = () => setStatus('LISTENING');
    
    mic.onresult = (e: any) => {
      const result = e.results[0][0].transcript;
      if (result.includes(activeWord.word)) {
        setStatus('SUCCESS');
        setXp(prev => prev + 150);
        // صوت تشجيعي ملكي هنا
      } else {
        setStatus('ERROR');
      }
    };
    mic.start();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#D4AF37] p-8 font-serif overflow-hidden relative">
      {/* رادار المريخ الفرعوني */}
      <div className="absolute top-10 right-10 text-right">
        <p className="text-[10px] tracking-[5px] text-cyan-500">SYSTEM_STATUS: {status}</p>
        <h2 className="text-4xl font-black">XP: {xp}</h2>
      </div>

      <main className="max-w-4xl mx-auto mt-20 text-center">
        <AnimatePresence mode="wait">
          {status === 'SUCCESS' ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="py-20">
              <h1 className="text-9xl mb-4">🏆</h1>
              <h2 className="text-5xl font-bold uppercase">ممتاز يا بطل!</h2>
              <button onClick={() => setStatus('IDLE')} className="mt-10 px-8 py-3 border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition">التحدي القادم</button>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-cyan-400 mb-2 uppercase tracking-[10px]">{activeWord.hint}</p>
              <h1 className="text-8xl font-black mb-12 tracking-tighter">{activeWord.word}</h1>
              
              <motion.div 
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={startMagic}
                className={`w-40 h-40 mx-auto rounded-full border-4 flex items-center justify-center cursor-pointer shadow-[0_0_50px_rgba(212,175,55,0.2)] ${status === 'LISTENING' ? 'border-cyan-500 shadow-cyan-500/50' : 'border-[#D4AF37]'}`}
              >
                <span className="text-4xl">{status === 'LISTENING' ? '📡' : '🎤'}</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* لمسة المريخ البصرية */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#D4AF37]/10 to-transparent pointer-events-none" />
    </div>
  );
}
