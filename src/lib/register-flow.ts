/**
 * @fileOverview مركز تسجيل التدفقات الذكية للأكاديمية.
 * هذا الملف يقوم باستدعاء كافة الـ Flows لضمان تسجيلها في محرك Genkit.
 */

import { config } from 'dotenv';

// تشغيل إعدادات البيئة (مفاتيح API)
config();

// تسجيل التدفقات الأمنية وتدفقات الذكاء الاصطناعي
// نستخدم المسارات النسبية لضمان عملها في Vercel دون أخطاء
import '../app/actions/adventure-flow';
import '../app/actions/dialogue-evaluator';
import '../app/actions/animal-sounds';
import '../app/actions/storyteller-flow';
import '../app/actions/security-flow';

console.log('🏛️ Nefertiti KidsVerse: All flows have been registered successfully.');
