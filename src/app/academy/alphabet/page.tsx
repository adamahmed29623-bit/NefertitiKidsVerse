"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Volume2, Sparkles, Star } from 'lucide-react';

export default function AlphabetPlanet() {
  const router = useRouter();
  const [selectedChar, setSelectedChar] = useState<any>(null);

  const alphabet = [
    { char: "أ", word: "أرنب", color: "#D4AF37" },
    { char: "ب", word: "بطة", color: "#C0C0C0" },
    { char: "ت", word: "تفاحة", color: "#D4AF37" },
    { char: "ث", word: "ثعلب", color: "#C0C0C0" },
    { char: "ج", word: "جمل", color: "#D4AF37" },
  ];

  const playExperience = (item: any) => {
    setSelectedChar(item);
    const msg = new SpeechSynthesisUtterance(item.char + ".." + item.word);
    msg.lang = 'ar-EG';
    msg.rate = 0.8;
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 relative overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.button 
          whileHover={{ x: -5 }}
          onClick={() => router.back()} 
          className="flex items-center gap-3 text-[#D4AF37] mb-16 font-bold tracking-widest uppercase text-sm"
        >
          <ArrowLeft size={18} /> Exit Mission
        </motion.button>

        <header className="text-center mb-20">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <Sparkles className="mx-auto text-[#D4AF37] mb-4" size={40} />
          </motion.div>
          <h1 className="text-6xl font-serif text-[#D4AF37] mb-4 tracking-tighter">كوكب الحروف</h1>
          <p className="text-white/30 uppercase tracking-[0.5em] text-xs font-light">The Golden Phonetics of Mars</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {alphabet.map((item, index) => (
            <motion.div
              key={item.char}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => playExperience(item)}
              className={`h-52 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer border-2 transition-all duration-500 shadow-2xl relative overflow-hidden ${selectedChar?.char === item.char ? 'border-[#D4AF37] bg-gradient-to-br from-[#D4AF37]/20 to-transparent' : 'border-white/10 bg-white/5'}`}
            >
              <span className={`text-6xl font-black mb-2 transition-colors ${selectedChar?.char === item.char ? 'text-[#D4AF37]' : 'text-white'}`}>
                {item.char}
              </span>
              <AnimatePresence>
                {selectedChar?.char === item.char && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-[#D4AF37] font-bold">
                    <Volume2 size={16} className="animate-pulse" /> {item.word}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {selectedChar && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="mt-20 p-12 rounded-[4rem] bg-gradient-to-r from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 text-center relative"
          >
            <Star className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[#D4AF37] fill-[#D4AF37]" size={40} />
            <h3 className="text-[#D4AF37] text-2xl font-bold mb-2">نطق ملكي ممتاز!</h3>
            <p className="text-xl text-white/70 italic">"أنتِ الآن تتحدثين لغة الأرض من قلب المريخ يا جلالة الملكة."</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
