import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/Sidebar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ThemeObserver from "@/components/ThemeObserver";
import { Toaster } from "@/components/ui/sonner";

const interFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Momentix – Evoking the idea of capturing moments.",
  description:
    "A fresh, engaging platform designed for capturing, sharing, and celebrating life's moments. Momentix emphasizes the power of each snap to tell a story, aiming to foster an authentic community where users can create connections through their everyday moments. With an intuitive interface and sleek design, Momentix makes sharing easy and fun, letting users showcase their world and discover others’ experiences with just a click",
};

export default function RootLayout({
  children,
  post,
}: Readonly<{
  children: React.ReactNode;
  post: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interFont.className} antialiased`}>
        {post}
        <main className="flex gap-1">
          <Sidebar />
          {children}
        </main>
        <Toaster />
        <ThemeObserver />
        <SpeedInsights />
      </body>
    </html>
  );
}
