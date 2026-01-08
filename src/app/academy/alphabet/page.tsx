{/* بوابة حرف الألف المتوهجة سحرياً [cite: 2025-12-24] */}
{activeStage === 'INTRO' && (
  <motion.div 
    exit={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }} // تأثير الاختفاء القوي
    className="flex flex-col items-center justify-center min-h-screen relative"
  >
    {/* خلفية متوهجة حول الحرف [cite: 2025-12-24] */}
    <motion.div 
      animate={{ opacity: [0.1, 0.3, 0.1] }}
      transition={{ repeat: Infinity, duration: 4 }}
      className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/30 via-transparent to-transparent pointer-events-none"
    />

    <motion.div 
      // الحرف نفسه يصبح عملاقاً ومتوهجاً [cite: 2025-12-24]
      animate={{ 
        scale: [1, 1.05, 1], // نبض الحرف
        boxShadow: ["0 0 40px #ffd700", "0 0 100px #D4AF37", "0 0 40px #ffd700"], // هالة توهج قوية
        background: [ // تدرج لوني سحري داخل الحرف [cite: 2025-12-24]
          "linear-gradient(135deg, #D4AF37, #FFD700, #8B4513)",
          "linear-gradient(135deg, #FFD700, #8B4513, #D4AF37)",
          "linear-gradient(135deg, #8B4513, #D4AF37, #FFD700)"
        ]
      }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      
      whileTap={{ scale: 0.9, boxShadow: "0 0 20px #D4AF37" }} // تأثير الضغط
      onClick={() => {
        setActiveStage('MIRROR');
        speakWord("أ... أنا", 'ar-EG');
      }}
      className="w-[300px] h-[400px] rounded-3xl border-8 border-white/20 flex items-center justify-center cursor-pointer relative overflow-hidden transform rotate-6 scale-95" // حجم ضخم وميلان طفيف
    >
      <motion.span 
        className="text-[200px] font-black text-black z-10 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]"
        animate={{ opacity: [0.8, 1, 0.8] }} // لمعان الحرف
        transition={{ repeat: Infinity, duration: 3 }}
      >
        أ
      </motion.span>
    </motion.div>

    <motion.p 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="mt-12 text-[#D4AF37] text-2xl tracking-[10px] font-light uppercase animate-pulse"
    >
      TOUCH THE GOLDEN MYSTERY
    </motion.p>
  </motion.div>
)}
