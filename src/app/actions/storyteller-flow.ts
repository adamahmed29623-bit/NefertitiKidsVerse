'use server';

import { ai } from '@/lib/genkit';
import { z } from 'zod';

// تعريف مدخلات القصة (موضوع القصة وعمر الطفل)
const StoryInputSchema = z.object({
  topic: z.string().describe("موضوع القصة (مثلاً: الأهرامات، القطة الفرعونية)"),
  childName: z.string().optional().default("يا بطل"),
});

const StoryOutputSchema = z.object({
  storyText: z.string().describe("نص القصة المشوقة"),
  moral: z.string().describe("الحكمة من القصة"),
  nextChallenge: z.string().describe("تحدي صغير للطفل متعلق بالقصة"),
});

export const storytellerFlow = ai.defineFlow(
  {
    name: 'storytellerFlow',
    inputSchema: StoryInputSchema,
    outputSchema: StoryOutputSchema,
  },
  async (input) => {
    const prompt = `أنت حكواتي ملكي محترف في أكاديمية نفرتيتي. 
    احكِ قصة قصيرة جداً ومشوقة للأطفال عن "${input.topic}".
    مخاطباً الطفل باسم "${input.childName}".
    استخدم لهجة مصرية بيضاء، محببة، ومليئة بالحماس.
    اجعل القصة تنتهي بحكمة تعليمية وتحدي لغوي بسيط.
    
    يجب أن يكون الرد بتنسيق JSON حصراً:
    {
      "storyText": "...",
      "moral": "...",
      "nextChallenge": "..."
    }`;

    const { output } = await ai.generate({
      prompt: prompt,
      model: 'googleai/gemini-2.5-flash',
      config: { temperature: 0.8 }, // لجعل القصة إبداعية أكثر
    });

    // تحويل الرد إلى JSON لضمان عدم حدوث خطأ في Vercel
    try {
      return JSON.parse(output.text) as z.infer<typeof StoryOutputSchema>;
    } catch (e) {
      // رد احتياطي في حال حدوث خطأ في التنسيق
      return {
        storyText: output.text,
        moral: "العلم نور يا بطل!",
        nextChallenge: "اكتب كلمة واحدة تعلمتها من القصة."
      };
    }
  }
);

export async function getStoryAction(input: z.infer<typeof StoryInputSchema>) {
  return await storytellerFlow(input);
}
