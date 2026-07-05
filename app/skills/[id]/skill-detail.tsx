"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { drillsById } from "@/data/drills";
import { skillsById } from "@/data/skills";
import { DrillCard } from "@/components/DrillCard";
import { LevelControl, levelLabels } from "@/components/SkillControls";
import { EmptyState, LevelBar, PageHeader, Panel } from "@/components/UI";
import { getRecentLogsForSkill } from "@/lib/analytics";
import { useBoxingData } from "@/lib/storage";

export function SkillDetail({ id }: { id: string }) {
  const skill = skillsById[id];
  const { skillLevels, updateSkillLevel, trainingLogs } = useBoxingData();
  if (!skill) notFound();
  const level = skillLevels[skill.id] ?? 0;
  const nextLevel = Math.min(5, level + 1);
  const recentLogs = getRecentLogsForSkill(skill.id, trainingLogs);

  return (
    <div>
      <PageHeader title={skill.name} description={skill.description} action={<Link className="focus-ring rounded border border-slate-300 bg-white px-4 py-2 text-sm font-semibold" href="/skills">一覧へ戻る</Link>} />

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Panel>
          <h2 className="text-lg font-bold">現在レベル</h2>
          <div className="mt-4">
            <LevelControl value={level} onChange={(value) => updateSkillLevel(skill.id, value)} />
          </div>
          <div className="mt-5">
            <LevelBar value={level} label={`${level}/5 ${levelLabels[level]}`} />
          </div>
          <div className="mt-5 rounded bg-blue-50 p-3 text-sm leading-6 text-blue-900">
            次に目指すレベル: {nextLevel}/5 {levelLabels[nextLevel]}
          </div>
        </Panel>

        <Panel>
          <h2 className="text-lg font-bold">目標とできている状態</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">安全な姿勢を保ったまま、ゆっくりした動作からシャドー中の自然な動作へ進めます。</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <List title="チェックポイント" items={skill.checkpoints} />
            <List title="よくあるミス" items={skill.commonMistakes} />
            <List title="修正のコツ" items={skill.correctionTips} />
          </div>
        </Panel>
      </div>

      <Panel className="mt-6">
        <h2 className="text-lg font-bold">おすすめ練習</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {skill.recommendedDrillIds.map((drillId) => (
            <DrillCard key={drillId} drill={drillsById[drillId]} />
          ))}
        </div>
      </Panel>

      <Panel className="mt-6">
        <h2 className="text-lg font-bold">最近の練習ログ</h2>
        {recentLogs.length ? (
          <div className="mt-4 divide-y divide-slate-100">
            {recentLogs.map((log) => (
              <div key={log.id} className="py-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold">{log.date.slice(0, 10)}</span>
                  <span className="text-slate-500">{log.durationMinutes}分 / 痛み {log.painLevel}/10</span>
                </div>
                {log.notes ? <p className="mt-1 text-slate-600">{log.notes}</p> : null}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="このスキルのログはまだありません" description="関連ドリルを行ったら、練習ログに記録してください。" href="/log" actionLabel="ログを入力" />
        )}
      </Panel>
    </div>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-semibold text-ink">{title}</h3>
      <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
        {items.map((item) => (
          <li key={item}>・{item}</li>
        ))}
      </ul>
    </div>
  );
}
