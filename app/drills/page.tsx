"use client";

import { useMemo, useState } from "react";
import { drills } from "@/data/drills";
import { DrillCard } from "@/components/DrillCard";
import { PageHeader } from "@/components/UI";
import { skillCategories, type DrillIntensity } from "@/lib/types";

export default function DrillsPage() {
  const [category, setCategory] = useState("すべて");
  const [intensity, setIntensity] = useState<"すべて" | DrillIntensity>("すべて");
  const filtered = useMemo(
    () => drills.filter((drill) => (category === "すべて" || drill.category === category) && (intensity === "すべて" || drill.intensity === intensity)),
    [category, intensity]
  );

  return (
    <div>
      <PageHeader title="練習カード" description="家庭でできるソロ練習だけを掲載しています。強打、頭部接触、対人スパーリングは扱いません。" />
      <div className="mb-5 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 md:flex-row">
        <select className="focus-ring rounded border border-slate-300 bg-white px-3 py-2 text-sm" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option>すべて</option>
          {skillCategories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select className="focus-ring rounded border border-slate-300 bg-white px-3 py-2 text-sm" value={intensity} onChange={(event) => setIntensity(event.target.value as "すべて" | DrillIntensity)}>
          <option>すべて</option>
          <option>低</option>
          <option>中</option>
          <option>高</option>
        </select>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((drill) => (
          <DrillCard key={drill.id} drill={drill} />
        ))}
      </div>
    </div>
  );
}
