"use client";
import React, { useState, useEffect } from 'react';
// استيراد المكونات الملكية من مستودعك
import PharaohAvatar from '@/components/PharaohAvatar'; 
import Navbar from '@/components/Navbar'; 

export default function NefertitiOS() {
  const [command, setCommand] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Quantum Link: Secured', type: 'system' },
    { text: '...Nefertiti KidsVerse OS v1.0.4 initialized', type: 'system' },
    { text: 'أهلاً بك يا بطل في نكسوس. اكتب "خلق" لبدء تجسيد هويتك الملكية.', type: 'welcome' }
  ]);
  const [showAvatar, setShowAvatar] = useState(false);
  const [showUI, setShowUI] = useState(false);

  const handleAction = () => {
    const cmd = command.trim();
    if (cmd === 'خلق') {
      setMessages(prev => [...prev, 
        { text: '> خلق', type: 'cmd' },
        { text: 'تم استدعاء الأفاتار الملكي بنجاح! انظر لجهة اليمين.', type: 'success' }
      ]);
      setShowAvatar(true); // إظهار الأفاتار بصرياً
    } else if (cmd === 'ابدء المغامره') {
      setMessages(prev => [...prev, { text: '> ابدء المغامره', type: 'cmd' }]);
      setShowUI(true); // هنا نفتح الواجهة الكاملة
    } else {
      setMessages(prev => [...prev, { text: `> ${cmd}`, type: 'cmd' }, { text: 'أمر غير معروف في سجلات المملكة.', type: 'error' }]);
    }
    setCommand('');
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono p-4 md:p-10 relative overflow-hidden">
      {/* 1. التاج الملكي (يظهر عند بدء المغامرة) */}
      {showUI && <Navbar className="animate-fadeIn" />}

      {/* 2. منطقة نظام التشغيل (Terminal) كما في صورتك */}
      <div className="max-w-2xl transition-all duration-700">
        <div className="space-y-2 mb-6">
          {messages.map((msg, i) => (
            <div key={i} className={`text-lg ${
              msg.type === 'system' ? 'text-gray-400' : 
              msg.type === 'success' ? 'text-green-400' : 
              msg.type === 'welcome' ? 'text-white font-bold' : 'text-yellow-500'
            }`}>
              {msg.text}
            </div>
          ))}
        </div>

        {/* خانة إدخال الأوامر */}
        <div className="flex gap-2 items-center bg-white/5 p-2 rounded-lg border border-yellow-600/30">
          <span className="text-yellow-500 font-bold">{'>'}</span>
          <input 
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAction()}
            placeholder="أدخل شفرة الأمر..."
            className="bg-transparent border-none outline-none flex-1 text-white"
          />
          <button 
            onClick={handleAction}
            className="bg-blue-600 px-4 py-1 rounded text-sm hover:bg-blue-500 transition"
          >
            إرسال
          </button>
        </div>
      </div>

      {/* 3. تجسيد الأفاتار الملكي (يظهر بجهة اليمين) */}
      {showAvatar && (
        <div className="absolute right-4 top-1/4 md:right-20 animate-bounce-slow">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-yellow-300 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <PharaohAvatar /> {/* المكون الموجود في مستودعك */}
            <div className="mt-4 text-[#D4AF37] text-center font-serif text-xl bg-black/50 p-2 rounded-full border border-yellow-600/20">
              الملكة نفرتيتي
            </div>
          </div>
        </div>
      )}

      {/* الهوية الرقمية مفعلة */}
      <div className="absolute bottom-10 left-10 opacity-50">
        <h2 className="text-2xl font-bold tracking-widest uppercase">الهوية الرقمية مفعلة</h2>
      </div>
    </div>
  );
}
