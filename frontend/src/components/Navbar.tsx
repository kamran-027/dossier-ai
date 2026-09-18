"use client";

import { Terminal, Shield, Printer } from "lucide-react";

interface NavbarProps {
  onPrint?: () => void;
  hasData?: boolean;
}

export function Navbar({ onPrint, hasData }: NavbarProps) {
  return (
    <header className="no-print sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded border border-zinc-700 bg-zinc-900 flex items-center justify-center text-zinc-200 shadow-inner">
            <Terminal className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono font-bold tracking-tight text-base text-zinc-100">
              DOSSIER<span className="text-emerald-400">.AI</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 uppercase tracking-widest">
              Autonomous Deal Recon
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded bg-zinc-900/60 border border-zinc-800 text-xs font-mono text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Commercial B2B Calibrated</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-xs font-mono text-zinc-500 border-l border-zinc-800 pl-3">
            <Shield className="w-3.5 h-3.5 text-zinc-400" />
            <span>Enterprise Sales Intelligence</span>
          </div>

          {hasData && onPrint && (
            <button
              onClick={onPrint}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded border border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:border-zinc-600 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-zinc-400" />
              <span>Export PDF</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
