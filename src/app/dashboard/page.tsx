"use client";
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/navbar';

export default function Dashboard() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [showTreasure, setShowTreasure] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // سجل التحديات الملكية [cite: 2025-12-24]
  const challenges = [
    { id: 1, title: "لغز نفرتيتي", desc: "رتب حروف الاسم الملكي الصحيحة", points: 250, icon: "🏺" },
    { id: 2, title: "مهندس الأهرامات", desc: "ضع قمة الهرم الذهبية في مكانها", points: 500, icon: "📐" },
    { id: 3, title: "حارس النيل", desc: "انقل المياه للحقول الجافة", points: 500, icon: "🌊" },
    { id: 4, title: "قناع الملك", desc: "استعد قناع توت عنخ آمون من المتاهة", points: 1000, icon: "👑" },
  ];

  const playRoyalVoice = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("الصوت يحتاج تفاعل", e));
    }
  };

  const completeChallenge = (id: number, points: number) => {
    if (id === currentLevel) {
      setXp(prev => prev + points);
      setCurrentLevel(prev => prev + 1);
      playRoyalVoice(); // انطلاق صوت الملكة [cite: 2025-12-24]
    }
  };

  // مراقبة إنهاء جميع التحديات لظهور الصندوق [cite: 2025-12-24]
  useEffect(() => {
    if (currentLevel > challenges.length) {
      setShowTreasure(true);
    }
  }, [currentLevel]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-serif selection:bg-yellow-500/30">
      <Navbar />
      <audio ref={audioRef} src="/sounds/success.mp3" />

      <main className="p-6 md:p-16 max-w-5xl mx-auto">
        {/* لوحة التحكم الملكية */}
        <div className="relative overflow-hidden bg-gradient-to-r from-yellow-900/20 to-black border border-yellow-600/30 p-8 rounded-3xl mb-12 shadow-2xl">
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h1 className="text-4xl text-[#D4AF37] font-bold mb-2 tracking-tighter">خريطة المجد</h1>
              <p className="text-gray-400">المستكشفة الملكة: <span className="text-white">نفرتيتي</span></p>
            </div>
            <div className="text-right">
              <div className="text-yellow-600 text-xs uppercase tracking-[4px] mb-1 font-bold">Total Power</div>
              <div className="text-6xl font-black text-white drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">{xp} <span className="text-xl">XP</span></div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-600/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        </div>

        {/* قائمة التحديات المتسلسلة [cite: 2025-12-24] */}
        <div className="grid gap-6 mb-12">
          {challenges.map((ch) => {
            const isLocked = ch.id > currentLevel;
            const isCompleted = ch.id < currentLevel;
            const isActive = ch.id === currentLevel;

            return (
              <div 
                key={ch.id}
                onClick={() => isActive && completeChallenge(ch.id, ch.points)}
                className={`group relative flex items-center gap-6 p-6 rounded-2xl border-2 transition-all duration-500 ${
                  isLocked ? 'opacity-30 border-gray-900 cursor-not-allowed' : 
                  isCompleted ? 'border-green-500/30 bg-green-900/5' : 
                  'border-yellow-500 bg-yellow-950/10 cursor-pointer hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]'
                }`}
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl transition-transform group-hover:rotate-12 ${
                  isLocked ? 'bg-gray-800' : 'bg-gradient-to-tr from-yellow-600 to-yellow-300'
                }`}>
                  {isLocked ? "🔒" : ch.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className={`text-2xl font-bold ${isLocked ? 'text-gray-600' : 'text-yellow-500'}`}>{ch.title}</h3>
                    {isCompleted && <span className="text-green-500 text-sm">✓ مكتمل</span>}
                  </div>
                  <p className="text-gray-400 font-light">{ch.desc}</p>
                </div>

                {!isLocked && !isCompleted && (
                  <div className="text-yellow-500 font-bold animate-pulse">ابدئي الآن ←</div>
                )}
              </div>
            );
          })}
        </div>

        {/* صندوق الكنوز النهائي [cite: 2025-12-24] */}
        {showTreasure && (
          <div className="animate-bounce mt-12 p-12 border-4 border-double border-yellow-500 rounded-3xl bg-gradient-to-t from-yellow-900/40 to-black text-center">
            <div className="text-6xl mb-4">🎁</div>
            <h2 className="text-3xl font-bold text-[#D4AF37] mb-4">كنز الأكاديمية العظيم</h2>
            <p className="text-white mb-6 font-light">لقد أثبتّي أنكِ وريثة حقيقية للحضارة المصرية!</p>
            <button className="bg-yellow-500 text-black font-bold px-10 py-3 rounded-full hover:bg-yellow-400 transition shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              استلام الشهادة الملكية
            </button>
          </div>
        )}
      </main>

      <footer className="text-center p-10 opacity-20 text-[8px] tracking-[15px] uppercase">
        Nefertiti Royal Academy • Built for Future Pharaohs
      </footer>
    </div>
  );
}
