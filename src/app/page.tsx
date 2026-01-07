"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // محرك الانتقال الملكي
// استدعاء المكونات بالأسماء الصغيرة كما اعتمدتِها
import PharaohAvatar from '../components/pharaohavatar'; 
import Navbar from '../components/navbar'; 

export default function NefertitiOS() {
  const router = useRouter(); // تفعيل المحرك داخل الدالة بشكل صحيح
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

    const newMsg = { text: `> ${cmd}`, type: 'cmd' };
    let response = { text: 'عذراً، هذه الشفرة غير مسجلة في الأرشيف الملكي.', type: 'error' };

    // 1. أمر الخلق (الأفاتار)
    if (cmd.includes('خلق')) {
      setShowAvatar(true);
      response = { text: 'تم استدعاء الأفاتار الملكي بنجاح! انظر لجهة اليمين.', type: 'success' };
    } 
    // 2. أمر المساعد (توت)
    else if (cmd.includes('توت')) {
      response = { text: 'المساعد الملكي "توت" في خدمتكِ الآن يا جلالة الملكة.', type: 'success' };
    }
    // 3. أمر البدء (الانتقال من الشاشة السوداء)
    else if (cmd.includes('ابدء') || cmd.includes('تحدى') || cmd.includes('مغامره') || cmd.includes('افتح')) {
      setShowUI(true); 
      response = { text: 'جاري فتح بوابات الأكاديمية... استعدي للانتقال للعرش.', type: 'success' };
      
      // السطر السحري للانتقال إلى صفحة الـ dashboard بعد ثانيتين
      setTimeout(() => {
        router.push('/dashboard'); 
      }, 2000);
    }

    setMessages(prev => [...prev, newMsg, response]);
    setCommand('');
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono relative overflow-hidden flex flex-col">
      {showUI && <div className="animate-in slide-in-from-top duration-1000"><Navbar /></div>}

      <main className="flex-1 p-6 md:p-12 flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 z-10">
          <div className="bg-black/40 backdrop-blur-sm border border-yellow-900/20 rounded-xl p-4 mb-6 h-[400px] overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className={`mb-2 text-lg ${
                m.type === 'success' ? 'text-green-400 font-bold' : 
                m.type === 'welcome' ? 'text-yellow-500 font-bold' : 'text-gray-400'
              }`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="relative flex gap-2 bg-[#0a0a0a] p-3 rounded-lg border border-yellow-600/30">
            <span className="text-yellow-500 font-bold flex items-center pl-2">⚡</span>
            <input 
              className="bg-transparent outline-none flex-1 text-white py-2"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAction()}
              placeholder="أدخلي شفرة الأمر الملكي..."
            />
            <button onClick={handleAction} className="bg-yellow-600/20 border border-yellow-600/50 px-6 py-2 rounded text-yellow-500 font-bold">إرسال</button>
          </div>
        </div>

        <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
          {showAvatar && (
            <div className="animate-in zoom-in duration-1000 flex flex-col items-center">
              <PharaohAvatar />
              <div className="mt-6 px-8 py-2 border-2 border-yellow-600 text-[#D4AF37] font-bold rounded-full">الهوية الرقمية مفعلة</div>
            </div>
          )}
        </div>
      </main>

      <footer className="p-6 opacity-20 text-[10px] tracking-[8px] uppercase text-center w-full">
        Nexus Protocol Active • Nefertiti Academy v1.0
      </footer>
    </div>
  );
}
