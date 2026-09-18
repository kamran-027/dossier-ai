"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { PresetSelector } from "@/components/PresetSelector";
import { InputPanel } from "@/components/InputPanel";
import { DossierView } from "@/components/DossierView";
import { DossierResponse, PresetAccount } from "@/types";
import { Terminal, Shield, Sparkles } from "lucide-react";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const FALLBACK_PRESETS: PresetAccount[] = [
  {
    id: "apex-logistics",
    title: "Apex Global Logistics",
    category: "Commercial Freight & Fleet",
    company_url: "apexlogistics.com",
    prospect_name: "Marcus Vance",
    prospect_role: "VP of Fleet Operations",
    my_offering: "Autonomous Fleet Maintenance & Dispatch Automation Platform (cuts unscheduled truck downtime by 34%)",
    target_industry: "Commercial Freight & Logistics",
    mock_recon_text: "Interstate 3PL carrier operating 320 power units and 450 trailers across the Sunbelt corridor.",
  },
  {
    id: "summit-dental",
    title: "Summit Dental & Facial Aesthetics",
    category: "High-Ticket Medical & Healthcare",
    company_url: "summitdentalstudio.com",
    prospect_name: "Dr. Aris Thorne",
    prospect_role: "Founder & Clinical Director",
    my_offering: "24/7 AI Patient Intake & Emergency Triage Engine (captures after-hours implants and cosmetic inquiries directly into PMS)",
    target_industry: "High-Ticket Healthcare & Aesthetics",
    mock_recon_text: "Multi-specialty clinic in Scottsdale specializing in full-arch implants and veneers.",
  },
  {
    id: "vanguard-roofing",
    title: "Vanguard Commercial Roofing",
    category: "Construction & Commercial Services",
    company_url: "vanguardroofingtx.com",
    prospect_name: "Cole Hendricks",
    prospect_role: "Chief Operating Officer / Partner",
    my_offering: "Automated Commercial Takeoff & AI Aerial Estimating Platform (delivers 48-hour bid turnaround on multi-million dollar industrial roofs)",
    target_industry: "Commercial Construction & Contracting",
    mock_recon_text: "Premier commercial and industrial roofing contractor serving the Austin-San Antonio corridor.",
  },
  {
    id: "heritage-accounting",
    title: "Heritage Advisory & CPA Partners",
    category: "Professional Services & Finance",
    company_url: "heritagecpa.com",
    prospect_name: "Eleanor Sterling",
    prospect_role: "Managing Partner",
    my_offering: "Autonomous Document Intake & Tax Workpaper Reconciliation Agent (eliminates 15 hours of manual data entry per staff member weekly)",
    target_industry: "Accounting & Financial Services",
    mock_recon_text: "45-person accounting partnership serving mid-market manufacturing and real estate syndicates.",
  },
];

