"use client";

import { ObjectionBattlecard } from "@/types";
import { CopyButton } from "./CopyButton";
import { ShieldAlert, ArrowRight, BrainCircuit } from "lucide-react";

interface BattlecardsViewProps {
  battlecards: ObjectionBattlecard[];
}

export function BattlecardsView({ battlecards }: BattlecardsViewProps) {
  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-zinc-100">
              Pre-Call Objection Battlecard Playbook
            </h3>
          </div>
          <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
            Psychological root diagnosis & 1% enterprise reframing scripts
          </p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
          3 Scenarios
        </span>
      </div>

      <div className="space-y-3.5">
        {battlecards.map((card, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3.5 space-y-2.5 transition hover:border-zinc-700"
          >
            {/* Objection Headline */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                  #{idx + 1}
                </span>
                <span className="text-xs font-semibold text-zinc-100">"{card.objection}"</span>
              </div>
              <CopyButton text={card.reframe_response} label="Copy Script" />
            </div>

            {/* Psychological Root */}
            <div className="flex items-start gap-2 bg-zinc-950/60 border border-zinc-800/60 rounded p-2 text-[11px] font-mono text-zinc-400">
              <BrainCircuit className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-zinc-500 font-semibold mr-1">Underlying Root:</span>
                <span>{card.psychological_root}</span>
              </div>
            </div>

            {/* Reframe Talk Track */}
            <div className="flex items-start gap-2 bg-emerald-950/20 border border-emerald-900/30 rounded p-2.5 text-xs text-zinc-200">
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-wider block mb-0.5">
                  1% Reframe Script:
                </span>
                <span className="leading-relaxed select-text">{card.reframe_response}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
