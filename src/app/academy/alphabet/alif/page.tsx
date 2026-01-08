"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Crown } from 'lucide-react';

export default function AlifPlanet() {
  const [magic, setMagic] = useState(false);

  const handlePower = () => {
    setMagic(true);
    const audio = new SpeechSynthesisUtterance("ألف... أنا ملك المريخ");
    audio.lang = 'ar-EG';
    audio.rate = 0.8;
    window.speechSynthesis.speak(audio);
    setTimeout(() => setMagic(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#001b48] flex flex-col items-center justify-center overflow-hidden relative font-serif">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#D4AF3715_0%,_transparent_70%)] z-0" />
      
      <main className="z-10 flex flex-col items-center">
        <motion.div
          onClick={handlePower}
          whileHover={{ scale: 1.05 }}
          className="relative cursor-pointer"
        >
          <motion.div 
            animate={{ 
              scale: magic ? [1, 1.8, 1] : 1,
              opacity: magic ? [0.3, 0.8, 0.3] : 0.2
            }}
            className="absolute inset-0 bg-[#D4AF37] blur-[100px] rounded-full -z-10"
          />

          <motion.span
            animate={magic ? { y: [0, -40, 0], rotate: [0, 5, -5, 0] } : {}}
            className="text-[420px] font-black leading-none bg-clip-text text-transparent bg-gradient-to-t from-[#8B4513] via-[#D4AF37] to-[#FFF] drop-shadow-[0_20px_60px_rgba(212,175,55,0.5)] block select-none"
          >
            أ
          </motion.span>

          <AnimatePresence>
            {magic && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0 }}
                animate={{ opacity: 1, y: -300, scale: 2 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 left-1/2 -translate-x-1/2"
              >
                <Crown className="text-[#D4AF37] w-20 h-20 drop-shadow-[0_0_20px_#FFD700]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 text-center">
          <h1 className="text-[#D4AF37] text-5xl font-bold tracking-[20px] uppercase drop-shadow-lg">
            ALIF • الألف
          </h1>
          <p className="text-white/40 mt-6 tracking-[10px] text-lg animate-pulse">
            {magic ? "ROYAL ENERGY ACTIVATED" : "TOUCH THE GOLDEN MYSTERY"}
          </p>
        </div>
      </main>

      {magic && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: "50%", y: "50%", scale: 0 }}
              animate={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`,
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 2 }}
              className="absolute"
            >
              <Star className="text-[#D4AF37] fill-[#D4AF37] w-6 h-6" />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
