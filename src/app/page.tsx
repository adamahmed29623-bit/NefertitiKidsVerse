"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
// استدعاء المكونات بالأسماء الصغيرة كما اعتمدتِها
import PharaohAvatar from '../components/pharaohavatar'; 
import Navbar from '../components/navbar'; 

export default function NefertitiOS(const router = useRouter();) {
  const [command, setCommand] = useState('');
  const [showAvatar, setShowAvatar] = useState(false);
  const [showUI, setShowUI] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Quantum Link: Secured', type: 'system' },
    { text: 'Nefertiti KidsVerse OS v1.0.4 initialized...', type: 'system' },
    { text: 'أهلاً بكِ يا ملكة نفرتيتي. الأكاديمية بانتظار أوامركِ.', type: 'welcome' }
  ]);

  const handleAction = () => {
    const cmd = command.trim();
    if (!cmd) return;

    // سجل الأوامر المدخلة
    const newMsg = { text: `> ${cmd}`, type: 'cmd' };
    
    // منطق الاستجابة الذكي (يفحص وجود الكلمة داخل النص لمرونة أكبر)
    let response = { text: 'عذراً، هذه الشفرة غير مسجلة في الأرشيف الملكي.', type: 'error' };

    if (cmd.includes('خلق')) {
      setShowAvatar(true);
      response = { text: 'تم استدعاء الأفاتار الملكي بنجاح! انظر لجهة اليمين.', type: 'success' };
    } 
    else if (cmd.includes('توت')) {
      response = { text: 'المساعد الملكي "توت" في خدمتكِ الآن يا جلالة الملكة.', type: 'success' };
    }
    else if (cmd.includes('ابدء') || cmd.includes('تحدى') || cmd.includes('مغامره') || cmd.includes('افتح')) {
      setShowUI(true); // تفعيل شريط التنقل العلوي
      response = { text: 'جاري فتح بوابات الأكاديمية والمسارات الملكية... استعدي للرحلة.', type: 'success' };
    }else if (cmd.includes('ابدء') || cmd.includes('تحدى')) {
      setShowUI(true);
      response = { text: 'جاري فتح بوابات الأكاديمية... استعدي للرحلة.', type: 'success' };
      
      // أضيفي هذا السطر هنا ليفتح صفحة العرش تلقائياً
      setTimeout(() => {
        router.push('/dashboard'); 
      }, 2000);
    }

    setMessages(prev => [...prev, newMsg, response]);
    setCommand(''); // تفريغ الخانة بعد الإرسال
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono relative overflow-hidden flex flex-col">
      
      {/* ظهور الواجهة العلوية (Navbar) عند أمر البدء */}
      {showUI && (
        <div className="animate-in slide-in-from-top duration-1000">
          <Navbar />
        </div>
      )}

      <main className="flex-1 p-6 md:p-12 flex flex-col md:flex-row items-center justify-between">
        {/* شاشة الأوامر والرسائل */}
        <div className="w-full md:w-2/3 lg:w-1/2 z-10">
          <div className="bg-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-4 mb-6 h-[400px] overflow-y-auto shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            {messages.map((m, i) => (
              <div key={i} className={`mb-2 text-lg leading-relaxed ${
                m.type === 'success' ? 'text-green-400 font-bold' : 
                m.type === 'welcome' ? 'text-yellow-500 font-bold' : 
                m.type === 'error' ? 'text-red-400 opacity-80' : 'text-gray-400'
              }`}>
                {m.text}
              </div>
            ))}
          </div>

          {/* خانة إدخال الأوامر المطورة */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-700 to-yellow-500 rounded-lg blur opacity-20 group-focus-within:opacity-50 transition duration-500"></div>
            <div className="relative flex gap-2 bg-[#0a0a0a] p-3 rounded-lg border border-yellow-600/30">
              <span className="text-yellow-500 font-bold flex items-center pl-2">⚡</span>
              <input 
                className="bg-transparent outline-none flex-1 text-white placeholder:text-gray-700 py-2"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAction()}
                placeholder="أدخلي شفرة الأمر الملكي..."
              />
              <button 
                onClick={handleAction} 
                className="bg-yellow-600/20 hover:bg-yellow-600/40 border border-yellow-600/50 px-6 py-2 rounded text-yellow-500 transition-all font-bold"
              >
                إرسال
              </button>
            </div>
          </div>
        </div>

        {/* منطقة تجسيد الأفاتار */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center mt-12 md:mt-0">
          {showAvatar && (
            <div className="animate-in zoom-in spin-in-12 duration-1000 flex flex-col items-center">
              <PharaohAvatar />
              <div className="mt-6 px-8 py-2 border-2 border-yellow-600 text-[#D4AF37] font-bold tracking-[5px] bg-yellow-950/10 backdrop-blur-md rounded-full shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                 الهوية الرقمية مفعلة
              </div>
            </div>
          )}
        </div>
      </main>

      {/* شريط الحالة السفلي */}
      <footer className="p-6 opacity-20 text-[10px] tracking-[8px] uppercase text-center w-full">
        Nexus Protocol Active • Nefertiti Academy v1.0
      </footer>
    </div>
  );
}
