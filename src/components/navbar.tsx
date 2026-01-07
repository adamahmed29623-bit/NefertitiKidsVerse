"use client";
import React from 'react';

export default function Navbar({ className }: { className?: string }) {
  return (
    <nav className={`w-full py-6 px-10 flex justify-between items-center border-b border-[#D4AF37]/20 bg-black/50 backdrop-blur-md z-50 ${className}`}>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 border border-[#D4AF37] rounded-full flex items-center justify-center text-xl">🔱</div>
        <span className="text-[#D4AF37] font-serif tracking-widest text-xl uppercase">Yalla Masry Academy</span>
      </div>
      
      <div className="flex gap-8 text-sm tracking-widest text-yellow-100/70">
        <span className="hover:text-[#D4AF37] cursor-pointer transition">العرش</span>
        <span className="hover:text-[#D4AF37] cursor-pointer transition">المسارات</span>
        <span className="hover:text-[#D4AF37] cursor-pointer transition">المتجر</span>
      </div>
    </nav>
  );
}
