"use client";

import Link from "next/link";
import { skills } from "@/data/skills";
import { EmptyState, LevelBar, PageHeader, Panel, StatCard } from "@/components/UI";
import { getCategoryAverages, getImprovedSkills, getSevenDayMinutes, getWeakSkills, totalMinutes } from "@/lib/analytics";
import { useBoxingData } from "@/lib/storage";

export default function ProgressPage() {
  const { skillLevels, trainingLogs, assessmentHistory } = useBoxingData();
  const sevenDays = getSevenDayMinutes(trainingLogs);
  const maxDaily = Math.max(...sevenDays.map((item) => item.minutes), 15);
  const weakSkills = getWeakSkills(skillLevels, 3);
  const improved = getImprovedSkills(skillLevels, assessmentHistory, 3);

  return (
    <div>
      <PageHeader title="進捗可視化" description="棒グラフでスキル、カテゴリ、直近7日間の練習量を確認します。" />

      <div className="grid gap-3 md:grid-cols-3">
        <StatCard label="合計練習時間" value={`${totalMinutes(trainingLogs)}分`} tone="green" />
        <StatCard label="診断保存数" value={`${assessmentHistory.length}回`} />
        <StatCard label="記録済みログ" value={`${trainingLogs.length}件`} tone="yellow" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel>
          <h2 className="text-lg font-bold">サブスキル別の棒グラフ</h2>
          <div className="mt-4 max-h-[520px] space-y-3 overflow-auto pr-2">
            {skills.map((skill) => (
              <Link key={skill.id} href={`/skills/${skill.id}`} className="block">
                <LevelBar value={skillLevels[skill.id] ?? 0} label={skill.name} />
              </Link>
            ))}
          </div>
        </Panel>

        <Panel>
          <h2 className="text-lg font-bold">カテゴリ別平均スコア</h2>
          <div className="mt-4 space-y-3">
            {getCategoryAverages(skillLevels).map((item) => (
              <LevelBar key={item.category} value={item.average} label={item.category} />
            ))}
          </div>
        </Panel>
      </div>

      <Panel className="mt-6">
        <h2 className="text-lg font-bold">直近7日間の練習時間</h2>
        {trainingLogs.length ? (
          <div className="mt-4 flex h-56 items-end gap-2">
            {sevenDays.map((item) => (
              <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-44 w-full items-end rounded bg-slate-100">
                  <div className="w-full rounded bg-train" style={{ height: `${Math.max(4, (item.minutes / maxDaily) * 100)}%` }} />
                </div>
                <span className="text-[11px] text-slate-500">{item.label}</span>
                <span className="text-[11px] font-semibold text-slate-700">{item.minutes}分</span>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="練習時間はまだありません" description="ログを保存すると、ここに直近7日間の練習量が表示されます。" href="/log" actionLabel="ログを入力" />
        )}
      </Panel>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel>
          <h2 className="text-lg font-bold">弱点トップ3</h2>
          <div className="mt-4 space-y-4">
            {weakSkills.map((skill) => (
              <Link key={skill.id} href={`/skills/${skill.id}`} className="block">
                <LevelBar value={skillLevels[skill.id] ?? 0} label={skill.name} />
              </Link>
            ))}
          </div>
        </Panel>
        <Panel>
          <h2 className="text-lg font-bold">改善したスキルトップ3</h2>
          {improved.length ? (
            <div className="mt-4 space-y-3">
              {improved.map((item) => (
                <Link key={item.skill.id} href={`/skills/${item.skill.id}`} className="flex items-center justify-between rounded border border-green-200 bg-green-50 p-3 text-sm">
                  <span className="font-semibold text-green-900">{item.skill.name}</span>
                  <span className="font-bold text-green-700">+{item.diff}</span>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState title="改善履歴はまだありません" description="診断を複数回保存すると、伸びたスキルが表示されます。" href="/assessment" actionLabel="診断を保存" />
          )}
        </Panel>
      </div>
    </div>
  );
}
