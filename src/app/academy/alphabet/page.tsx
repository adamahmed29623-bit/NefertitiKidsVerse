"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mic, ArrowLeft, Star, Camera, Volume2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AlphabetPlanet() {
  const router = useRouter();
  const [activeStage, setActiveStage] = useState('INTRO'); // INTRO, MIRROR, SUCCESS
  const [isListening, setIsListening] = useState(false);

  // وظيفة نطق الكلمة (أنا) بصوت ملكي [cite: 2025-12-24]
  const speakWord = (text: string) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'ar-EG';
    msg.rate = 0.9;
    window.speechSynthesis.speak(msg);
  };

  // وظيفة تحدي النطق [cite: 2025-12-24]
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
        speakWord("برافو! إنت فعلاً ملك المريخ");
      }
    };
    mic.onend = () => setIsListening(false);
    mic.start();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden font-serif selection:bg-[#D4AF37]">
      {/* العودة للمقر الرئيسي [cite: 2025-12-24] */}
      <button 
        onClick={() => router.push('/dashboard')}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 text-[#D4AF37] hover:scale-110 transition-transform bg-black/40 p-3 rounded-full border border-[#D4AF37]/30"
      >
        <ArrowLeft size={20} /> <span className="text-xs tracking-widest">RETURN TO HUB</span>
      </button>

      <AnimatePresence mode="wait">
        {/* المرحلة الأولى: الحرف العملاق المتوهج سحرياً [cite: 2025-12-24] */}
        {activeStage === 'INTRO' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
            className="flex flex-col items-center justify-center min-h-screen relative"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.02, 1],
                boxShadow: ["0 0 40px #D4AF37", "0 0 120px #ffd700", "0 0 40px #D4AF37"]
              }}
              transition={{ repeat: Infinity, duration: 3 }}
              onClick={() => {
                setActiveStage('MIRROR');
                speakWord("ألف.. أنا");
              }}
              className="w-[320px] h-[450px] rounded-[60px] border-8 border-[#D4AF37]/50 flex items-center justify-center cursor-pointer relative overflow-hidden bg-gradient-to-b from-[#D4AF37] via-[#8B4513] to-black"
            >
              <motion.span 
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="text-[250px] font-black text-black drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]"
              >
                أ
              </motion.span>
              <div className="absolute top-10 flex items-center gap-2 text-black/60 uppercase tracking-[5px] text-xs font-bold">
                <Sparkles size={14} /> The Golden Gate
              </div>
            </motion.div>
            <p className="mt-12 text-[#D4AF37] text-xl tracking-[12px] animate-pulse">TOUCH THE MAGIC</p>
          </motion.div>
        )}

        {/* المرحلة الثانية: المرآة الملكية (أنا) [cite: 2025-12-24] */}
        {activeStage === 'MIRROR' && (
          <motion.div 
            key="mirror"
            initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-screen relative px-4"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#D4AF3715_0%,_transparent_70%)]" />
            
            <motion.div 
              className="relative w-80 h-80 rounded-full border-8 border-[#D4AF37] bg-white/5 backdrop-blur-3xl overflow-hidden shadow-[0_0_80px_#D4AF3750] flex items-center justify-center"
            >
              <Camera className="w-24 h-24 text-[#D4AF37]/20" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/10 to-transparent" />
            </motion.div>

            <h2 className="text-7xl mt-12 font-bold text-[#D4AF37] tracking-[10px]">أنا • ANA</h2>
            <p className="text-white/40 mt-4 italic">"I am a Martian Pharaoh"</p>

            <button 
              onClick={startChallenge}
              className={`mt-12 px-12 py-5 rounded-full border-2 border-[#D4AF37] flex items-center gap-6 transition-all duration-500 ${isListening ? 'bg-[#D4AF37] text-black scale-110 shadow-[0_0_40px_#D4AF37]' : 'hover:bg-[#D4AF37]/10'}`}
            >
              <Mic className={isListening ? 'animate-bounce' : ''} />
              <span className="font-bold tracking-widest">{isListening ? "KING TUT IS LISTENING..." : "SAY 'ANA' TO CLAIM YOUR CROWN"}</span>
            </button>
          </motion.div>
        )}

        {/* المرحلة الثالثة: احتفالية النجاح [cite: 2025-12-24] */}
        {activeStage === 'SUCCESS' && (
          <motion.div 
            key="success"
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="flex flex-col items-center justify-center min-h-screen text-center px-4"
          >
            <motion.div 
              animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="mb-8"
            >
              <Star size={100} className="text-[#D4AF37] fill-[#D4AF37]" />
            </motion.div>
            <h1 className="text-8xl font-black text-[#D4AF37] mb-6 drop-shadow-[0_0_30px_#D4AF37]">MUBARAK!</h1>
            <p className="text-2xl text-white/80 max-w-md">You've unlocked the secret of the first letter!</p>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setActiveStage('INTRO')}
              className="mt-12 text-[#D4AF37] underline tracking-[5px] uppercase"
            >
              Repeat The Magic
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
