"use client";

import { Minus, Plus } from "lucide-react";

export const levelLabels = [
  "未習得",
  "知識として理解",
  "ゆっくりならできる",
  "シャドーで安定",
  "疲れても崩れにくい",
  "自然に組み合わせ"
];

export function LevelControl({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="focus-ring grid size-9 place-items-center rounded border border-slate-300 bg-white text-slate-700 disabled:opacity-40"
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        disabled={value <= 0}
        aria-label="レベルを下げる"
      >
        <Minus className="size-4" />
      </button>
      <div className="min-w-24 text-center">
        <div className="text-xl font-bold text-ink">{value}</div>
        <div className="text-[11px] leading-4 text-slate-500">{levelLabels[value]}</div>
      </div>
      <button
        className="focus-ring grid size-9 place-items-center rounded border border-slate-300 bg-white text-slate-700 disabled:opacity-40"
        type="button"
        onClick={() => onChange(Math.min(5, value + 1))}
        disabled={value >= 5}
        aria-label="レベルを上げる"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
