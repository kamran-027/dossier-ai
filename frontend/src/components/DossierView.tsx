"use client";

import { DossierResponse } from "@/types";
import { TriggerBadge } from "./TriggerBadge";
import { OutreachSuiteView } from "./OutreachSuiteView";
import { BattlecardsView } from "./BattlecardsView";
import { MapPin, Users, Target, Compass, Clock } from "lucide-react";

interface DossierViewProps {
  data: DossierResponse;
}

export function DossierView({ data }: DossierViewProps) {
  const { company_dna, triggers, strategic_angle, outreach, battlecards, generated_at } = data;

  const formattedDate = new Date(generated_at).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Card: Company DNA */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 shadow-sm card-print">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-zinc-800/80 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl font-bold tracking-tight text-zinc-100">{company_dna.name}</h1>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">
                {company_dna.industry}
              </span>
            </div>
            <a
              href={`https://${company_dna.domain}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-emerald-400 hover:underline mt-1 inline-block"
            >
              https://{company_dna.domain}
            </a>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>Audited: {formattedDate}</span>
          </div>
        </div>

        {/* DNA Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="flex items-center gap-2 p-2.5 rounded bg-zinc-950/60 border border-zinc-800/60 text-xs font-mono">
            <Users className="w-4 h-4 text-zinc-400" />
            <div>
              <span className="text-zinc-500 block text-[10px]">Headcount Band</span>
              <span className="text-zinc-200 font-semibold">{company_dna.estimated_size}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded bg-zinc-950/60 border border-zinc-800/60 text-xs font-mono">
            <MapPin className="w-4 h-4 text-zinc-400" />
            <div>
              <span className="text-zinc-500 block text-[10px]">HQ Location</span>
              <span className="text-zinc-200 font-semibold">{company_dna.headquarters || "Regional"}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded bg-zinc-950/60 border border-zinc-800/60 text-xs font-mono">
            <Target className="w-4 h-4 text-zinc-400" />
            <div>
              <span className="text-zinc-500 block text-[10px]">Target Audience</span>
              <span className="text-zinc-200 font-semibold truncate">{company_dna.target_audience}</span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="p-3 rounded-lg bg-zinc-950/70 border border-zinc-800/70 mb-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1 font-bold">
            Executive Recon Profile
          </span>
          <p className="text-xs text-zinc-300 leading-relaxed">{company_dna.executive_summary}</p>
        </div>

        {/* Core Services Chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-mono text-zinc-500 mr-1">Core Lines:</span>
          {company_dna.core_services.map((svc, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300"
            >
              {svc}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Verified Trigger Signals */}
      <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-5 card-print">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-4">
          <div>
            <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-zinc-100 flex items-center gap-2">
              <span>Verified Account Growth Triggers</span>
            </h3>
            <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
              Public footprint anomalies mined from web crawling & hiring shifts
            </p>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-400 font-semibold">
            {triggers.length} Signals Verified
          </span>
        </div>

        <div className="space-y-3">
          {triggers.map((t, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3.5 space-y-2 transition hover:border-zinc-700"
            >
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <h4 className="text-xs font-bold text-zinc-100">{t.headline}</h4>
                <TriggerBadge type={t.type} />
              </div>

              <div className="text-xs text-zinc-300 leading-relaxed">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block mb-0.5">
                  Footprint Observation:
                </span>
                {t.observation}
              </div>

              <div className="text-xs text-emerald-300/90 leading-relaxed bg-emerald-950/20 border border-emerald-900/30 rounded p-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-0.5">
                  Strategic Relevance to Your Pitch:
                </span>
                {t.strategic_relevance}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. High-Probability Strategic Angle */}
      <div className="rounded-xl border border-emerald-800/50 bg-emerald-950/20 p-4 sm:p-5 card-print">
        <div className="flex items-center gap-2 mb-2">
          <Compass className="w-4 h-4 text-emerald-400" />
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Recommended Commercial Strategic Angle
          </h3>
        </div>
        <p className="text-xs font-sans text-zinc-200 leading-relaxed select-text">
          {strategic_angle}
        </p>
      </div>

      {/* 4. Multi-Channel Cold Outreach Suite */}
      <div className="card-print">
        <OutreachSuiteView outreach={outreach} />
      </div>

      {/* 5. Pre-Call Objection Battlecards */}
      <div className="card-print">
        <BattlecardsView battlecards={battlecards} />
      </div>
    </div>
  );
}
