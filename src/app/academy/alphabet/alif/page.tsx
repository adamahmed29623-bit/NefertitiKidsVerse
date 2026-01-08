"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Crown, Sparkles } from 'lucide-react';

export default function AlifPlanet() {
  const [isExploding, setIsExploding] = useState(false);

  const startMagic = () => {
    setIsExploding(true);
    // نطق ملكي فخم
    const msg = new SpeechSynthesisUtterance("ألف... أنا ملك المريخ");
    msg.lang = 'ar-EG';
    msg.rate = 0.8;
    window.speechSynthesis.speak(msg);

    // إعادة الحالة بعد الانفجار
    setTimeout(() => setIsExploding(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#001b48] flex flex-col items-center justify-center overflow-hidden relative">
      {/* خلفية النجوم المتحركة */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#D4AF3710_0%,_transparent_70%)]" 
        />
      </div>

      <main className="z-10 relative flex flex-col items-center">
        <motion.div
          onClick={startMagic}
          whileHover={{ scale: 1.05 }}
          className="relative cursor-pointer"
        >
          {/* توهج خلف الحرف */}
          <motion.div 
            animate={{ scale: isExploding ? [1, 2, 1] : 1, opacity: isExploding ? [0.5, 1, 0.5] : 0.2 }}
            className="absolute inset-0 bg-[#D4AF37] blur-[100px] rounded-full -z-10"
          />

          {/* حرف الألف العملاق */}
          <motion.span
            animate={isExploding ? { y: [0, -30, 0] } : {}}
            className="text-[400px] font-black leading-none bg-clip-text text-transparent bg-gradient-to-t from-[#8B4513] via-[#D4AF37] to-[#FFF] drop-shadow-[0_20px_50px_rgba(212,175,55,0.4)] block"
          >
            أ
          </motion.span>

          {/* التاج الذي يظهر عند النجاح */}
          <AnimatePresence>
            {isExploding && (
              <motion.div
                initial={{ opacity: 0, y: 0, scale: 0 }}
                animate={{ opacity: 1, y: -280, scale: 1.5 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 left-1/2 -translate-x-1/2"
              >
                <Crown className="w-24 h-24 text-[#D4AF37] drop-shadow-[0_0_20px_#FFD700]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* النص الملكي السفلي */}
        <motion.div className="text-center mt-10">
          <h1 className="text-[#D4AF37] text-4xl font-bold tracking-[15px] uppercase">
            The Legend of Alif
          </h1>
          <p className="text-white/50 mt-4 tracking-widest italic uppercase">
            {isExploding ? "Unbelievable Power!" : "Touch the Golden Glyph"}
          </p>
        </motion.div>
      </main>

      {/* جزيئات الذهب المتطايرة */}
      <AnimatePresence>
        {isExploding && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: "50%", y: "50%", scale: 0 }}
                animate={{ 
                  x: `${Math.random() * 100}%`, 
                  y: `${Math.random() * 100}%`, 
                  scale: [0, 1.2, 0],
                  rotate: 360 
                }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                className="absolute"
              >
                <Star className="text-[#D4AF37] fill-[#D4AF37] w-4 h-4" />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
