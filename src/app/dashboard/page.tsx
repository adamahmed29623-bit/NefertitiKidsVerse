"use client";
import React, { useState } from 'react';
import Navbar from '../components/navbar';

export default function Dashboard() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [xp, setXp] = useState(0);

  // قاعدة بيانات التحديات الملكية [cite: 2025-12-24]
  const challenges = [
    { id: 1, title: "نداء الأجداد", desc: "فك رموز اسم الملكة نفرتيتي", points: 250, icon: "🏺" },
    { id: 2, title: "بناء الهرم", desc: "رتب الأحجار الضخمة في مكانها", points: 500, icon: "🧱" },
    { id: 3, title: "سر التحنيط", desc: "اجمع الزيوت المقدسة للمراسم", points: 500, icon: "⚱️" },
    { id: 4, title: "كنز توت", desc: "استخرج القناع الذهبي من المقبرة", points: 1000, icon: "👑" },
  ];

  const completeChallenge = (id: number, points: number) => {
    if (id === currentLevel) {
      setXp(prev => prev + points);
      setCurrentLevel(prev => prev + 1);
      alert("أحسنتِ يا ملكة! لقد حصلتِ على نقاط ملكية جديدة.");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-serif">
      <Navbar />

      <main className="p-6 md:p-16">
        {/* شريط الإنجاز الملكي */}
        <div className="flex justify-between items-end mb-12 bg-yellow-900/10 p-6 rounded-3xl border border-yellow-600/20 shadow-[0_0_30px_rgba(212,175,55,0.05)]">
          <div>
            <h1 className="text-4xl text-[#D4AF37] mb-2">خريطة المسارات</h1>
            <p className="text-gray-400">المستوى الحالي: {currentLevel > 4 ? "خبير آثار" : `المهمة ${currentLevel}`}</p>
          </div>
          <div className="text-right">
            <div className="text-[#D4AF37] text-sm uppercase tracking-[3px]">إجمالي النقاط</div>
            <div className="text-5xl font-bold text-white tracking-tighter">{xp} <span className="text-xl text-yellow-600">XP</span></div>
          </div>
        </div>

        {/* سلسلة التحديات المتتالية [cite: 2025-12-24] */}
        <div className="relative space-y-8">
          {/* خط المسار الذهبي الواصل بين التحديات */}
          <div className="absolute left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-600/50 to-transparent -z-10 hidden md:block"></div>

          {challenges.map((ch) => {
            const isLocked = ch.id > currentLevel;
            const isCompleted = ch.id < currentLevel;

            return (
              <div 
                key={ch.id}
                onClick={() => !isLocked && completeChallenge(ch.id, ch.points)}
                className={`relative ml-0 md:ml-4 flex items-center gap-6 p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                  isLocked ? 'opacity-40 grayscale border-gray-800' : 
                  isCompleted ? 'border-green-600 bg-green-900/5' : 'border-yellow-600 bg-yellow-600/5 animate-pulse shadow-[0_0_20px_rgba(212,175,55,0.1)]'
                }`}
              >
                {/* أيقونة التحدي (الجرار الذهبية) [cite: 2025-12-24] */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg ${
                  isLocked ? 'bg-gray-900' : 'bg-gradient-to-t from-yellow-700 to-yellow-400'
                }`}>
                  {isLocked ? "🔒" : ch.icon}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className={`text-xl font-bold ${isLocked ? 'text-gray-500' : 'text-yellow-500'}`}>{ch.title}</h3>
                    <span className="text-xs bg-yellow-900/30 px-3 py-1 rounded-full text-yellow-400">+{ch.points} XP</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{ch.desc}</p>
                </div>

                {isCompleted && (
                  <div className="text-green-500 font-bold text-sm uppercase tracking-widest">مكتمل ✓</div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* لمسة نفرتيتي النهائية */}
      <footer className="text-center p-10 opacity-30 text-[10px] tracking-[10px] uppercase">
        جميع الحقوق محفوظة لأكاديمية نفرتيتي © ٢٠٢٦
      </footer>
    </div>
  );
}
