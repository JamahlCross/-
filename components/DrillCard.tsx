import Link from "next/link";
import { Clock, Gauge } from "lucide-react";
import { categoryTone } from "@/lib/analytics";
import type { Drill } from "@/lib/types";

export function DrillCard({ drill, reason }: { drill: Drill; reason?: string }) {
  const intensityTone = drill.intensity === "低" ? "text-safe" : drill.intensity === "中" ? "text-caution" : "text-danger";
  return (
    <Link href={`/drills/${drill.id}`} className="focus-ring block rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:border-blue-300">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded border px-2 py-1 text-xs font-semibold ${categoryTone(drill.category)}`}>{drill.category}</span>
        <span className={`inline-flex items-center gap-1 text-xs font-semibold ${intensityTone}`}>
          <Gauge className="size-3" />
          {drill.intensity}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
          <Clock className="size-3" />
          {drill.duration}分
        </span>
      </div>
      <h3 className="mt-3 text-lg font-bold text-ink">{drill.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{drill.purpose}</p>
      {reason ? <p className="mt-3 rounded bg-blue-50 px-3 py-2 text-xs leading-5 text-blue-800">{reason}</p> : null}
    </Link>
  );
}
