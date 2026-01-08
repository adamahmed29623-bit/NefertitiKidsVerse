"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Mic, Sparkles, Wand2 } from 'lucide-react';

export default function PharaonicLauncher() {
  const [step, setStep] = useState('ENTRANCE'); // ENTRANCE, NAMING, BUILDING_AVATAR
  const [name, setName] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);

  // 1. نداء الملك توت عند البداية [cite: 2025-12-24]
  const startQuest = () => {
    const msg = new SpeechSynthesisUtterance("أيها الفرعون الصغير، قل القوة الفرعونية لتبدأ");
    msg.lang = 'ar-EG';
    msg.rate = 0.8;
    window.speechSynthesis.speak(msg);
    setStep('NAMING');
  };

  // 2. محاكاة بناء الأفاتار سحرياً [cite: 2025-12-24]
  const buildAvatar = () => {
    setIsBuilding(true);
    const msg = new SpeechSynthesisUtterance(`جاري بناء تمثالك الملكي يا ${name}`);
    msg.lang = 'ar-EG';
    window.speechSynthesis.speak(msg);
    
    setTimeout(() => {
      setStep('BUILDING_AVATAR');
      setIsBuilding(false);
    }, 3000);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black font-serif">
      
      {/* خلفية المتحف الكبير - ثابتة وعميقة [cite: 2025-12-24] */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#001b48]/40 to-black z-10" />
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1539760397268-33f5146bd94b?auto=format&fit=crop&q=80" // صورة تعبيرية للمتحف والتماثيل
          className="w-full h-full object-cover"
        />
      </div>

      {/* محتوى اللعبة في المنتصف تماماً [cite: 2025-12-24] */}
      <main className="z-20 w-full max-w-4xl text-center px-6">
        <AnimatePresence mode="wait">
          
          {/* الخطوة 1: واجهة الدخول */}
          {step === 'ENTRANCE' && (
            <motion.div 
              key="ent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="space-y-8"
            >
              <motion.div animate={{ rotateY: 360 }} transition={{ duration: 4, repeat: Infinity }}>
                <Crown className="w-24 h-24 text-[#D4AF37] mx-auto drop-shadow-[0_0_30px_#D4AF37]" />
              </motion.div>
              <h1 className="text-6xl md:text-8xl font-black text-[#D4AF37] tracking-[10px] uppercase drop-shadow-2xl">
                The Grand Museum
              </h1>
              <button 
                onClick={startQuest}
                className="mt-10 px-16 py-8 bg-[#D4AF37] text-black text-2xl font-bold rounded-full hover:scale-110 transition-transform shadow-[0_0_50px_rgba(212,175,55,0.5)] flex items-center gap-4 mx-auto"
              >
                <Mic size={30} /> قل: القوة الفرعونية
              </button>
            </motion.div>
          )}

          {/* الخطوة 2: قول الاسم */}
          {step === 'NAMING' && (
            <motion.div 
              key="name"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              <h2 className="text-4xl text-white font-light tracking-[5px]">بماذا يناديك شعبك المريخي؟</h2>
              <input 
                autoFocus
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full max-w-lg bg-transparent border-b-4 border-[#D4AF37] text-6xl text-center py-4 text-[#D4AF37] outline-none placeholder:text-[#D4AF37]/20"
                placeholder="اسمي تحتمس..."
              />
              {name.length > 2 && (
                <motion.button
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  onClick={buildAvatar}
                  disabled={isBuilding}
                  className="bg-[#D4AF37] text-black px-12 py-4 rounded-xl font-black text-xl flex items-center gap-3 mx-auto"
                >
                  {isBuilding ? "سحر الفراعنة يعمل..." : "ابنِ تمثالي الملكي"} <Wand2 />
                </motion.button>
              )}
            </motion.div>
          )}

          {/* الخطوة 3: تجسيد الأفاتار [cite: 2025-12-24] */}
          {step === 'BUILDING_AVATAR' && (
            <motion.div 
              key="avatar"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="relative w-64 h-80 mx-auto">
                {/* هالة النور حول الأفاتار */}
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-[#D4AF37] blur-[60px] rounded-full"
                />
                {/* تمثال الأفاتار الذهبي */}
                <div className="relative z-10 w-full h-full bg-slate-800 rounded-t-full border-4 border-[#D4AF37] flex flex-col items-center justify-center">
                   <Crown className="w-16 h-16 text-[#D4AF37] mb-4" />
                   <p className="text-2xl font-black text-[#D4AF37] uppercase">{name}</p>
                   <p className="text-[10px] text-white/50 tracking-[5px] mt-2">Pharaoh Activated</p>
                </div>
              </div>
              <h3 className="text-3xl text-white font-bold tracking-widest uppercase">تم تجسيدك بنجاح يا {name}</h3>
              <button className="bg-white text-black px-10 py-4 font-bold rounded-full animate-bounce">
                ادخل قاعة الحروف
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* تأثير جزيئات السحر (Magic Particles) [cite: 2025-12-24] */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [-10, -1000], 
              x: [0, (i % 2 === 0 ? 50 : -50)],
              opacity: [0, 1, 0] 
            }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
            className="absolute bottom-0 left-1/2 w-1 h-1 bg-[#D4AF37] rounded-full"
          />
        ))}
      </div>
    </div>
  );
}
