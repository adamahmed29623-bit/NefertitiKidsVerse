"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Sparkles, Trophy, Globe, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RoyalPortal() {
  const [status, setStatus] = useState('IDLE');
  const [xp, setXp] = useState(0);
  const [message, setMessage] = useState("Tap the Golden Orb to Begin");
  const [errorDetails, setErrorDetails] = useState("");
  const router = useRouter();

  const startVoiceMagic = () => {
    // التحقق من الأمان للميكروفون
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      setStatus('ERROR');
      setMessage("⚠️ الميكروفون يتطلب رابط آمن HTTPS");
      return;
    }

    const Recognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!Recognition) {
      setMessage("المتصفح لا يدعم التعرف على الصوت");
      return;
    }

    const mic = new Recognition();
    mic.lang = 'ar-EG'; 
    mic.continuous = false;
    
    mic.onstart = () => {
      setStatus('LISTENING');
      setMessage("Gemini يسمعكِ الآن.. قولي 'نور'");
    };

    mic.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript.trim();
      
      if (transcript.includes("نور") || transcript.toLowerCase().includes("nour")) {
        setStatus('SUCCESS');
        setXp(500);
        setMessage("MUBARAK! جاري فتح الأكاديمية...");
        // الانتقال التلقائي للوحة التحكم بعد ثانيتين [cite: 2025-12-24]
        setTimeout(() => router.push('/academy'), 2000);
      } else {
        setStatus('ERROR');
        setMessage(`سمعت '${transcript}'.. حاولي مرة أخرى`);
        setTimeout(() => setStatus('IDLE'), 3000);
      }
    };

    mic.onerror = (event: any) => {
      setStatus('ERROR');
      if (event.error === 'not-allowed') {
        setErrorDetails("يرجى تفعيل إذن الميكروفون من القفل بجانب الرابط");
      }
      setTimeout(() => setStatus('IDLE'), 4000);
    };

    mic.start();
  };

  return (
    <div className={`min-h-screen transition-all duration-[2000ms] flex flex-col items-center justify-center overflow-hidden ${status === 'SUCCESS' ? 'bg-[#D4AF37]' : 'bg-[#050505]'}`}>
      
      <div className="fixed top-10 right-10 flex items-center gap-4 bg-white/5 p-4 rounded-full border border-white/10 backdrop-blur-xl z-20">
        <Trophy className={status === 'SUCCESS' ? 'text-black' : 'text-[#D4AF37]'} />
        <span className={`text-2xl font-black ${status === 'SUCCESS' ? 'text-black' : 'text-white'}`}>{xp} XP</span>
      </div>

      <main className="text-center z-10 px-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={status === 'LISTENING' ? { 
            scale: [1, 1.2, 1],
            boxShadow: ["0px 0px 20px #D4AF37", "0px 0px 60px #ffd700", "0px 0px 20px #D4AF37"]
          } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
          onClick={startVoiceMagic}
          className={`w-48 h-48 mx-auto rounded-full flex items-center justify-center cursor-pointer relative shadow-2xl transition-all duration-700 ${status === 'SUCCESS' ? 'bg-white' : 'bg-gradient-to-tr from-[#D4AF37] to-[#ffd700]'}`}
        >
          {status === 'SUCCESS' ? (
            <Sparkles className="w-24 h-24 text-[#D4AF37] animate-bounce" />
          ) : (
            <Mic className={`w-20 h-20 ${status === 'LISTENING' ? 'text-white animate-pulse' : 'text-black/80'}`} />
          )}
        </motion.div>

        <div className="mt-12 space-y-6">
          <h1 className={`text-5xl font-serif tracking-[10px] uppercase transition-colors duration-1000 ${status === 'SUCCESS' ? 'text-black' : 'text-[#D4AF37]'}`}>
            {status === 'SUCCESS' ? "Welcome Home" : "Yalla Masry"}
          </h1>
          <p className={`text-xl font-light italic ${status === 'SUCCESS' ? 'text-black/70' : 'text-white/60'}`}>
            {message}
          </p>
          {errorDetails && <p className="text-red-400 text-sm mt-2">{errorDetails}</p>}
        </div>
      </main>

      <footer className="fixed bottom-10 flex flex-col items-center gap-3">
        <div className="flex gap-2 items-center">
          <Globe className={`w-4 h-4 ${status === 'SUCCESS' ? 'text-black' : 'text-[#D4AF37]'}`} />
          <span className={`text-[10px] tracking-[10px] uppercase ${status === 'SUCCESS' ? 'text-black' : 'text-white/30'}`}>
            Nefertiti Academy • Mars Branch
          </span>
        </div>
      </footer>
    </div>
  );
}
