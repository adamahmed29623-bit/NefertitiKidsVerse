"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Volume2, Sparkles } from 'lucide-react';

export default function AlphabetPlanet() {
  const router = useRouter();
  const [selectedChar, setSelectedChar] = useState<string | null>(null);

  const alphabet = [
    { char: "أ", word: "أرنب", sound: "Arnab" },
    { char: "ب", word: "بطة", sound: "Batta" },
    { char: "ت", word: "تفاحة", sound: "Toffaha" },
    { char: "ث", word: "ثعلب", sound: "Thalab" },
    { char: "ج", word: "جمل", sound: "Gamal" },
  ];

  const playSound = (text: string) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'ar-EG';
    window.speechSynthesis.speak(msg);
    setSelectedChar(text);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-[#D4AF37] mb-12 hover:gap-4 transition-all">
        <ArrowLeft /> Back to Hub
      </button>

      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-5xl font-serif text-[#D4AF37] mb-4">كوكب الحروف</motion.h1>
        <p className="text-white/40 mb-16 uppercase tracking-[0.3em]">Select a letter to hear its Martian sound</p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {alphabet.map((item) => (
            <motion.div
              key={item.char}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => playSound(item.char)}
              className={`h-40 rounded-3xl flex flex-col items-center justify-center cursor-pointer border-2 transition-all ${selectedChar === item.char ? 'border-[#D4AF37] bg-[#D4AF37]/20' : 'border-white/10 bg-white/5 hover:border-white/30'}`}
            >
              <span className="text-5xl font-bold mb-2">{item.char}</span>
              {selectedChar === item.char && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1 text-[#D4AF37] text-[10px] font-bold">
                   <Volume2 size={12} /> {item.word}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {selectedChar && (
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-20 p-8 border border-[#D4AF37]/30 rounded-[3rem] bg-[#D4AF37]/5 inline-block">
            <Sparkles className="mx-auto mb-4 text-[#D4AF37]" />
            <p className="text-2xl italic">"أحسنتِ يا جلالة الملكة! الحرف ينطق هكذا في مصر."</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
