"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Crown, Wand2, Sparkles } from 'lucide-react';

export default function PharaonicGame() {
  const [stage, setStage] = useState('VOICE_LOCK'); // VOICE_LOCK -> NAMING -> AVATAR_READY
  const [playerName, setPlayerName] = useState('');
  const [isMagicWorking, setIsMagicWorking] = useState(false);

  // 1. أمر الملك توت الصوتي
  const triggerTut = () => {
    const speech = new SpeechSynthesisUtterance("أيها الفرعون الصغير، قل القوة الفرعونية لتبدأ");
    speech.lang = 'ar-EG';
    window.speechSynthesis.speak(speech);
    // ننتقل للمرحلة التالية (محاكاة لسماع الصوت)
    setStage('NAMING');
  };

  // 2. بناء الأفاتار سحرياً
  const handleAvatarMagic = () => {
    setIsMagicWorking(true);
    const speech = new SpeechSynthesisUtterance(`جاري استدعاء قواك الملكية يا ${playerName}`);
    speech.lang = 'ar-EG';
    window.speechSynthesis.speak(speech);
    
    setTimeout(() => {
      setStage('AVATAR_READY');
      setIsMagicWorking(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-hidden flex items-center justify-center font-serif">
      
      {/* خلفية المتحف الكبير (تصميم بانورامي) [cite: 2025-12-24] */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black z-10" />
        <motion.img 
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2 }}
          src="https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* المحتوى المركزي تماماً [cite: 2025-12-24] */}
      <main className="relative z-20 w-full max-w-2xl text-center px-4">
        <AnimatePresence mode="wait">
          
          {/* المرحلة 1: بوابة القوة */}
          {stage === 'VOICE_LOCK' && (
            <motion.div 
              key="lock"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -100 }}
              className="space-y-12"
            >
              <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
                <Crown className="w-32 h-32 text-[#D4AF37] mx-auto drop-shadow-[0_0_40px_#D4AF37]" />
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-[15px] uppercase">
                The Grand <span className="text-[#D4AF37]">Museum</span>
              </h1>
              <button 
                onClick={triggerTut}
                className="group relative px-12 py-6 bg-transparent border-2 border-[#D4AF37] overflow-hidden rounded-full"
              >
                <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 text-[#D4AF37] group-hover:text-black font-bold text-2xl flex items-center gap-4">
                  <Mic /> قل: القوة الفرعونية
                </span>
              </button>
            </motion.div>
          )}

          {/* المرحلة 2: اختيار الاسم الملكي */}
          {stage === 'NAMING' && (
            <motion.div 
              key="naming"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="space-y-8"
            >
              <h2 className="text-[#D4AF37] text-3xl font-bold tracking-widest uppercase italic">أهلاً بك.. كيف نناديك في سجل الخلود؟</h2>
              <input 
                type="text"
                autoFocus
                placeholder="اسمي تحتمس..."
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full bg-transparent border-b-4 border-[#D4AF37] text-6xl text-center py-4 text-[#D4AF37] outline-none placeholder:text-[#D4AF37]/20 font-black"
              />
              {playerName.length > 2 && (
                <button 
                  onClick={handleAvatarMagic}
                  className="bg-[#D4AF37] text-black px-12 py-4 rounded-full font-black text-xl hover:scale-110 transition-transform flex items-center gap-3 mx-auto"
                >
                  {isMagicWorking ? "سحر التجسيد يعمل..." : "ابنِ الأفاتار الملكي"} <Wand2 />
                </button>
              )}
            </motion.div>
          )}

          {/* المرحلة 3: ظهور الأفاتار النهائي [cite: 2025-12-24] */}
          {stage === 'AVATAR_READY' && (
            <motion.div 
              key="ready"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="relative w-64 h-80 mx-auto">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-dashed border-[#D4AF37] rounded-full opacity-30"
                />
                <div className="absolute inset-0 bg-[#D4AF37] blur-[80px] opacity-20 rounded-full" />
                <div className="relative z-10 w-full h-full bg-slate-900 border-4 border-[#D4AF37] rounded-t-full flex flex-col items-center justify-center p-6 shadow-[0_0_50px_rgba(212,175,55,0.4)]">
                   <Sparkles className="text-[#D4AF37] w-12 h-12 mb-4 animate-pulse" />
                   <h3 className="text-3xl font-black text-[#D4AF37] uppercase tracking-tighter">{playerName}</h3>
                   <div className="mt-4 px-4 py-1 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full">LEVEL 1 PHARAOH</div>
                </div>
              </div>
              <h2 className="text-4xl text-white font-bold tracking-widest">المتحف الكبير بانتظارك يا {playerName}</h2>
              <button className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-[#D4AF37] transition-colors shadow-xl">
                ابدأ رحلة الأسرار
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* لمسة إبهار إضافية: غبار الذهب */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -1000], opacity: [0, 1, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: i }}
            className="absolute bottom-0 left-[10%] w-1 h-1 bg-[#D4AF37] rounded-full"
            style={{ left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}
