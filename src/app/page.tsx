"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function KidsVerseIntro() {
  const [loading, setLoading] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setLoading(prev => (prev < 100 ? prev + 1 : 100));
    }, 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="h-screen bg-[#020205] flex flex-col items-center justify-center relative overflow-hidden">
      {/* سديم ذهبي في الخلفية */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37] opacity-5 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="z-10 text-center px-4"
      >
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 bg-gradient-to-b from-[#D4AF37] to-[#886b1d] rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.3)] border border-white/10"
        >
          <span className="text-4xl">👑</span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">
          NEFERTITI <span className="text-[#D4AF37]">KIDSVERSE</span>
        </h1>
        <p className="text-gray-400 font-mono tracking-[0.3em] uppercase text-sm mb-12">Beyond The Horizon • عالم النوابغ</p>

        {/* شريط التحميل الملكي */}
        <div className="w-72 h-1.5 bg-white/5 rounded-full mx-auto mb-4 overflow-hidden border border-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${loading}%` }}
            className="h-full bg-[#D4AF37] shadow-[0_0_15px_#D4AF37]"
          />
        </div>
        
        <AnimatePresence>
          {loading === 100 ? (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => router.push('/nexus')}
              className="px-12 py-4 bg-[#D4AF37] text-black font-bold rounded-2xl shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:scale-105 transition-transform"
            >
              ابدأ المهمة الملكية
            </motion.button>
          ) : (
            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">جاري فحص شيفرة الذكاء... {loading}%</p>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
