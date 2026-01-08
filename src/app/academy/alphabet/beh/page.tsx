"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Sparkles, Wind, Stars } from 'lucide-react';

export default function PlanetBeh() {
  const [isExploded, setIsExploded] = useState(false);

  const triggerBehMagic = () => {
    setIsExploded(true);
    // نطق ملكي مع صدى (Reverb) عبر تكرار خفيف
    const speak = (txt: string) => {
      const msg = new SpeechSynthesisUtterance(txt);
      msg.lang = 'ar-EG';
      msg.rate = 0.7; // سرعة بطيئة للفخامة
      msg.pitch = 1.2;
      window.speechSynthesis.speak(msg);
    };
    speak("ب... ب... بيت");
    setTimeout(() => setIsExploded(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#001233] flex flex-col items-center justify-center overflow-hidden relative">
      {/* 1. طبقات الخلفية العميقة (Deep Space Layers) */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2] }} 
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#1e3a8a_0%,_transparent_100%)]" 
        />
        {/* نيازك تمر في الخلفية للإبهار البصري */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ x: [-100, 1500], y: [0, 800], opacity: [0, 1, 0] }}
            transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, delay: i * 2 }}
            className="absolute w-32 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rotate-45"
          />
        ))}
      </div>

      <main className="z-10 relative text-center">
        <AnimatePresence>
          <motion.div
            onClick={triggerBehMagic}
            whileHover={{ scale: 1.05 }}
            className="relative cursor-pointer"
          >
            {/* 2. الحرف ككتلة ضوئية ثلاثية الأبعاد */}
            <motion.span
              animate={isExploded ? { 
                scale: [1, 1.2, 0.8, 1],
                filter: ["drop-shadow(0 0 20px #D4AF37)", "drop-shadow(0 0 100px #FFD700)", "drop-shadow(0 0 20px #D4AF37)"]
              } : { scale: 1 }}
              className="text-[400px] font-black leading-none select-none bg-clip-text text-transparent bg-gradient-to-br from-[#FFD700] via-[#D4AF37] to-[#8B4513] block drop-shadow-2xl"
            >
              ب
            </motion.span>

            {/* النقطة (The Magic Dot) - تتحول لبيت متوهج عند الضغط */}
            <motion.div
              animate={isExploded ? { 
                y: [0, -100], 
                scale: [1, 3],
                backgroundColor: ["#D4AF37", "#FFF"] 
              } : { y: 0 }}
              className="w-12 h-12 bg-[#D4AF37] rounded-full mx-auto mt-[-40px] shadow-[0_0_30px_#D4AF37] flex items-center justify-center"
            >
              {isExploded && <Home className="text-[#001233] w-6 h-6" />}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* 3. شعار "بيت" الذي يظهر كأنه نُقش في الهواء */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isExploded ? 1 : 0, y: isExploded ? -20 : 20 }}
          className="mt-10"
        >
          <h2 className="text-6xl font-black text-white tracking-[20px] uppercase drop-shadow-[0_0_15px_#D4AF37]">
            BEIT • بيت
          </h2>
          <p className="text-[#D4AF37] text-xl mt-4 tracking-widest italic">"My Martian Sanctuary"</p>
        </motion.div>
      </main>

      {/* 4. جزيئات "غبار الذهب" الحية (Live Dust) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -1000], 
              x: [0, (Math.random() - 0.5) * 200],
              opacity: [0, 0.8, 0] 
            }}
            transition={{ duration: 4, repeat: Infinity, delay: Math.random() * 5 }}
            className="absolute bottom-0 left-1/2 w-1 h-1 bg-[#D4AF37] rounded-full"
          />
        ))}
      </div>
    </div>
  );
}
