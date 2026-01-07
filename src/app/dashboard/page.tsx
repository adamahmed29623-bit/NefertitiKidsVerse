"use client";
import React, { useState, useRef, useEffect } from 'react';
// التعديل الجوهري: الرجوع خطوتين للوصول للمكونات من داخل مجلد dashboard
import Navbar from '../../components/navbar';

export default function Dashboard() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [showTreasure, setShowTreasure] = useState(false);
  
  // مرجع للصوت الملكي الخاص بكِ [cite: 2025-12-24]
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // قائمة التحديات الملكية المتسلسلة [cite: 2025-12-24]
  const challenges = [
    { id: 1, title: "لغز نفرتيتي", desc: "رتب حروف الاسم الملكي الصحيحة", points: 250, icon: "🏺" },
    { id: 2, title: "مهندس الأهرامات", desc: "ضع قمة الهرم الذهبية في مكانها", points: 500, icon: "📐" },
    { id: 3, title: "حارس النيل", desc: "انقل المياه للحقول الجافة", points: 500, icon: "🌊" },
    { id: 4, title: "قناع الملك", desc: "استعد قناع توت عنخ آمون من المتاهة", points: 1000, icon: "👑" },
  ];

  const playRoyalVoice = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("الصوت يحتاج تفاعل أولاً", e));
    }
  };

  const completeChallenge = (id: number, points: number) => {
    if (id === currentLevel) {
      setXp(prev => prev + points);
      setCurrentLevel(prev => prev + 1);
      playRoyalVoice(); // تشغيل صوت الملكة عند النجاح [cite: 2025-12-24]
    }
  };

  // تفعيل ظهور صندوق الكنوز عند إنهاء كافة التحديات [cite: 2025-12-24]
  useEffect(() => {
    if (currentLevel > challenges.length && challenges.length > 0) {
      setShowTreasure(true);
    }
  }, [currentLevel, challenges.length]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-serif selection:bg-yellow-500/30">
      {/* شريط التنقل العلوي */}
      <Navbar />
      
      {/* ملف الصوت الملكي في مجلد public/sounds [cite: 2025-12-24] */}
      <audio ref={audioRef} src="/sounds/success.mp3" />

      <main className="p-6 md:p-16 max-w-5xl mx-auto">
        {/* لوحة التحكم الملكية وإحصائيات الـ XP */}
        <div className="relative overflow-hidden bg-gradient-to-r from-yellow-900/20 to-black border border-yellow-600/30 p-8 rounded-3xl mb-12 shadow-2xl">
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h1 className="text-4xl text-[#D4AF37] font-bold mb-2 tracking-tighter uppercase">خريطة المجد</h1>
              <p className="text-gray-400">المستكشفة الملكة: <span className="text-white font-bold">نفرتيتي</span></p>
            </div>
            <div className="text-right">
              <div className="text-yellow-600 text-xs uppercase tracking-[4px] mb-1 font-bold">Total XP</div>
              <div className="text-6xl font-black text-white drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                {xp}
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-600/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        </div>

        {/* عرض التحديات بشكل طولي متسلسل [cite: 2025-12-24] */}
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
                  'border-yellow-500 bg-yellow-950/10 cursor-pointer hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:scale-[1.01]'
                }`}
              >
                {/* أيقونة التحدي أو القفل [cite: 2025-12-24] */}
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl transition-transform group-hover:rotate-12 ${
                  isLocked ? 'bg-gray-800' : 'bg-gradient-to-tr from-yellow-600 to-yellow-300 shadow-lg'
                }`}>
                  {isLocked ? "🔒" : ch.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className={`text-2xl font-bold ${isLocked ? 'text-gray-600' : 'text-yellow-500'}`}>{ch.title}</h3>
                    {isCompleted && <span className="text-green-500 text-sm font-bold tracking-widest">✓ مكتمل</span>}
                  </div>
                  <p className="text-gray-400 font-light">{ch.desc}</p>
                </div>

                {!isLocked && !isCompleted && (
                  <div className="text-yellow-500 font-bold animate-pulse px-4 py-2 border border-yellow-500/30 rounded-lg">
                    ابدئي الآن ←
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ظهور صندوق الكنوز النهائي عند الإنجاز الكامل [cite: 2025-12-24] */}
        {showTreasure && (
          <div className="animate-in zoom-in duration-1000 mt-12 p-12 border-4 border-double border-yellow-500 rounded-3xl bg-gradient-to-t from-yellow-900/40 to-black text-center shadow-[0_0_50px_rgba(212,175,55,0.3)]">
            <div className="text-8xl mb-6">🎁</div>
            <h2 className="text-4xl font-bold text-[#D4AF37] mb-4">كنز الأكاديمية العظيم</h2>
            <p className="text-white text-xl mb-8 font-light">لقد أثبتّي أنكِ وريثة حقيقية للحضارة المصرية العظيمة!</p>
            <button className="bg-yellow-500 text-black font-extrabold px-12 py-4 rounded-full hover:bg-yellow-400 transition-all transform hover:scale-110 shadow-[0_0_20px_rgba(212,175,55,0.6)] uppercase tracking-widest">
              استلام الشهادة الملكية
            </button>
          </div>
        )}
      </main>

      {/* تذييل الصفحة بالهوية الملكية [cite: 2025-12-24] */}
      <footer className="text-center p-12 opacity-20 text-[8px] tracking-[15px] uppercase">
        Nefertiti Royal Academy • Guardians of History
      </footer>
    </div>
  );
}
