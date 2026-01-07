"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MagicChamber() {
  const [isLit, setIsLit] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState("Tap the Star to wake Gemini...");
  const [xp, setXp] = useState(0);

  // اختراع "صدى الكلمات": التعرف على الصوت بدون مكتبات خارجية
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMessage("Your browser is too old for this magic!");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ar-EG'; // التركيز على اللهجة المصرية [cite: 2025-12-24]
    
    recognition.onstart = () => {
      setIsListening(true);
      setMessage("Gemini is listening... Say 'NOUR'");
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      console.log("الطفل قال:", transcript);
      
      // إذا نطق الطفل كلمة نور (بأي شكل) [cite: 2025-12-24]
      if (transcript.includes("نور") || transcript.toLowerCase().includes("nour")) {
        setIsLit(true);
        setXp(500);
        setMessage("MUBARAK! You brought the Light!");
      } else {
        setMessage(`You said '${transcript}', try again: say 'NOUR'`);
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      setMessage("The spirits are quiet. Try again?");
    };

    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <div className={`min-h-screen transition-all duration-[3000ms] ease-in-out flex flex-col items-center justify-center overflow-hidden ${isLit ? 'bg-[#D4AF37]' : 'bg-[#050505]'}`}>
      
      {/* هالة Gemini الذكية [cite: 2025-12-24] */}
      <motion.div 
        onClick={startListening}
        animate={isListening ? { scale: [1, 1.2, 1], rotate: 360 } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        className={`w-32 h-32 rounded-full cursor-pointer flex items-center justify-center shadow-2xl z-50 ${isLit ? 'bg-white' : 'bg-gradient-to-t from-blue-600 to-cyan-400'}`}
      >
        <span className="text-5xl">{isLit ? "☀️" : "✨"}</span>
      </motion.div>

      {/* رسالة Gemini التوجيهية [cite: 2025-12-24] */}
      <div className="mt-10 text-center z-10 px-6">
        <motion.p 
          key={message}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-2xl font-bold uppercase tracking-tighter ${isLit ? 'text-black' : 'text-cyan-400'}`}
        >
          {message}
        </motion.p>
        
        {isLit && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-6">
            <h2 className="text-6xl font-black text-white drop-shadow-lg">XP +{xp}</h2>
            <p className="text-black/60 font-serif italic mt-2">"Nour" means Light in Egyptian!</p>
          </motion.div>
        )}
      </div>

      {/* خلفية المعبد المظلمة التي تضيء [cite: 2025-12-24] */}
      {!isLit && (
        <div className="absolute inset-0 opacity-20 flex items-center justify-center pointer-events-none">
          <span className="text-[30rem]">𓉐</span>
        </div>
      )}

      {/* تذييل الصفحة الملكي [cite: 2025-12-24] */}
      <footer className={`fixed bottom-10 w-full text-center text-[10px] tracking-[15px] ${isLit ? 'text-black/40' : 'text-white/20'}`}>
        NEFERTITI ACADEMY • VOICE OF THE ANCIENTS
      </footer>
    </div>
  );
}
