import type { Metadata } from "next";
import NavigationPosition from '@/components/NavigationPosition';
import "./globals.css";
import "./chrome.css";
import "./microinteractions.css";
import './mobile-refinements.css';

export const metadata: Metadata = {
  title: "Pharos de Alexandria",
  description: "Uma experiência conceitual pelo Farol de Alexandria reconstruído.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased"><NavigationPosition/>{children}</body>
    </html>
  );
}
