"use client";

import { useState } from "react";
import { OutreachSuite } from "@/types";
import { CopyButton } from "./CopyButton";
import { Mail, Linkedin, PhoneCall, Sparkles } from "lucide-react";

interface OutreachSuiteViewProps {
  outreach: OutreachSuite;
}

export function OutreachSuiteView({ outreach }: OutreachSuiteViewProps) {
  const [activeTab, setActiveTab] = useState<"email" | "linkedin" | "phone">("email");

  const wordCount = outreach.cold_email_body.split(/\s+/).filter(Boolean).length;
  const charCount = outreach.linkedin_hook.length;

  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-4 sm:p-5 card-print avoid-break">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 no-print" />
            <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-zinc-100">
              Multi-Channel Cold Outreach Suite
            </h3>
          </div>
          <p className="text-[11px] font-mono text-zinc-400 mt-0.5 print-meta-label">
            Zero fluff. Trigger-first commercial framework.
          </p>
        </div>

        {/* Tab switcher (Screen only) */}
        <div className="no-print flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("email")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
              activeTab === "email" ? "bg-zinc-800 text-zinc-100 font-semibold" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            <span>Email</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("linkedin")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
              activeTab === "linkedin" ? "bg-zinc-800 text-zinc-100 font-semibold" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Linkedin className="w-3.5 h-3.5 text-sky-400" />
            <span>LinkedIn</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("phone")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
              activeTab === "phone" ? "bg-zinc-800 text-zinc-100 font-semibold" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span>Phone Opener</span>
          </button>
        </div>
      </div>

      {/* Screen View: Active Tab Only */}
      <div className="print:hidden">
        {activeTab === "email" && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-zinc-400 font-medium">
                  High-Open Trigger Subject Line Variations:
                </span>
                <span className="text-[10px] font-mono text-zinc-500">Lowercase & conversational</span>
              </div>
              <div className="space-y-2">
                {outreach.cold_email_subjects.map((subj, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs font-mono text-zinc-200"
                  >
                    <span className="truncate pr-2">
                      <span className="text-zinc-500 font-bold mr-2">0{idx + 1}</span>
                      {subj}
                    </span>
                    <CopyButton text={subj} label="Copy" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-zinc-400 font-medium">
                  Trigger-First Cold Email Body:
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                    {wordCount} words
                  </span>
                  <CopyButton text={outreach.cold_email_body} label="Copy Body" />
                </div>
              </div>
              <div className="p-3.5 rounded-lg bg-zinc-900/70 border border-zinc-800 text-xs font-sans text-zinc-200 leading-relaxed whitespace-pre-line select-text">
                {outreach.cold_email_body}
              </div>
            </div>
          </div>
        )}

        {activeTab === "linkedin" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400 font-medium">
                Sub-300 Character Connection / InMail Note:
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    charCount <= 300
                      ? "bg-emerald-950/40 border-emerald-800/60 text-emerald-400"
                      : "bg-amber-950/40 border-amber-800/60 text-amber-400"
                  }`}
                >
                  {charCount} / 300 chars
                </span>
                <CopyButton text={outreach.linkedin_hook} label="Copy Hook" />
              </div>
            </div>
            <div className="p-3.5 rounded-lg bg-zinc-900/70 border border-zinc-800 text-xs font-sans text-zinc-200 leading-relaxed whitespace-pre-line select-text">
              {outreach.linkedin_hook}
            </div>
            <p className="text-[11px] font-mono text-zinc-500">
              Engineered for high acceptance rates by referencing immediate business context rather than pitching in note #1.
            </p>
          </div>
        )}

        {activeTab === "phone" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400 font-medium">
                15-Second Pattern-Interrupt Cold Call Opener:
              </span>
              <CopyButton text={outreach.phone_call_opener} label="Copy Script" />
            </div>
            <div className="p-3.5 rounded-lg bg-zinc-900/70 border border-zinc-800 text-xs font-sans text-zinc-200 leading-relaxed whitespace-pre-line select-text">
              {outreach.phone_call_opener}
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Pattern interrupt acknowledges unscheduled nature, disarming immediate defensive reflexes.</span>
            </div>
          </div>
        )}
      </div>

      {/* Print View: Complete 3-Channel Suite Cleanly Printed */}
      <div className="hidden print:block space-y-4">
        {/* 1. Email */}
        <div className="avoid-break pb-3 border-b border-zinc-200">
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="font-mono text-xs font-bold uppercase text-zinc-900">
              Channel 1: Trigger-First Cold Email
            </h4>
            <span className="text-[10px] font-mono text-zinc-500">{wordCount} words</span>
          </div>
          <div className="mb-2">
            <span className="text-[10px] font-mono font-semibold uppercase text-zinc-500 block mb-1">
              Subject Line Variations:
            </span>
            <div className="space-y-1">
              {outreach.cold_email_subjects.map((s, i) => (
                <div key={i} className="text-xs font-mono text-zinc-800">
                  <span className="font-bold text-zinc-500 mr-2">0{i + 1}</span>
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div className="p-3 rounded bg-zinc-50 border border-zinc-300 text-xs font-sans text-zinc-900 leading-relaxed whitespace-pre-line">
            {outreach.cold_email_body}
          </div>
        </div>

        {/* 2. LinkedIn */}
        <div className="avoid-break pb-3 border-b border-zinc-200">
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="font-mono text-xs font-bold uppercase text-zinc-900">
              Channel 2: LinkedIn Connection / InMail Note
            </h4>
            <span className="text-[10px] font-mono text-zinc-500">{charCount} / 300 chars</span>
          </div>
          <div className="p-3 rounded bg-zinc-50 border border-zinc-300 text-xs font-sans text-zinc-900 leading-relaxed whitespace-pre-line">
            {outreach.linkedin_hook}
          </div>
        </div>

        {/* 3. Phone */}
        <div className="avoid-break">
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="font-mono text-xs font-bold uppercase text-zinc-900">
              Channel 3: 15-Second Pattern-Interrupt Phone Opener
            </h4>
            <span className="text-[10px] font-mono text-zinc-500">Cold Call Script</span>
          </div>
          <div className="p-3 rounded bg-zinc-50 border border-zinc-300 text-xs font-sans text-zinc-900 leading-relaxed whitespace-pre-line">
            {outreach.phone_call_opener}
          </div>
        </div>
      </div>
    </div>
  );
}