export default function Home() {
  const [presets, setPresets] = useState<PresetAccount[]>(FALLBACK_PRESETS);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>("apex-logistics");

  // Form states
  const [companyUrl, setCompanyUrl] = useState("apexlogistics.com");
  const [prospectName, setProspectName] = useState("Marcus Vance");
  const [prospectRole, setProspectRole] = useState("VP of Fleet Operations");
  const [myOffering, setMyOffering] = useState(
    "Autonomous Fleet Maintenance & Dispatch Automation Platform (cuts unscheduled truck downtime by 34%)"
  );
  const [targetIndustry, setTargetIndustry] = useState("Commercial Freight & Logistics");

  // Output states
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [dossierData, setDossierData] = useState<DossierResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch presets from API on load
  useEffect(() => {
    async function loadPresets() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/presets`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setPresets(data);
          }
        }
      } catch (err) {
        console.warn("Using embedded fallback presets.");
      }
    }
    loadPresets();
  }, []);

  const handleSelectPreset = (preset: PresetAccount) => {
    setSelectedPresetId(preset.id);
    setCompanyUrl(preset.company_url);
    setProspectName(preset.prospect_name);
    setProspectRole(preset.prospect_role);
    setMyOffering(preset.my_offering);
    setTargetIndustry(preset.target_industry);
    setError(null);
  };

  const handleGenerateDossier = async () => {
    if (!companyUrl.trim() || !myOffering.trim()) return;

    setLoading(true);
    setError(null);
    setLoadingStep("Crawling domain footprint...");

    const stepTimer1 = setTimeout(() => {
      setLoadingStep("Extracting hiring & operational signals...");
    }, 1200);

    const stepTimer2 = setTimeout(() => {
      setLoadingStep("Synthesizing trigger-first outbound suite...");
    }, 2800);

    try {
      const response = await fetch(`${BACKEND_URL}/api/generate-dossier`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_url: companyUrl.trim(),
          prospect_name: prospectName.trim() || undefined,
          prospect_role: prospectRole.trim() || undefined,
          my_offering: myOffering.trim(),
          target_industry: targetIndustry.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || `Server error: ${response.status}`);
      }

      const data: DossierResponse = await response.json();
      setDossierData(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate dossier. Please verify the backend is active.");
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setLoading(false);
      setLoadingStep("");
    }
  };

  // Initial auto-generation for immediate interactive display
  useEffect(() => {
    handleGenerateDossier();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      <Navbar onPrint={handlePrint} hasData={!!dossierData} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Hero Pitch Banner */}
        <div className="border border-zinc-800/80 rounded-2xl bg-gradient-to-b from-zinc-900/60 to-zinc-950 p-6 sm:p-8 relative overflow-hidden">
          <div className="max-w-3xl space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-mono">
              <Sparkles className="w-3 h-3" />
              <span>Day 17 Proof of Work // Commercial B2B Sales Recon</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100">
              Autonomous Account Intelligence & Trigger-Based Outbound
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
              Enter any real-world commercial domain (freight carriers, medical clinics, commercial roofers, CPA firms). DossierAI autonomously crawls public signals, mines operational triggers, and crafts zero-fluff cold outreach suites & objection battlecards.
            </p>
          </div>
        </div>

        {/* Turnkey Preset Bar */}
        {presets.length > 0 && (
          <div className="no-print">
            <PresetSelector
              presets={presets}
              selectedId={selectedPresetId}
              onSelect={handleSelectPreset}
              disabled={loading}
            />
          </div>
        )}

        {/* Split Panel Command Center */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-5 space-y-4 no-print">
            <InputPanel
              companyUrl={companyUrl}
              setCompanyUrl={setCompanyUrl}
              prospectName={prospectName}
              setProspectName={setProspectName}
              prospectRole={prospectRole}
              setProspectRole={setProspectRole}
              myOffering={myOffering}
              setMyOffering={setMyOffering}
              targetIndustry={targetIndustry}
              setTargetIndustry={setTargetIndustry}
              onSubmit={handleGenerateDossier}
              loading={loading}
              loadingStep={loadingStep}
            />

            {error && (
              <div className="p-3.5 rounded-xl border border-rose-800/60 bg-rose-950/30 text-rose-300 text-xs font-mono">
                <span className="font-bold block mb-1">Reconnaissance Note:</span>
                <span>{error}</span>
              </div>
            )}

            <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30 text-xs font-mono text-zinc-500 space-y-2">
              <div className="flex items-center gap-2 text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>The Cadence Labs Outbound Standard</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-zinc-400 text-[11px]">
                <li>Zero sycophantic fluff ("I hope this finds you well").</li>
                <li>Every message leads with an observable trigger event.</li>
                <li>Psychological battlecards reframe instinctual brush-offs.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Dossier Report */}
          <div className="lg:col-span-7">
            {dossierData ? (
              <DossierView data={dossierData} />
            ) : loading ? (
              <div className="h-96 rounded-xl border border-zinc-800 bg-zinc-900/30 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-10 h-10 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mb-3"></div>
                <p className="text-xs font-mono text-zinc-200 font-semibold uppercase tracking-wider">
                  {loadingStep || "Conducting Recon..."}
                </p>
                <p className="text-[11px] font-mono text-zinc-500 mt-1">
                  Parsing DOM tree, career pages, and synthesizing account intelligence
                </p>
              </div>
            ) : (
              <div className="h-96 rounded-xl border border-zinc-800/80 bg-zinc-900/20 flex flex-col items-center justify-center p-6 text-center text-zinc-500">
                <Terminal className="w-8 h-8 text-zinc-600 mb-2" />
                <p className="text-xs font-mono text-zinc-400">No account dossier active.</p>
                <p className="text-[11px] font-mono text-zinc-600 mt-0.5">
                  Select a commercial preset above or enter a domain on the left.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-6 text-center text-xs font-mono text-zinc-500 no-print">
        <p>
          DossierAI • Built for High-Performance Commercial Outbound Teams • Cadence Labs
        </p>
      </footer>
    </div>
  );
}
