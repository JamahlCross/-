"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { drillsById } from "@/data/drills";
import { skillsById } from "@/data/skills";
import { PageHeader, Panel, SafetyBanner } from "@/components/UI";
import { useBoxingData } from "@/lib/storage";

export function DrillDetail({ id }: { id: string }) {
  const drill = drillsById[id];
  const { safetyFlag } = useBoxingData();
  if (!drill) notFound();

  return (
    <div>
      <PageHeader title={drill.title} description={drill.purpose} action={<Link className="focus-ring rounded border border-slate-300 bg-white px-4 py-2 text-sm font-semibold" href="/drills">一覧へ戻る</Link>} />
      <div className="mb-6">
        <SafetyBanner flag={safetyFlag} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <Panel>
          <div className="mb-4 flex flex-wrap gap-2 text-sm">
            <span className="rounded bg-blue-50 px-3 py-1 font-semibold text-blue-800">{drill.category}</span>
            <span className="rounded bg-slate-100 px-3 py-1">目安 {drill.duration}分</span>
            <span className="rounded bg-slate-100 px-3 py-1">強度 {drill.intensity}</span>
          </div>
          <Section title="やり方" items={drill.howTo} ordered />
          <Section title="チェックポイント" items={drill.checkpoints} />
          <Section title="よくあるミス" items={drill.commonMistakes} />
        </Panel>
        <div className="space-y-6">
          <Panel>
            <h2 className="text-lg font-bold">安全注意</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-red-800">
              {drill.safetyNotes.map((item) => (
                <li key={item}>・{item}</li>
              ))}
            </ul>
          </Panel>
          <Panel>
            <h2 className="text-lg font-bold">調整</h2>
            <p className="mt-3 text-sm leading-6"><span className="font-semibold text-safe">進める:</span> {drill.progression}</p>
            <p className="mt-3 text-sm leading-6"><span className="font-semibold text-caution">下げる:</span> {drill.regression}</p>
          </Panel>
          <Panel>
            <h2 className="text-lg font-bold">関連スキル</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {drill.targetSkillIds.map((skillId) => (
                <Link key={skillId} href={`/skills/${skillId}`} className="focus-ring rounded border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
                  {skillsById[skillId]?.name ?? skillId}
                </Link>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Section({ title, items, ordered = false }: { title: string; items: string[]; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <section className="mt-5">
      <h2 className="text-lg font-bold">{title}</h2>
      <Tag className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
        {items.map((item, index) => (
          <li key={item}>{ordered ? `${index + 1}. ` : "・"}{item}</li>
        ))}
      </Tag>
    </section>
  );
}
