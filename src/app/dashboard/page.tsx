"use client";
import React from 'react';
import Navbar from '../components/navbar';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* شريط التنقل العلوي الذي ظهر في تجربتك بنجاح */}
      <Navbar />

      <main className="p-8 md:p-20">
        <header className="mb-12 border-l-4 border-yellow-600 pl-6">
          <h1 className="text-4xl font-serif text-[#D4AF37] mb-2">عرش الأكاديمية</h1>
          <p className="text-gray-400">مرحباً بعودتكِ يا ملكة نفرتيتي إلى عالمكِ الخاص.</p>
        </header>

        {/* قسم إحصائيات الملكة (النقاط الملكية) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-yellow-900/20 to-black border border-yellow-600/30 p-6 rounded-2xl">
            <div className="text-yellow-500 text-sm mb-2 uppercase tracking-widest">النقاط الملكية</div>
            <div className="text-3xl font-bold">1,250 XP</div>
          </div>
          <div className="bg-black border border-yellow-600/10 p-6 rounded-2xl">
            <div className="text-yellow-500 text-sm mb-2 uppercase tracking-widest">المستوى</div>
            <div className="text-3xl font-bold">نخبة الفراعنة</div>
          </div>
        </div>

        {/* مسارات التعلم (التي ستصبح خريطتك الملونة) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-64 bg-yellow-600/5 border border-dashed border-yellow-600/20 rounded-3xl flex items-center justify-center group hover:border-yellow-600/50 transition">
            <span className="text-yellow-600/40 group-hover:text-yellow-500 transition font-serif text-xl">مسار اللغة المصرية (قريباً)</span>
          </div>
          <div className="h-64 bg-yellow-600/5 border border-dashed border-yellow-600/20 rounded-3xl flex items-center justify-center group hover:border-yellow-600/50 transition">
            <span className="text-yellow-600/40 group-hover:text-yellow-500 transition font-serif text-xl">مسار أسرار الأهرامات (قريباً)</span>
          </div>
        </div>
      </main>
    </div>
  );
}
