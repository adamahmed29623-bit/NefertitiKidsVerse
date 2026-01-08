"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RoyalEntrance() {
  const [status, setStatus] = useState('IDLE'); // IDLE, TALKING, LISTENING, SUCCESS
  const [message, setMessage] = useState("Touch the Ankh to hear King Tut");
  const router = useRouter();

  const activateKingTut = () => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(
      "Welcome, my little Pharaoh. I am King Tut. Speak the magic word NOUR to unlock the gates of your Martian adventure!"
    );
    msg.lang = 'en-US';
    msg.rate = 0.85;

    msg.onstart = () => {
      setStatus('TALKING');
      setMessage("King Tut is speaking...");
    };

    msg.onend = () => {
      startVoiceMagic();
    };

    window.speechSynthesis.speak(msg);
  };

  const startVoiceMagic = () => {
    const Recognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!Recognition) return;

    const mic = new Recognition();
    mic.lang = 'ar-EG';
    
    mic.onstart = () => {
      setStatus('LISTENING');
      setMessage("Now, say the magic word: 'NOUR'");
    };

    mic.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript.trim();
      if (transcript.includes("نور") || transcript.toLowerCase().includes("nour")) {
        setStatus('SUCCESS');
        setMessage("MUBARAK! Opening the Golden Gates...");
        setTimeout(() => router.push('/academy'), 2000);
      } else {
        setStatus('IDLE');
        setMessage("The King didn't hear 'NOUR'. Try again!");
      }
    };
    mic.start();
  };

  return (
    <div className="min-h-screen bg-[#002366] flex flex-col items-center justify-center relative overflow-hidden font-serif">
      {/* تأثير الغبار الذهبي على الخلفية الزرقاء الملكية [cite: 2025-12-24] */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/gold-dust.png')] opacity-30 pointer-events-none" />
      
      {/* المحتوى المركزي [cite: 2025-12-24] */}
      <main className="z-10 flex flex-col items-center text-center px-6">
        
        {/* زر مفتاح الحياة (The Ankh Button) [cite: 2025-12-24] */}
        <motion.div
          onClick={activateKingTut}
          whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 30px #D4AF37)" }}
          whileTap={{ scale: 0.9 }}
          animate={status === 'TALKING' || status === 'LISTENING' ? { 
            filter: ["drop-shadow(0 0 20px #D4AF37)", "drop-shadow(0 0 60px #ffd700)", "drop-shadow(0 0 20px #D4AF37)"]
          } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
          className="cursor-pointer mb-12"
        >
          {/* رسم مفتاح الحياة بالـ SVG ليكون واضحاً ويلمع [cite: 2025-12-24] */}
          <svg width="120" height="200" viewBox="0 0 100 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10C35 10 25 22 25 35C25 55 50 75 50 75C50 75 75 55 75 35C75 22 65 10 50 10Z" stroke="#D4AF37" strokeWidth="8" fill={status === 'SUCCESS' ? "#D4AF37" : "transparent"} className="transition-all duration-1000"/>
            <path d="M50 75V150" stroke="#D4AF37" strokeWidth="8" strokeLinecap="round"/>
            <path d="M20 90H80" stroke="#D4AF37" strokeWidth="8" strokeLinecap="round"/>
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={message}
          className="space-y-6"
        >
          <h1 className="text-[#D4AF37] text-4xl md:text-6xl font-black tracking-[10px] uppercase drop-shadow-lg">
            NEFERTITI ACADEMY
          </h1>
          
          <div className="h-10">
            <p className="text-white text-xl md:text-2xl font-light italic tracking-widest opacity-90 transition-all">
              {status === 'SUCCESS' ? <Sparkles className="inline mr-2" /> : null}
              {message}
            </p>
          </div>
        </motion.div>

        {status === 'LISTENING' && (
          <motion.div 
            initial={{ scale: 0.8 }} animate={{ scale: 1.1 }}
            className="mt-8 w-4 h-4 bg-[#D4AF37] rounded-full animate-ping"
          />
        )}
      </main>

      {/* تزيين الحواف [cite: 2025-12-24] */}
      <div className="fixed bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
    </div>
  );
}
