"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Sparkles, Trophy, Globe, Lock, Volume2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NefertitiEntrance() {
  const [status, setStatus] = useState('IDLE'); // IDLE, LISTENING, SUCCESS, ERROR
  const [message, setMessage] = useState("The King is waiting for your touch...");
  const router = useRouter();

  // وظيفة نداء الملك توت عنخ آمون بالإنجليزية [cite: 2025-12-24]
  const activateRoyalVoice = () => {
    // إلغاء أي صوت معلق لضمان الاستجابة الفورية [cite: 2025-12-24]
    window.speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance(
      "Welcome, my little Pharaoh. I am King Tut. Speak the magic word NOUR to unlock the gates of your Martian adventure!"
    );
    
    msg.lang = 'en-US';
    msg.rate = 0.85; // نبرة ملكية فخمة وهادئة [cite: 2025-12-24]
    msg.pitch = 1;

    msg.onstart = () => {
      setStatus('TALKING');
      setMessage("King Tut is speaking to you...");
    };

    msg.onend = () => {
      // بمجرد انتهاء الملك من الكلام، نفتح الميكروفون تلقائياً [cite: 2025-12-24]
      startVoiceMagic();
    };

    window.speechSynthesis.speak(msg);
  };

  // وظيفة استقبال كلمة "نور" بالعامية المصرية [cite: 2025-12-24]
  const startVoiceMagic = () => {
    const Recognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!Recognition) {
      setMessage("Browser does not support voice magic.");
      return;
    }

    const mic = new Recognition();
    mic.lang = 'ar-EG'; // تفعيل الهوية المصرية [cite: 2025-12-24]
    
    mic.onstart = () => {
      setStatus('LISTENING');
      setMessage("The Oracle is listening... Say 'NOUR'");
    };

    mic.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript.trim();
      // التحقق من كلمة السر [cite: 2025-12-24]
      if (transcript.includes("نور") || transcript.toLowerCase().includes("nour")) {
        setStatus('SUCCESS');
        setMessage("MUBARAK! The Gates of Mars are Opening...");
        // انتقال ملكي للوحة التحكم بعد النجاح [cite: 2025-12-24]
        setTimeout(() => router.push('/academy'), 2500);
      } else {
        setStatus('ERROR');
        setMessage(`The King heard '${transcript}'.. Try again!`);
        setTimeout(() => setStatus('IDLE'), 3000);
      }
    };

    mic.onerror = () => {
      setStatus('ERROR');
      setMessage("Access Denied. Check your microphone settings.");
    };

    mic.start();
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center overflow-hidden font-serif">
      {/* غبار النجوم الذهبي في الخلفية [cite: 2025-12-24] */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/gold-dust.png')] opacity-20 pointer-events-none" />

      <main className="text-center z-10 px-4">
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 80px rgba(212,175,55,0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={activateRoyalVoice}
          className={`w-64 h-64 mx-auto rounded-full flex flex-col items-center justify-center cursor-pointer relative shadow-2xl transition-all duration-1000 ${
            status === 'SUCCESS' ? 'bg-[#D4AF37] scale-150' : 
            status === 'LISTENING' ? 'bg-[#ffd700] shadow-[0_0_50px_#fff]' :
            'bg-gradient-to-tr from-[#D4AF37] to-[#8B4513]'
          }`}
        >
          <AnimatePresence mode="wait">
            {status === 'SUCCESS' ? (
              <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Sparkles className="w-32 h-32 text-white animate-spin" />
              </motion.div>
            ) : (
              <motion.div key="idle" className="flex flex-col items-center">
                <Mic className={`w-20 h-20 ${status === 'LISTENING' ? 'text-white animate-pulse' : 'text-black/80'}`} />
                {status === 'IDLE' && <Volume2 className="w-6 h-6 text-black/40 mt-2 animate-bounce" />}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* حلقة النور الدورانية [cite: 2025-12-24] */}
          {status === 'LISTENING' && (
            <div className="absolute inset-0 rounded-full border-4 border-white animate-ping opacity-20" />
          )}
        </motion.div>

        <div className="mt-16 space-y-6">
          <motion.h1 
            className="text-[#D4AF37] text-4xl md:text-5xl font-bold tracking-[15px] uppercase"
            animate={status === 'SUCCESS' ? { letterSpacing: "25px", opacity: 0 } : {}}
          >
            {status === 'SUCCESS' ? "Welcome Home" : "Nefertiti Academy"}
          </motion.h1>
          
          <div className="h-12">
            <p className={`text-xl font-light italic transition-all duration-500 ${status === 'ERROR' ? 'text-red-500' : 'text-white/70'}`}>
              {message}
            </p>
          </div>
        </div>
      </main>

      {/* شريط التقدم الملكي [cite: 2025-12-24] */}
      <footer className="fixed bottom-10 flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity">
        <div className="flex gap-3 items-center">
          <Globe className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[10px] tracking-[10px] uppercase text-white">
            Mars Settlement • Sector 28
          </span>
        </div>
        <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </footer>
    </div>
  );
}
