import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nefertiti KidsVerse",
  description: "عالم نوابغ المستقبل - الأكاديمية الملكية لتعليم اللغة العربية",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-[#020205] text-white">
        {children}
      </body>
    </html>
  );
}
