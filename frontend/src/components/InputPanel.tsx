"use client";

import { Globe, User, Briefcase, Zap, Loader2, ArrowRight } from "lucide-react";

interface InputPanelProps {
  companyUrl: string;
  setCompanyUrl: (v: string) => void;
  prospectName: string;
  setProspectName: (v: string) => void;
  prospectRole: string;
  setProspectRole: (v: string) => void;
  myOffering: string;
  setMyOffering: (v: string) => void;
  targetIndustry: string;
  setTargetIndustry: (v: string) => void;
  onSubmit: () => void;
  loading: boolean;
  loadingStep: string;
}

export function InputPanel({
  companyUrl,
  setCompanyUrl,
  prospectName,
  setProspectName,
  prospectRole,
  setProspectRole,
  myOffering,
  setMyOffering,
  targetIndustry,
  setTargetIndustry,
  onSubmit,
  loading,
  loadingStep,
}: InputPanelProps) {
  const isFormValid = companyUrl.trim().length > 0 && myOffering.trim().length > 0;

  return (
    <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-4 sm:p-5 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-zinc-200">
            Account Recon Parameters
          </h2>
        </div>
        <span className="text-[10px] font-mono text-zinc-500">Live Crawl + LangGraph</span>
      </div>

      <div className="space-y-3.5">
        {/* Company Domain */}
        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-1 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-zinc-400" />
            Target Business Domain or URL <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={companyUrl}
            onChange={(e) => setCompanyUrl(e.target.value)}
            disabled={loading}
            placeholder="e.g. apexlogistics.com or summitdentalstudio.com"
            className="w-full px-3 py-2 text-xs font-mono bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition"
          />
        </div>

        {/* Prospect Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-zinc-400" />
              Decision Maker Name
            </label>
            <input
              type="text"
              value={prospectName}
              onChange={(e) => setProspectName(e.target.value)}
              disabled={loading}
              placeholder="e.g. Marcus Vance"
              className="w-full px-3 py-2 text-xs font-mono bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">Prospect Role / Title</label>
            <input
              type="text"
              value={prospectRole}
              onChange={(e) => setProspectRole(e.target.value)}
              disabled={loading}
              placeholder="e.g. VP of Fleet Operations"
              className="w-full px-3 py-2 text-xs font-mono bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition"
            />
          </div>
        </div>

        {/* Seller's Offering */}
        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-1 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
            Your Offering / Service Pitch <span className="text-rose-400">*</span>
          </label>
          <textarea
            rows={2}
            value={myOffering}
            onChange={(e) => setMyOffering(e.target.value)}
            disabled={loading}
            placeholder="e.g. Fleet dispatch automation cutting unscheduled maintenance downtime by 34%"
            className="w-full px-3 py-2 text-xs font-mono bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition resize-none"
          />
        </div>

        {/* Target Industry Hint */}
        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-1">Target Sector / Industry Hint</label>
          <input
            type="text"
            value={targetIndustry}
            onChange={(e) => setTargetIndustry(e.target.value)}
            disabled={loading}
            placeholder="e.g. Commercial Freight & Logistics"
            className="w-full px-3 py-2 text-xs font-mono bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition"
          />
        </div>
      </div>

      {/* CTA Button */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={loading || !isFormValid}
        className={`mt-2 w-full py-2.5 px-4 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
          loading
            ? "bg-zinc-800 text-zinc-400 cursor-wait"
            : !isFormValid
            ? "bg-zinc-900 border border-zinc-800 text-zinc-600 cursor-not-allowed"
            : "bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold shadow-lg shadow-emerald-950/40 cursor-pointer"
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
            <span>{loadingStep || "Analyzing account..."}</span>
          </>
        ) : (
          <>
            <span>Synthesize Executive Dossier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </div>
  );
}
