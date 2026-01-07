"use client";
import React from 'react';

export default function PharaohAvatar() {
  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
      {/* هالة ذهبية مشعة حول الأفاتار */}
      <div className="absolute inset-0 bg-[#D4AF37] opacity-20 blur-3xl rounded-full animate-pulse"></div>
      
      {/* تصميم رمزي للتاج الملكي (إلى أن ترفعي صورتك الخاصة) */}
      <div className="relative z-10 w-full h-full border-4 border-[#D4AF37] rounded-full overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-black flex flex-col items-center justify-center">
         <span className="text-6xl mb-2">👑</span>
         <div className="text-[#D4AF37] font-serif font-bold text-center px-4">
            NEFERTITI
            <div className="text-[10px] tracking-[4px] text-yellow-200/50 uppercase mt-1">Royal Avatar</div>
         </div>
      </div>
      
      {/* زخرفة سفلية ذهبية */}
      <div className="absolute -bottom-2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_15px_#D4AF37]"></div>
    </div>
  );
}
