"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, BookOpen, Star, Trophy, Radio, Map as MapIcon } from 'lucide-react';

export default function MarsDashboard() {
  const missions = [
    { id: 1, title: "كوكب الحروف", desc: "نطق الحروف المصرية بالأصوات", status: "Open", icon: <BookOpen /> },
    { id: 2, title: "منجم الكلمات", desc: "تجميع أول 20 كلمة مصرية", status: "Locked", icon: <Rocket /> },
    { id: 3, title: "رادار المحادثة", desc: "دردشة حية مع أهل الأرض", status: "Locked", icon: <Radio /> }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16 border-b border-[#D4AF37]/10 pb-10">
        <div>
          <h2 className="text-[#D4AF37] text-4xl font-serif tracking-widest uppercase mb-2">The Mars Dashboard</h2>
          <p className="text-white/40 font-light tracking-[3px]">Commander Nefertiti's Hub</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest">Total XP</p>
            <p className="text-2xl font-black">500</p>
          </div>
          <div className="h-12 w-[1px] bg-white/10" />
          <div className="bg-[#D4AF37] text-black px-6 py-2 rounded-full font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            Rank: Explorer
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {missions.map((m) => (
          <motion.div 
            key={m.id}
            whileHover={m.status === 'Open' ? { y: -10, scale: 1.02 } : {}}
            className={`relative p-8 rounded-[2rem] border transition-all duration-500 ${m.status === 'Open' ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-white/5 bg-white/[0.02] opacity-40'}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${m.status === 'Open' ? 'bg-[#D4AF37] text-black' : 'bg-white/10 text-white/40'}`}>
              {m.icon}
            </div>
            <h3 className="text-2xl font-bold mb-3">{m.title}</h3>
            <p className="text-white/50 text-sm mb-8 leading-relaxed">{m.desc}</p>
            <button className={`w-full py-4 rounded-2xl font-black tracking-widest transition-all ${m.status === 'Open' ? 'bg-white text-black hover:bg-[#D4AF37]' : 'bg-white/5 text-white/20 cursor-not-allowed'}`}>
              {m.status === 'Open' ? "LAUNCH MISSION" : "LOCKED"}
            </button>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-transparent border border-[#D4AF37]/10 flex flex-col md:flex-row items-center gap-8 justify-between"
      >
        <div className="flex items-center gap-8 text-center md:text-left">
          <div className="w-20 h-20 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
            <Radio className="w-10 h-10 text-[#D4AF37] animate-pulse" />
          </div>
          <div>
            <h4 className="text-[#D4AF37] text-xl font-bold mb-1">Incoming Signal from Earth</h4>
            <p className="text-white/60 italic font-serif">"صباح الفل يا بطل.. جاهز تبدأ أول درس؟"</p>
          </div>
        </div>
        <button className="px-10 py-4 bg-white/5 border border-white/10 rounded-full text-sm tracking-[5px] uppercase hover:bg-white/10 transition-all">
          Accept Signal
        </button>
      </motion.div>
    </div>
  );
}
