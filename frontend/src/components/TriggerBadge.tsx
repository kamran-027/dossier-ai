import { TriggerSignal } from "@/types";
import { Briefcase, TrendingUp, AlertCircle, Cpu, Award } from "lucide-react";

interface TriggerBadgeProps {
  type: TriggerSignal["type"];
  className?: string;
}

export function TriggerBadge({ type, className = "" }: TriggerBadgeProps) {
  switch (type) {
    case "hiring":
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider font-semibold bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 ${className}`}
        >
          <Briefcase className="w-3 h-3" />
          Hiring Surge
        </span>
      );
    case "expansion":
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider font-semibold bg-blue-950/60 border border-blue-800/60 text-blue-400 ${className}`}
        >
          <TrendingUp className="w-3 h-3" />
          Expansion
        </span>
      );
    case "operational":
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider font-semibold bg-amber-950/60 border border-amber-800/60 text-amber-400 ${className}`}
        >
          <AlertCircle className="w-3 h-3" />
          Operational Lag
        </span>
      );
    case "tech":
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider font-semibold bg-purple-950/60 border border-purple-800/60 text-purple-400 ${className}`}
        >
          <Cpu className="w-3 h-3" />
          Tech Friction
        </span>
      );
    case "reputation":
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider font-semibold bg-rose-950/60 border border-rose-800/60 text-rose-400 ${className}`}
        >
          <Award className="w-3 h-3" />
          Reputation
        </span>
      );
    default:
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider font-semibold bg-zinc-800 border border-zinc-700 text-zinc-300 ${className}`}
        >
          Trigger
        </span>
      );
  }
}
