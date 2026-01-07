"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Rocket, BookOpen, Star, Trophy, Radio, ArrowRight, Sparkles } from 'lucide-react';

export default function MarsDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans overflow-hidden relative">
      {/* تأثير غبار النجوم الذهبي في الخلفية [cite: 2025-12-24] */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#D4AF37] blur-[100px] rounded-full opacity-50" />
      </div>

      <div className="relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h1 className="text-[#D4AF37] text-4xl font-serif tracking-[0.3em] uppercase drop-shadow-lg">The Mars Dashboard</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="h-[1px] w-8 bg-[#D4AF37]" />
              <p className="text-white/40 italic text-sm">Commander Nefertiti's Hub • Station 01</p>
            </div>
          </motion.div>

          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-6 bg-gradient-to-br from-white/10 to-transparent p-5 rounded-[2rem] border border-white/20 backdrop-blur-xl shadow-2xl">
            <div className="text-center px-4 border-r border-white/10">
              <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-black">Total XP</p>
              <p className="text-3xl font-black text-white">500</p>
            </div>
            <div className="flex items-center gap-3 px-4">
              <Trophy className="text-[#D4AF37]" size={28} />
              <div>
                <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-black">Rank</p>
                <p className="text-xl font-bold">Explorer</p>
              </div>
            </div>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* كوكب الحروف مع تأثير التوهج [cite: 2026-01-08] */}
          <motion.div 
            whileHover={{ scale: 1.02, y: -10 }}
            className="bg-gradient-to-b from-[#D4AF37]/10 to-transparent p-10 rounded-[3rem] border border-[#D4AF37]/30 relative group cursor-pointer"
            onClick={() => router.push('/academy/alphabet')}
          >
            <div className="absolute -top-6 -right-6 bg-[#D4AF37] p-4 rounded-2xl rotate-12 group-hover:rotate-0 transition-transform">
              <BookOpen size={32} className="text-black" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white group-hover:text-[#D4AF37] transition-colors">كوكب الحروف</h2>
            <p className="text-white/60 leading-relaxed mb-8">رحلة عبر الزمن لتعلم نطق الحروف المصرية بصدى مريخي فريد.</p>
            <div className="flex items-center gap-2 text-[#D4AF37] font-black tracking-widest group-hover:gap-4 transition-all">
              LAUNCH MISSION <ArrowRight size={20} />
            </div>
          </motion.div>

          {/* المهام المغلقة بتصميم أنيق [cite: 2026-01-08] */}
          {["منجم الكلمات", "رادار المحادثة"].map((title) => (
            <div key={title} className="p-10 rounded-[3rem] border border-white/5 bg-white/5 opacity-30 grayscale relative">
              <h2 className="text-2xl font-bold mb-4">{title}</h2>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.4em]">Locked</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
