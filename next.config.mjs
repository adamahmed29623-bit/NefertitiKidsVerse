/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // هذا السطر هو مفتاح الحل لإنشاء مجلد out
  images: {
    unoptimized: true, // ضروري عند استخدام الاستخراج الساكن
  },
};

export default nextConfig;
