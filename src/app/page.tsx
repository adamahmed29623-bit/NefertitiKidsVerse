"use client";
import React, { useState } from 'react';
import PharaohAvatar from '../components/pharaohavatar'; 
import Navbar from '../components/navbar'; 

export default function NefertitiOS() {
  const [command, setCommand] = useState('');
  const [showAvatar, setShowAvatar] = useState(false);
  const [showUI, setShowUI] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Quantum Link: Secured', type: 'system' },
    { text: 'Nefertiti KidsVerse OS v1.0.4 initialized...', type: 'system' },
    { text: 'أهلاً بكِ يا ملكة نفرتيتي. اكتبي "خلق" لتفعيل الهوية.', type: 'welcome' }
  ]);

  const handleAction = () => {
    const cmd = command.trim();
    
    // منطق تنفيذ الأوامر الملكية
    if (cmd === 'خلق') {
      setShowAvatar(true);
      setMessages(prev => [...prev, { text: `> ${cmd}`, type: 'cmd' }, { text: 'تم استدعاء الأفاتار الملكي بنجاح! انظر لجهة اليمين.', type: 'success' }]);
    } 
    else if (cmd === 'ابدء المغامره' || cmd === 'إبداء اول تحدى') {
      setShowUI(true);
      setMessages(prev => [...prev, { text: `> ${cmd}`, type: 'cmd' }, { text: 'جاري فتح بوابات الأكاديمية والمسارات الملكية...', type: 'success' }]);
      // هنا يمكنك إضافة توجيه لصفحة أخرى إذا أردتِ مستقبلاً
    }
    else if (cmd === 'الملك توت') {
      setMessages(prev => [...prev, { text: `> ${cmd}`, type: 'cmd' }, { text: 'المساعد الملكي "توت" في خدمتكِ الآن.', type: 'success' }]);
    }
    else {
      setMessages(prev => [...prev, { text: `> ${cmd}`, type: 'cmd' }, { text: 'عذراً، هذه الشفرة غير مسجلة في الأرشيف الملكي.', type: 'error' }]);
    }

    setCommand(''); // مسح الخانة بعد الإرسال
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono p-6 relative overflow-hidden flex flex-col">
      
      {/* ظهور التاج الملكي عند أمر ابدء المغامره */}
      {showUI && <Navbar className="animate-bounce" />}

      <div className="flex-1 max-w-3xl">
        <div className="space-y-2 mb-10 h-80 overflow-y-auto">
          {messages.map((m, i) => (
            <div key={i} className={`text-lg ${m.type === 'success' ? 'text-green-400' : m.type === 'welcome' ? 'text-yellow-500' : 'text-gray-400'}`}>
              {m.text}
            </div>
          ))}
        </div>

        {/* خانة الإدخال المرتبطة بالـ State */}
        <div className="flex gap-2 bg-white/5 p-4 rounded-lg border border-yellow-600/30">
          <span className="text-yellow-500 font-bold">{'>'}</span>
          <input 
            className="bg-transparent outline-none flex-1 text-white"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAction()}
            placeholder="أدخل شفرة الأمر..."
          />
          <button onClick={handleAction} className="bg-blue-600 px-6 py-1 rounded hover:bg-blue-500">إرسال</button>
        </div>
      </div>

      {/* منطقة ظهور الأفاتار بصرياً */}
      {showAvatar && (
        <div className="absolute right-10 top-1/4 animate-pulse">
          <PharaohAvatar />
          <div className="mt-4 text-[#D4AF37] text-center font-bold border border-yellow-600 p-2">
             الهوية الرقمية مفعلة
          </div>
        </div>
      )}
    </div>
  );
}
