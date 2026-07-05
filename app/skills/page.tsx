"use client";

import Link from "next/link";
import { skills } from "@/data/skills";
import { LevelBar, PageHeader, Panel } from "@/components/UI";
import { skillCategories } from "@/lib/types";
import { useBoxingData } from "@/lib/storage";

export default function SkillsPage() {
  const { skillLevels } = useBoxingData();

  return (
    <div>
      <PageHeader title="スキル一覧" description="各サブスキルの現在レベル、チェック項目、修正のコツを確認できます。" />
      <div className="space-y-6">
        {skillCategories.map((category) => {
          const items = skills.filter((skill) => skill.category === category);
          return (
            <Panel key={category}>
              <h2 className="text-lg font-bold">{category}</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {items.map((skill) => (
                  <Link key={skill.id} href={`/skills/${skill.id}`} className="focus-ring rounded-lg border border-slate-200 bg-white p-4 hover:border-blue-300">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-ink">{skill.name}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{skill.description}</p>
                      </div>
                      <span className="rounded bg-slate-100 px-2 py-1 text-sm font-bold">{skillLevels[skill.id] ?? 0}/5</span>
                    </div>
                    <LevelBar value={skillLevels[skill.id] ?? 0} />
                  </Link>
                ))}
              </div>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}
