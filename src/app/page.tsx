"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Sparkles, Trophy, Globe, AlertCircle } from 'lucide-react';

export default function RoyalAcademy() {
  const [status, setStatus] = useState('IDLE'); // IDLE, LISTENING, SUCCESS, ERROR
  const [xp, setXp] = useState(0);
  const [message, setMessage] = useState("Tap the Golden Orb to Begin");
  const [errorDetails, setErrorDetails] = useState("");

  // اختراع "صدى الكلمات" بالعامية المصرية المحسن [cite: 2025-12-24]
  const startVoiceMagic = () => {
    // 1. التحقق من بروتوكول الأمان (ضروري لعمل الميكروفون)
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      setStatus('ERROR');
      setMessage("⚠️ عذراً يا ملكة: الميكروفون يتطلب رابط آمن HTTPS");
      return;
    }

    const Recognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!Recognition) {
      setMessage("المتصفح لا يدعم التعرف على الصوت");
      return;
    }

    const mic = new Recognition();
    mic.lang = 'ar-EG'; // تفعيل الهوية المصرية [cite: 2025-12-24]
    mic.continuous = false;
    mic.interimResults = false;
    
    mic.onstart = () => {
      setStatus('LISTENING');
      setMessage("Gemini يسمعكِ الآن.. قولي 'نور'");
      setErrorDetails("");
    };

    mic.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript.trim();
      
      // منطق التحقق من كلمة "نور" بكل احتمالات النطق العامي [cite: 2025-12-24]
      if (transcript.includes("نور") || transcript.toLowerCase().includes("nour")) {
        setStatus('SUCCESS');
        setXp(500);
        setMessage("MUBARAK! لقد أشرقت الأكاديمية بنورك");
      } else {
        setStatus('ERROR');
        setMessage(`سمعت '${transcript}'.. حاولي مرة أخرى`);
        setTimeout(() => setStatus('IDLE'), 3000);
      }
    };

    mic.onerror = (event: any) => {
      setStatus('ERROR');
      if (event.error === 'not-allowed') {
        setMessage("إذن الميكروفون مرفوض");
        setErrorDetails("يرجى الضغط على القفل بجانب الرابط وتفعيل الميكروفون");
      } else {
        setMessage("حدث خطأ في الاتصال الصوتي");
      }
    };

    mic.onend = () => {
      if (status !== 'SUCCESS') {
        setTimeout(() => setStatus('IDLE'), 2000);
      }
    };

    mic.start();
  };

  return (
    <div className={`min-h-screen transition-all duration-[2000ms] flex flex-col items-center justify-center overflow-hidden ${status === 'SUCCESS' ? 'bg-[#D4AF37]' : 'bg-[#050505]'}`}>
      
      {/* رادار التقدم الملكي [cite: 2025-12-24] */}
      <div className="fixed top-10 right-10 flex items-center gap-4 bg-white/5 p-4 rounded-full border border-white/10 backdrop-blur-xl z-20">
        <Trophy className={status === 'SUCCESS' ? 'text-black' : 'text-[#D4AF37]'} />
        <span className={`text-2xl font-black ${status === 'SUCCESS' ? 'text-black' : 'text-white'}`}>{xp} XP</span>
      </div>

      {/* بوابة الاختراع المريخية [cite: 2025-12-24] */}
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
          
          {status === 'LISTENING' && (
            <div className="absolute inset-0 rounded-full border-4 border-white/50 animate-ping" />
          )}
        </motion.div>

        <div className="mt-12 space-y-6 max-w-md mx-auto">
          <motion.h1 
            key={status}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-5xl font-serif tracking-[10px] uppercase transition-colors duration-1000 ${status === 'SUCCESS' ? 'text-black' : 'text-[#D4AF37]'}`}
          >
            {status === 'SUCCESS' ? "Welcome Home" : "Yalla Masry"}
          </motion.h1>
          
          <div className="space-y-2">
            <p className={`text-xl font-light italic transition-colors duration-1000 ${status === 'SUCCESS' ? 'text-black/70' : 'text-white/60'}`}>
              {message}
            </p>
            {errorDetails && (
              <p className="text-red-400 text-sm flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" /> {errorDetails}
              </p>
            )}
          </div>
        </div>
      </main>

      {/* الهوية البصرية للأكاديمية [cite: 2025-12-24] */}
      <footer className="fixed bottom-10 flex flex-col items-center gap-3">
        <div className="flex gap-2 items-center">
          <Globe className={`w-4 h-4 ${status === 'SUCCESS' ? 'text-black' : 'text-[#D4AF37]'}`} />
          <span className={`text-[10px] tracking-[10px] uppercase ${status === 'SUCCESS' ? 'text-black' : 'text-white/30'}`}>
            Nefertiti Academy • Mars Branch
          </span>
        </div>
        <div className={`h-[2px] w-32 rounded-full overflow-hidden ${status === 'SUCCESS' ? 'bg-black/10' : 'bg-white/10'}`}>
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: status === 'SUCCESS' ? "0%" : "-40%" }}
            className={`h-full w-full ${status === 'SUCCESS' ? 'bg-black' : 'bg-[#D4AF37]'}`} 
          />
        </div>
      </footer>

      {/* تأثير النجاح الخلفي */}
      <AnimatePresence>
        {status === 'SUCCESS' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/gold-dust.png')] opacity-30"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
