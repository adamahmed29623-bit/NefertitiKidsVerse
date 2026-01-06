"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function KidsVerseHome() {
  const [loadingProgress, setLoadingProgress] = useState(0);

  // محاكاة تحميل "عالم الطفل" بذكاء
  React.useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => (prev < 100 ? prev + 1 : 100));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-[#05050a] flex flex-col items-center justify-center relative overflow-hidden">
      {/* جسيمات ذهبية طائرة في الخلفية */}
      <div className="absolute inset-0 bg-[url('/stars-pattern.png')] opacity-20"></div>
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="z-10 text-center"
      >
        {/* شعار الكيدز فيرس التخيلي */}
        <div className="w-32 h-32 bg-gradient-to-tr from-[#D4AF37] to-[#FFD700] rounded-full mx-auto mb-6 shadow-[0_0_50px_rgba(212,175,55,0.5)] flex items-center justify-center">
          <span className="text-5xl">👑</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-widest">
          NEFERTITI <span className="text-[#D4AF37]">KIDSVERSE</span>
        </h1>
        <p className="text-[#D4AF37] font-mono text-lg mb-8 uppercase tracking-[0.2em]">
          عالم الأذكياء .. حيث تبدأ الأسطورة
        </p>

        {/* شريط التحميل الذكي */}
        <div className="w-64 h-2 bg-gray-800 rounded-full mx-auto overflow-hidden border border-[#D4AF37]/30">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${loadingProgress}%` }}
            className="h-full bg-[#D4AF37] shadow-[0_0_15px_#D4AF37]"
          ></motion.div>
        </div>
        <p className="mt-4 text-gray-500 font-mono text-sm">جاري تهيئة المحاكي الملكي... {loadingProgress}%</p>
      </motion.div>

      {/* الترمنال الصغير المخفي الذي يظهر عند الضغط */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="absolute bottom-10 cursor-pointer p-4 border border-[#D4AF37]/20 rounded-xl bg-black/40 backdrop-blur-md"
      >
        <p className="text-[#D4AF37] text-xs font-mono">> اضغط هنا لفتح بوابة الأوامر السرية</p>
      </motion.div>
    </div>
  );
}
