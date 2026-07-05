"use client";

import { useMemo, useState } from "react";
import { Save } from "lucide-react";
import { skills } from "@/data/skills";
import { LevelControl, levelLabels } from "@/components/SkillControls";
import { PageHeader, Panel, SafetyBanner } from "@/components/UI";
import { skillCategories } from "@/lib/types";
import { useBoxingData } from "@/lib/storage";

export default function AssessmentPage() {
  const { skillLevels, updateSkillLevel, saveAssessmentSnapshot, safetyFlag } = useBoxingData();
  const [saved, setSaved] = useState(false);
  const grouped = useMemo(
    () => skillCategories.map((category) => ({ category, items: skills.filter((skill) => skill.category === category) })),
    []
  );

  return (
    <div>
      <PageHeader
        title="サブスキル診断"
        description="0から5点で今の安定度を記録します。強さではなく、安全に再現できるかを基準にします。"
        action={
          <button
            className="focus-ring inline-flex items-center gap-2 rounded bg-train px-4 py-2 text-sm font-semibold text-white"
            type="button"
            onClick={() => {
              saveAssessmentSnapshot();
              setSaved(true);
            }}
          >
            <Save className="size-4" />
            診断を保存
          </button>
        }
      />
      <div className="mb-6">
        <SafetyBanner flag={safetyFlag} />
      </div>
      {saved ? <div className="mb-4 rounded border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">診断履歴を保存しました。</div> : null}

      <Panel className="mb-6">
        <h2 className="text-lg font-bold">評価基準</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {levelLabels.map((label, index) => (
            <div key={label} className="rounded border border-slate-200 bg-slate-50 p-3 text-sm">
              <span className="font-bold text-ink">{index}</span>
              <span className="ml-2 text-slate-700">{label}</span>
            </div>
          ))}
        </div>
      </Panel>

      <div className="space-y-6">
        {grouped.map(({ category, items }) => (
          <Panel key={category}>
            <h2 className="text-lg font-bold">{category}</h2>
            <div className="mt-4 divide-y divide-slate-100">
              {items.map((skill) => (
                <div key={skill.id} className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-semibold text-ink">{skill.name}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{skill.description}</p>
                  </div>
                  <LevelControl value={skillLevels[skill.id] ?? 0} onChange={(value) => updateSkillLevel(skill.id, value)} />
                </div>
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
