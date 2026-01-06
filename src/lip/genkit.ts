import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { dotPrompt } from '@genkit-ai/dotprompt';

/**
 * إعداد محرك الذكاء الاصطناعي للأكاديمية (Nefertiti AI Engine)
 * يتم استخدام Gemini 2.5 Flash لضمان سرعة الاستجابة للأطفال.
 */
export const ai = genkit({
  plugins: [
    googleAI({
      // تأكدي من إضافة GOOGLE_GENAI_API_KEY في إعدادات Vercel
      apiKey: process.env.GOOGLE_GENAI_API_KEY, 
    }),
    dotPrompt(),
  ],
  model: googleAI.model('gemini-2.5-flash'),
});

// تصدير الأدوات الأساسية لاستخدامها في الـ Flows الأخرى
export const { defineFlow, definePrompt, generate } = ai;
