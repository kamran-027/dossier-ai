import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DossierAI — Account Intelligence & Trigger-Based Outbound Engine",
  description:
    "Autonomous B2B sales reconnaissance and multi-channel trigger-first cold outbound engine for commercial real-world sales teams.",
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
