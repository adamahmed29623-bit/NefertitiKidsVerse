"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mic, Star, Zap, Crown } from 'lucide-react';

export default function AlifPlanet() {
  const [effectStatus, setEffectStatus] = useState('IDLE'); // IDLE, CHARGING, EXPLODING
  const [message, setMessage] = useState("Touch the Golden Glyph");

  const triggerMagic = () => {
    setEffectStatus('CHARGING');
    const msg = new SpeechSynthesisUtterance("ألف... أنا ملك المريخ");
    msg.lang = 'ar-EG';
    msg.rate = 0.8;
    window.speechSynthesis.speak(msg);

    // تأثير الانفجار بعد الشحن
    setTimeout(() => {
      setEffectStatus('EXPLODING');
      setMessage("UNBELIEVABLE POWER!");
      setTimeout(() => {
        setEffectStatus('IDLE');
        setMessage("Touch again to reignite");
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#001b48] flex flex-col items-center justify-center overflow-hidden relative">
      
      {/* 1. خلفية السديم المريخي المتحرك */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-repeat"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#002366] via-transparent to-black opacity-80" />
      </div>

      {/* 2. عنصر الإبهار: حرف الألف العملاق */}
      <main className="z-10 relative flex flex-col items-center">
        <AnimatePresence>
          <motion.div
            onClick={triggerMagic}
            whileHover={{ scale: 1.1 }}
            className="relative cursor-pointer group"
          >
            {/* هالة النور الملكية خلف الحرف */}
            <motion.div 
              animate={effectStatus === 'CHARGING' ? { scale: [1, 2], opacity: [0.5, 1] } : { scale: 1, opacity: 0.3 }}
              className="absolute inset-0 bg-[#D4AF37] blur-[120px] rounded-full -z-10"
            />

            {/* الحرف بتصميم 3D وتدرج لوني مبهر */}
            <motion.span
              animate={effectStatus === 'EXPLODING' ? { y: [0, -50, 0], scale: [1, 1.5, 1] } : {}}
              className="text-[450px] font-black leading-none select-none bg-clip-text text-transparent bg-gradient-to-t from-[#8B4513] via-[#D4AF37] to-[#FFF] drop-shadow-[0_20px_50px_rgba(212,175,55,0.6)]"
            >
              أ
            </motion.span>

            {/* أيقونة التاج التي تظهر عند الانفجار */}
            {effectStatus === 'EXPLODING' && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: -250 }}
                className="absolute top-0 left-1/2 -translate-x-1/2"
              >
                <Crown className="w-32 h-32 text-[#D4AF37] drop-shadow-[0_0_30px_#D4AF37]" />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* 3. شريط المعلومات والتشويق */}
        <motion.div className="mt-12 text-center">
          <h2 className="text-[#D4AF37] text-4xl font-bold tracking-[15px] uppercase drop-shadow-md">
            The Power of ALIF
          </h2>
          <p className="text-white/60 text-xl italic mt-4 tracking-widest uppercase">
            {message}
          </p>
        </motion.div>
      </main>

      {/* 4. جزيئات ذهبية (Particles) تملأ الشاشة
