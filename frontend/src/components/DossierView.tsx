"use client";

import { DossierResponse } from "@/types";
import { TriggerBadge } from "./TriggerBadge";
import { OutreachSuiteView } from "./OutreachSuiteView";
import { BattlecardsView } from "./BattlecardsView";
import { MapPin, Users, Target, Compass, Clock, ExternalLink } from "lucide-react";

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

  const cleanDomain = company_dna.domain.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="space-y-6 print:space-y-3">
      {/* Print-Only Master Header */}
      <div className="hidden print:flex items-center justify-between pb-2 mb-2 border-b-2 border-zinc-400 avoid-break">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-sm text-black tracking-tight">
              DOSSIER.AI
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-400 text-zinc-800 uppercase font-semibold bg-zinc-100">
              Executive Account Intelligence Brief
            </span>
          </div>
          <p className="text-[10px] font-mono text-zinc-600 mt-0.5">
            Target Account: <strong className="text-black">{company_dna.name}</strong> ({cleanDomain})
          </p>
        </div>
        <div className="text-right font-mono text-[10px] text-zinc-600">
          <div>Audited: {formattedDate}</div>
          <div className="text-zinc-500">Confidential Sales Brief</div>
        </div>
      </div>

      {/* 1. Header Card: Company DNA */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 shadow-sm card-print avoid-break print:bg-white print:border-zinc-300 print:p-3.5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-zinc-800/80 pb-4 mb-4 print:pb-2 print:mb-2.5 print:border-zinc-300">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap mb-1">
              <h1 className="text-xl font-bold tracking-tight text-zinc-100 truncate print:text-black print:text-lg">
                {company_dna.name}
              </h1>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800/90 border border-zinc-700/80 text-zinc-300 print:bg-zinc-100 print:border-zinc-300 print:text-zinc-800">
                {company_dna.industry}
              </span>
            </div>
            <a
              href={`https://${cleanDomain}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-emerald-400 hover:underline inline-flex items-center gap-1 print:text-zinc-700"
            >
              <span>https://{cleanDomain}</span>
              <ExternalLink className="w-3 h-3 text-emerald-400/70 no-print" />
            </a>
          </div>

          <div className="no-print flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 shrink-0 bg-zinc-950/40 border border-zinc-800/60 px-2.5 py-1 rounded">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>Audited: {formattedDate}</span>
          </div>
        </div>

        {/* DNA Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 print:gap-2 print:mb-2.5">
          {/* Headcount Band */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/60 min-w-0 print:bg-zinc-50 print:border-zinc-300 print:p-2">
            <Users className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5 no-print" />
            <div className="min-w-0 flex-1">
              <span className="text-zinc-500 block text-[10px] font-mono uppercase tracking-wider font-semibold mb-0.5 print:text-zinc-600">
                Headcount Band
              </span>
              <span className="text-zinc-200 text-xs font-sans font-medium leading-snug break-words block print:text-zinc-950">
                {company_dna.estimated_size}
              </span>
            </div>
          </div>

          {/* HQ Location */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/60 min-w-0 print:bg-zinc-50 print:border-zinc-300 print:p-2">
            <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5 no-print" />
            <div className="min-w-0 flex-1">
              <span className="text-zinc-500 block text-[10px] font-mono uppercase tracking-wider font-semibold mb-0.5 print:text-zinc-600">
                HQ Location
              </span>
              <span className="text-zinc-200 text-xs font-sans font-medium leading-snug break-words block print:text-zinc-950">
                {company_dna.headquarters || "Regional / Global"}
              </span>
            </div>
          </div>

          {/* Target Audience */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/60 min-w-0 print:bg-zinc-50 print:border-zinc-300 print:p-2">
            <Target className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5 no-print" />
            <div className="min-w-0 flex-1">
              <span className="text-zinc-500 block text-[10px] font-mono uppercase tracking-wider font-semibold mb-0.5 print:text-zinc-600">
                Target Audience
              </span>
              <span className="text-zinc-200 text-xs font-sans font-medium leading-snug break-words block print:text-zinc-950">
                {company_dna.target_audience}
              </span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="p-3.5 rounded-lg bg-zinc-950/70 border border-zinc-800/70 mb-3.5 print:bg-zinc-50 print:border-zinc-300 print:p-2.5 print:mb-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1 font-bold print:text-zinc-700">
            Executive Recon Profile
          </span>
          <p className="text-xs text-zinc-300 leading-relaxed font-sans print:text-zinc-900">
            {company_dna.executive_summary}
          </p>
        </div>

        {/* Core Services Chips */}
        <div className="pt-2 border-t border-zinc-800/60 flex items-start gap-2 flex-wrap print:border-zinc-300 print:pt-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold shrink-0 py-1 print:text-zinc-700">
            Core Lines:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap flex-1 min-w-0">
            {company_dna.core_services.map((svc, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 print:bg-zinc-100 print:border-zinc-300 print:text-zinc-900"
              >
                {svc}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Verified Trigger Signals */}
      <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-5 card-print avoid-break print:bg-white print:border-zinc-300 print:p-3.5">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-4 print:pb-2 print:mb-2 print:border-zinc-300">
          <div>
            <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-zinc-100 flex items-center gap-2 print:text-black">
              <span>Verified Account Growth Triggers</span>
            </h3>
            <p className="text-[11px] font-mono text-zinc-400 mt-0.5 print:text-zinc-600">
              Public footprint anomalies mined from web crawling & hiring shifts
            </p>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-400 font-semibold print:bg-zinc-100 print:border-zinc-300 print:text-zinc-800">
            {triggers.length} Signals Verified
          </span>
        </div>

        <div className="space-y-3 print:space-y-2">
          {triggers.map((t, idx) => (
            <div
              key={idx}
              className="trigger-card avoid-break rounded-lg border border-zinc-800 bg-zinc-900/40 p-3.5 space-y-2 transition hover:border-zinc-700 print:bg-white print:border-zinc-300 print:p-2.5"
            >
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <h4 className="text-xs font-bold text-zinc-100 print:text-black">{t.headline}</h4>
                <TriggerBadge type={t.type} className="print:bg-zinc-100 print:border-zinc-300 print:text-zinc-800" />
              </div>

              <div className="text-xs text-zinc-300 leading-relaxed font-sans print:text-zinc-800">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block mb-0.5 print:text-zinc-600">
                  Footprint Observation:
                </span>
                {t.observation}
              </div>

              <div className="text-xs text-emerald-300/90 leading-relaxed bg-emerald-950/20 border border-emerald-900/30 rounded p-2 font-sans print:bg-zinc-50 print:border-zinc-300 print:text-zinc-900">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-0.5 print:text-zinc-700">
                  Strategic Relevance to Your Pitch:
                </span>
                {t.strategic_relevance}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. High-Probability Strategic Angle */}
      <div className="rounded-xl border border-emerald-800/50 bg-emerald-950/20 p-4 sm:p-5 card-print avoid-break print:bg-zinc-50 print:border-zinc-400 print:p-3">
        <div className="flex items-center gap-2 mb-2">
          <Compass className="w-4 h-4 text-emerald-400 no-print" />
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400 print:text-zinc-900">
            Recommended Commercial Strategic Angle
          </h3>
        </div>
        <p className="text-xs font-sans text-zinc-200 leading-relaxed select-text print:text-zinc-900">
          {strategic_angle}
        </p>
      </div>

      {/* 4. Multi-Channel Cold Outreach Suite */}
      <OutreachSuiteView outreach={outreach} />

      {/* 5. Pre-Call Objection Battlecards */}
      <BattlecardsView battlecards={battlecards} />
    </div>
  );
}
