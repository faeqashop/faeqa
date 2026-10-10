import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// আমরা Google-এর Inter ফন্ট ব্যবহার করছি
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Premium E-commerce",
  description: "Women's lifestyle e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // আমরা জোর করে html-কে বলে দিচ্ছি এটি 'light' মোড
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body
        className={`${inter.className} antialiased bg-white text-black min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}