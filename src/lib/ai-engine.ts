export const processKidCommand = async (command: string) => {
  // هنا نقوم بمحاكاة الـ Flow الذي تملكينه
  const cmd = command.toLowerCase();

  if (cmd.includes("hello") || cmd.includes("أهلا")) {
    return {
      reply: "أهلاً بك يا بطل في نكسوس! أنا Gemini، مستشارتك الملكية. هل أنت مستعد لتصميم أول هرم رقمي؟",
      action: "SHOW_GREETING_ANIMATION"
    };
  }

  if (cmd.includes("build") || cmd.includes("ابني")) {
    return {
      reply: "اختيار ذكي! جاري تجهيز أحجار النيون الذهبية لبناء قصرك...",
      action: "START_BUILDING"
    };
  }

  return {
    reply: "أمر مثير للاهتمام! دعني أبحث في برديات الذكاء الاصطناعي عن طريقة لتنفيذه...",
    action: "SEARCH_KNOWLEDGE"
  };
};
