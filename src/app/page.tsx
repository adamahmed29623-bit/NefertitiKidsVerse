
"use client";
import React, { useState } from 'react';

// استيراد باستخدام الحروف الصغيرة كما سميتِ الملفات
import PharaohAvatar from '../components/pharaohavatar'; 
import Navbar from '../components/navbar'; 
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
      setShowAvatar(true);
      setMessages([...messages, { text: '> خلق', type: 'cmd' }, { text: 'تم استدعاء الأفاتار الملكي بنجاح! انظر لجهة اليمين.', type: 'success' }]);
    } else if (cmd === 'ابدء المغامره') {
      setShowUI(true);
      setMessages([...messages, { text: '> ابدء المغامره', type: 'cmd' }, { text: 'يتم الآن فتح أبواب الأكاديمية...', type: 'success' }]);
    }
    setCommand('');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono relative overflow-hidden flex flex-col">
      {showUI && <Navbar className="animate-in fade-in slide-in-from-top duration-1000" />}
      
      <main className="flex-1 p-10 flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`text-lg ${m.type === 'success' ? 'text-green-400' : m.type === 'welcome' ? 'text-yellow-500 font-bold' : 'text-gray-400'}`}>
              {m.text}
            </div>
          ))}
          <div className="flex gap-2 mt-10 bg-white/5 p-3 rounded border border-[#D4AF37]/30">
            <span className="text-[#D4AF37]">{'>'}</span>
            <input 
              className="bg-transparent outline-none flex-1"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAction()}
              placeholder="أدخل شفرة الأمر..."
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
          {showAvatar && <div className="animate-in zoom-in duration-1000"><PharaohAvatar /></div>}
        </div>
      </main>

      <div className="p-6 opacity-30 text-xs tracking-[10px] uppercase">الهوية الرقمية مفعلة</div>
    </div>
  );
}
