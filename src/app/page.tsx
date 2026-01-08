"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Sparkles, Trophy, Globe, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NefertitiEntrance() {
  const [status, setStatus] = useState('IDLE');
  const [message, setMessage] = useState("Waiting for the King's Command...");
  const router = useRouter();

  // 1. نداء الملك توت عند تحميل الصفحة [cite: 2025-12-24]
  useEffect(() => {
    const speakKingTut = () => {
      const msg = new SpeechSynthesisUtterance(
        "Welcome, my little Pharaoh. I am King Tut. Speak the magic word NOUR to unlock the gates of your Martian adventure!"
      );
      msg.lang = 'en-US';
      msg.rate = 0.85; // نبرة ملكية رزينة
      msg.pitch = 1;
      window.speechSynthesis.speak(msg);
      setMessage("King Tut has spoken: Say 'NOUR'");
    };

    // مهلة ثانية واحدة ليبدأ المشهد [cite: 2025-12-24]
    const timer = setTimeout(speakKingTut, 1000);
    return () => clearTimeout(timer);
  }, []);

  // 2. وظيفة استقبال كلمة السر "نور" [cite: 2025-12-24]
  const startVoiceMagic = () => {
    const Recognition = (window as any).SpeechRecognition || (window as any).webkitRecognition;
    if (!Recognition) return;

    const mic = new Recognition();
    mic.lang = 'ar-EG';
    
    mic.onstart = () => {
      setStatus('LISTENING');
      setMessage("Listening for the magic word...");
    };

    mic.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript.trim();
      if (transcript.includes("نور") || transcript.toLowerCase().includes("nour")) {
        setStatus('SUCCESS');
        setMessage("MUBARAK! The Gates are Opening...");
        // انتقال ملكي للوحة التحكم بعد ثانيتين [cite: 2025-12-24]
        setTimeout(() => router.push('/academy'), 2000);
      } else {
        setStatus('ERROR');
        setMessage(`I heard '${transcript}'.. Try again`);
        setTimeout(() => setStatus('IDLE'), 2000);
      }
    };
    mic.start();
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
      {/* هالة الملك توت الظلية في الخلفية [cite: 2025-12-24] */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/gold-dust.png')] pointer-events-none"
      />

      <main className="text-center z-10 px-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={startVoiceMagic}
          className={`w-64 h-64 mx-auto rounded-full flex items-center justify-center cursor-pointer relative shadow-2xl transition-all duration-1000 ${status === 'SUCCESS' ? 'bg-[#D4AF37] scale-150' : 'bg-gradient-to-tr from-[#D4AF37] to-[#8B4513]'}`}
        >
          {status === 'SUCCESS' ? (
            <Sparkles className="w-32 h-32 text-white animate-spin" />
          ) : (
            <div className="relative">
              <Mic className="w-24 h-24 text-black animate-pulse" />
              <Lock className="absolute -top-4 -right-4 w-10 h-10 text-black/50" />
            </div>
          )}
        </motion.div>

        <div className="mt-16 space-y-4">
          <h1 className="text-[#D4AF37] text-4xl font-serif tracking-[12px] uppercase">
            {status === 'SUCCESS' ? "The Gates Open" : "King Tut's Portal"}
          </h1>
          <p className="text-white/60 text-xl font-light italic max-w-md mx-auto">
            "{message}"
          </p>
        </div>
      </main>

      <footer className="fixed bottom-10 opacity-30">
        <div className="flex gap-2 items-center">
          <Globe className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[8px] tracking-[8px] uppercase text-white">
            Nefertiti Academy • Mars Branch
          </span>
        </div>
      </footer>
    </div>
  );
}
