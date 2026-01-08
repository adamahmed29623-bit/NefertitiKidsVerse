"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles, Mic, UserCheck } from 'lucide-react';

export default function GameStart() {
  const [gameState, setGameState] = useState('WELCOME'); // WELCOME, NAMING, AVATAR_SELECTION
  const [playerName, setPlayerName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  // نداء الملك توت [cite: 2025-12-24]
  const playTutGreeting = () => {
    const msg = new SpeechSynthesisUtterance("أيها الفرعون الصغير، قل القوة الفرعونية لتبدأ المغامرة");
    msg.lang = 'ar-EG';
    msg.rate = 0.8;
    window.speechSynthesis.speak(msg);
  };

  // محاكاة التعرف على النطق (سيتم تطويرها لاحقاً لتعمل بالميكروفون الحقيقي)
  const handleVoiceCommand = () => {
    setGameState('NAMING');
    const msg = new SpeechSynthesisUtterance("أهلاً بك.. اختر اسماً ملكياً تحبه");
    msg.lang = 'ar-EG';
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className="min-h-screen bg-[#001b48] text-white flex flex-col items-center justify-center overflow-hidden font-serif">
      
      {/* خلفية واجهة المتحف الكبير [cite: 2025-12-24] */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#002366]/80 to-black z-10" />
        <motion.img 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10 }}
          src="https://images.unsplash.com/photo-1572252009286-268acec5a0af?auto=format&fit=crop&q=80" 
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      <AnimatePresence mode="wait">
        {/* المرحلة الأولى: النداء الملكي */}
        {gameState === 'WELCOME' && (
          <motion.div 
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="z-20 text-center px-4"
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="mb-8"
            >
              <Crown className="w-24 h-24 text-[#D4AF37] mx-auto drop-shadow-[0_0_20px_#D4AF37]" />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-black text-[#D4AF37] mb-6 tracking-widest uppercase">
              The Grand Museum
            </h1>
            
            <button 
              onClick={() => { playTutGreeting(); handleVoiceCommand(); }}
              className="group relative px-12 py-6 bg-transparent border-2 border-[#D4AF37] overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 text-[#D4AF37] group-hover:text-black font-bold text-2xl flex items-center gap-4">
                <Mic size={24} /> القوة الفرعونية
              </span>
            </button>
          </motion.div>
        )}

        {/* المرحلة الثانية: اختيار الاسم */}
        {gameState === 'NAMING' && (
          <motion.div 
            key="naming"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="z-20 text-center w-full max-w-md px-6"
          >
            <h2 className="text-[#D4AF37] text-3xl mb-8 font-bold tracking-widest">مرحباً بك يا بطل.. ما هو اسمك؟</h2>
            <input 
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full bg-white/5 border-b-4 border-[#D4AF37] text-4xl text-center py-4 outline-none focus:bg-white/10 transition-all text-[#D4AF37]"
              placeholder="اكتب اسمك هنا..."
            />
            {playerName.length > 2 && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => setGameState('AVATAR_SELECTION')}
                className="mt-12 bg-[#D4AF37] text-black px-10 py-4 rounded-full font-bold flex items-center gap-2 mx-auto"
              >
                تأكيد الاسم <UserCheck />
              </motion.button>
            )}
          </motion.div>
        )}

        {/* المرحلة الثالثة: اختيار الأفاتار [cite: 2025-12-24] */}
        {gameState === 'AVATAR_SELECTION' && (
          <motion.div 
            key="avatars"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="z-20 text-center"
          >
            <h2 className="text-[#D4AF37] text-3xl mb-12 font-bold uppercase tracking-[10px]">جسد شخصيتك الملكية</h2>
            <div className="flex gap-8 justify-center flex-wrap">
              {[1, 2, 3].map((num) => (
                <motion.div
                  key={num}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  onClick={() => alert(`مبارك يا فرعون ${playerName}! لقد بدأت المغامرة`)}
                  className="w-40 h-56 bg-white/5 border-2 border-[#D4AF37]/30 rounded-t-full cursor-pointer hover:border-[#D4AF37] flex flex-col items-center justify-center p-4"
                >
                  <div className="w-24 h-24 bg-slate-700 rounded-full mb-4 shadow-[0_0_15px_rgba(212,175,55,0.3)]" />
                  <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Pharaoh {num}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* لمسة الإبهار: جزيئات غبار الذهب المتطايرة [cite: 2025-12-24] */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -1000], 
              opacity: [0, 0.7, 0],
              x: Math.random() * 200 - 100 
            }}
            transition={{ duration: 5 + Math.random() * 5, repeat: Infinity }}
            className="absolute bottom-0 left-1/2 w-1 h-1 bg-[#D4AF37] rounded-full"
          />
        ))}
      </div>
    </div>
  );
}
