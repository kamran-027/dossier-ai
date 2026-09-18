import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dossier AI",
  description:
    "Autonomous B2B sales reconnaissance and multi-channel trigger-first cold outbound engine for commercial real-world sales teams.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen selection:bg-emerald-500/20 selection:text-emerald-300">
        {children}
      </body>
    </html>
  );
}
