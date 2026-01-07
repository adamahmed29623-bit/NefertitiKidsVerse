"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Rocket, BookOpen, Star, Trophy, Radio, ArrowRight } from 'lucide-react';

export default function MarsDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans selection:bg-[#D4AF37]">
      {/* Header الملكي */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
        <div>
          <h1 className="text-[#D4AF37] text-4xl font-serif tracking-[0.2em] uppercase">The Mars Dashboard</h1>
          <p className="text-white/40 mt-2 italic">Commander Nefertiti's Hub • Station 01</p>
        </div>
        <div className="flex items-center gap-6 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
          <div className="text-center px-4 border-r border-white/10">
            <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest">Total XP</p>
            <p className="text-2xl font-black">500</p>
          </div>
          <div className="text-center px-4">
            <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest">Rank</p>
            <p className="text-xl font-bold">Explorer</p>
          </div>
        </div>
      </header>

      {/* المهمات التعليمية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* مهمة 1: كوكب الحروف */}
        <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-b from-white/10 to-transparent p-8 rounded-[2rem] border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <BookOpen size={80} />
          </div>
          <h2 className="text-[#D4AF37] text-2xl font-bold mb-2">كوكب الحروف</h2>
          <p className="text-white/60 text-sm mb-8 leading-relaxed">اكتشف أسرار الحروف المصرية بالأصوات المريخية العالية.</p>
          <button 
            onClick={() => router.push('/academy/alphabet')}
            className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#ffd700] transition-all flex items-center justify-center gap-2"
          >
            Launch Mission <ArrowRight size={18} />
          </button>
        </motion.div>

        {/* مهمة 2: منجم الكلمات (مغلق) */}
        <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 opacity-40 relative">
          <h2 className="text-white text-2xl font-bold mb-2">منجم الكلمات</h2>
          <p className="text-white/60 text-sm mb-8">تجميع أول 20 كلمة مصرية مريخية.</p>
          <div className="py-4 text-center border border-white/10 rounded-xl text-[10px] uppercase tracking-[0.5em]">Locked</div>
        </div>

        {/* مهمة 3: رادار المحادثة (مغلق) */}
        <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 opacity-40 relative">
          <h2 className="text-white text-2xl font-bold mb-2">رادار المحادثة</h2>
          <p className="text-white/60 text-sm mb-8">دردشة حية مع أهل الأرض بالعامية.</p>
          <div className="py-4 text-center border border-white/10 rounded-xl text-[10px] uppercase tracking-[0.5em]">Locked</div>
        </div>
      </div>
    </div>
  );
}
