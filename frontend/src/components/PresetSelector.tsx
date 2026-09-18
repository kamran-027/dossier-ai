"use client";

import { PresetAccount } from "@/types";
import { Truck, Stethoscope, Hammer, Building2 } from "lucide-react";

interface PresetSelectorProps {
  presets: PresetAccount[];
  selectedId: string | null;
  onSelect: (preset: PresetAccount) => void;
  disabled?: boolean;
}

export function PresetSelector({ presets, selectedId, onSelect, disabled }: PresetSelectorProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case "apex-logistics":
        return <Truck className="w-4 h-4 text-amber-400" />;
      case "summit-dental":
        return <Stethoscope className="w-4 h-4 text-cyan-400" />;
      case "vanguard-roofing":
        return <Hammer className="w-4 h-4 text-rose-400" />;
      case "heritage-accounting":
        return <Building2 className="w-4 h-4 text-emerald-400" />;
      default:
        return <Building2 className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">
          Turnkey Commercial Demo Presets
        </label>
        <span className="text-[11px] font-mono text-zinc-500">1-click audit simulation</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {presets.map((preset) => {
          const isSelected = selectedId === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(preset)}
              className={`text-left p-2.5 rounded-lg border transition-all relative overflow-hidden group ${
                isSelected
                  ? "bg-zinc-900 border-zinc-600 ring-1 ring-zinc-500"
                  : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40"
              } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <div className="flex items-center gap-2 mb-1">
                {getIcon(preset.id)}
                <span className="font-semibold text-xs text-zinc-200 truncate">{preset.title}</span>
              </div>
              <p className="text-[11px] font-mono text-zinc-400 truncate">{preset.category}</p>
              <p className="text-[10px] font-mono text-zinc-500 truncate mt-0.5">
                {preset.prospect_name} ({preset.prospect_role})
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
