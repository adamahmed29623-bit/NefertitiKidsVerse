"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mic, ArrowLeft, Star, Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AlphabetPlanet() {
  const router = useRouter();
  const [activeStage, setActiveStage] = useState('INTRO'); // INTRO, MIRROR, CHALLENGE, SUCCESS
  const [isListening, setIsListening] = useState(false);

  // 1. وظيفة نطق Gemini (الملك توت) للكلمة [cite: 2025-12-24]
  const speakWord = (text: string, lang: string = 'ar-EG') => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = lang;
    msg.rate = 0.9;
    window.speechSynthesis.speak(msg);
  };

  // 2. تفعيل تحدي النطق للطفل [cite: 2025-12-24]
  const startChallenge = () => {
    const Recognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!Recognition) return;
    const mic = new Recognition();
    mic.lang = 'ar-EG';

    mic.onstart = () => setIsListening(true);
    mic.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      if (transcript.includes("أنا") || transcript.includes("انا")) {
        setActiveStage('SUCCESS');
        speakWord("برافو! إنت فعلاً ملك المريخ", 'ar-EG');
      }
    };
    mic.onend = () => setIsListening(false);
    mic.start();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden font-serif">
      {/* العودة للمقر [cite: 2025-12-24] */}
      <button 
        onClick={() => router.push('/academy')}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 text-[#D4AF37] hover:scale-110 transition-transform"
      >
        <ArrowLeft /> Back to Hub
      </button>

      <AnimatePresence mode="wait">
        {/* المرحلة الأولى: اختيار الحرف [cite: 2025-12-24] */}
        {activeStage === 'INTRO' && (
          <motion.div 
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center justify-center min-h-screen"
          >
            <motion.div 
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.8 }}
              onClick={() => {
                setActiveStage('MIRROR');
                speakWord("أ... أنا", 'ar-EG');
              }}
              className="w-64 h-80 bg-gradient-to-b from-[#D4AF37] to-[#8B4513] rounded-t-full border-4 border-[#ffd700] flex items-center justify-center cursor-pointer shadow-[0_0_50px_rgba(212,175,55,0.3)]"
            >
              <span className="text-9xl font-bold text-black">أ</span>
            </motion.div>
            <p className="mt-8 text-[#D4AF37] tracking-[5px] animate-pulse">لمس الحرف لفتح البوابة</p>
          </motion.div>
        )}

        {/* المرحلة الثانية: المرآة السحرية (أنا) [cite: 2025-12-24] */}
        {activeStage === 'MIRROR' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-screen relative"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-transparent to-transparent animate-pulse" />
            
            <motion.div 
              initial={{ y: 50 }} animate={{ y: 0 }}
              className="relative w-80 h-80 rounded-full border-8 border-[#D4AF37] bg-white/10 backdrop-blur-3xl overflow-hidden shadow-[0_0_100px_#D4AF37]"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="w-20 h-20 text-[#D4AF37]/30" />
                {/* هنا يمكن دمج رابط الكاميرا لاحقاً ليرا الطفل نفسه بزي ملكي [cite: 2025-12-24] */}
              </div>
            </motion.div>

            <h2 className="text-6xl mt-12 font-bold text-[#D4AF37] tracking-widest">أنا • ANA</h2>
            <button 
              onClick={startChallenge}
              className={`mt-8 px-10 py-4 rounded-full border-2 border-[#D4AF37] flex items-center gap-4 transition-all ${isListening ? 'bg-[#D4AF37] text-black scale-110' : 'hover:bg-[#D4AF37]/20'}`}
            >
              <Mic className={isListening ? 'animate-bounce' : ''} />
              {isListening ? "Listening..." : "Say 'ANA' like a King"}
            </button>
          </motion.div>
        )}

        {/* المرحلة الثالثة: احتفالية النجاح [cite: 2025-12-24] */}
        {activeStage === 'SUCCESS' && (
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="flex flex-col items-center justify-center min-h-screen"
          >
            <Sparkles className="w-32 h-32 text-[#D4AF37] mb-8 animate-spin" />
            <h1 className="text-7xl font-black text-[#D4AF37] mb-4">MUBARAK!</h1>
            <p className="text-2xl italic text-white/80">You've mastered your first Martian word!</p>
            <div className="mt-12 flex gap-4">
               <div className="p-4 bg-white/5 rounded-2xl border border-[#D4AF37] text-[#D4AF37]"> +100 XP </div>
               <div className="p-4 bg-white/5 rounded-2xl border border-[#D4AF37] text-[#D4AF37]"> Royal Badge 🏅 </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
