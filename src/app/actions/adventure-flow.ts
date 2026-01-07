"use server"; 
import { ai } from '@genkit-ai/ai';
import { z } from 'zod';

export const adventureFlow = ai.defineFlow({
  name: 'adventureFlow',
  inputSchema: z.object({
    userInput: z.string(),
  }),
  outputSchema: z.string(),
  authPolicy: (auth) => {
    // يمكنكِ إضافة سياسة التحقق هنا إذا لزم الأمر
  }
}, async (input) => {
  const response = await ai.generate({
    model: 'googleai/gemini-1.5-flash', // تأكدي من اسم الموديل المستخدم لديكِ
    prompt: `You are a friendly and encouraging Egyptian Arabic teacher at "Yalla Masry Academy." A student has submitted the following text for correction: "${input.userInput}". 
    Your task is: 
    1. Identify any mistakes in grammar, spelling, or appropriate word choice. 
    2. Provide the corrected sentence or phrase in Egyptian Arabic. 
    3. Briefly and simply explain the correction in Arabic, as if you're talking to a friend. 
    4. Keep your feedback positive and motivating. 
    Start with a phrase like "عاش يا بطل!" or "إجابة ممتازة، وفيه كام تعديل بسيط يخليها أحسن". 
    Format your response clearly. For example: 
    التصحيح: [The corrected sentence] 
    الشرح: [Brief, simple explanation]`,
  });

  return response.text();
});

// تعريف Flow إضافي إذا كنتِ تستخدمين "smartAdventureFlow" في مشروعك
export const smartAdventureFlow = ai.defineFlow({
  name: 'smartAdventureFlow',
  inputSchema: z.object({
    userInput: z.string(),
  }),
  outputSchema: z.string(),
}, async (input) => {
  const response = await ai.generate({
    model: 'googleai/gemini-1.5-flash',
    prompt: `قم بتحليل النص التالي وتقديم نصيحة تعليمية بأسلوب ملكي فخم يليق بأكاديمية نفرتيتي: "${input.userInput}"`,
  });
  return response.text();
});
