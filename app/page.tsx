"use client";

import Link from "next/link";
import { drillsById } from "@/data/drills";
import { skills } from "@/data/skills";
import { DrillCard } from "@/components/DrillCard";
import { EmptyState, LevelBar, PageHeader, Panel, SafetyBanner, StatCard } from "@/components/UI";
import { getCategoryAverages, getRecentLogs, getSevenDayMinutes, getWeakSkills, totalMinutes } from "@/lib/analytics";
import { getRecommendations } from "@/lib/recommendations";
import { useBoxingData } from "@/lib/storage";

export default function DashboardPage() {
  const { loaded, skillLevels, trainingLogs, safetyFlag } = useBoxingData();
  const recentLogs = getRecentLogs(trainingLogs);
  const weakSkills = getWeakSkills(skillLevels, 3);
  const recommendations = getRecommendations(skillLevels, trainingLogs, 3);
  const sevenDays = getSevenDayMinutes(trainingLogs);
  const maxDaily = Math.max(...sevenDays.map((item) => item.minutes), 15);

  return (
    <div>
      <PageHeader
        title="ダッシュボード"
        description="5から15分の安全なソロ練習を選び、基礎スキルの習熟度と体調を記録します。"
        action={
          <Link className="focus-ring rounded bg-train px-4 py-2 text-sm font-semibold text-white" href="/log">
            今日の練習を記録
          </Link>
        }
      />

      <div className="mb-6">
        <SafetyBanner flag={safetyFlag} />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <StatCard label="直近7日間の練習回数" value={`${recentLogs.length}回`} detail={loaded ? "localStorageに保存中" : "読み込み中"} />
        <StatCard label="合計練習時間" value={`${totalMinutes(trainingLogs)}分`} tone="green" />
        <StatCard label="平均スキルレベル" value={(skills.reduce((sum, skill) => sum + (skillLevels[skill.id] ?? 0), 0) / skills.length).toFixed(1)} detail="0から5点" tone="yellow" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <Panel>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold">今日のおすすめ練習</h2>
            <Link href="/drills" className="text-sm font-semibold text-train">
              すべて見る
            </Link>
          </div>
          {recommendations.length ? (
            <div className="grid gap-3 md:grid-cols-3">
              {recommendations.map((item) => (
                <DrillCard key={item.drillId} drill={drillsById[item.drillId]} reason={item.reason} />
              ))}
            </div>
          ) : (
            <EmptyState title="おすすめを作る準備ができていません" description="まずは診断でスキルレベルを入れると、弱点に合わせた練習が表示されます。" href="/assessment" actionLabel="診断する" />
          )}
        </Panel>

        <Panel>
          <h2 className="text-lg font-bold">弱点トップ3</h2>
          <div className="mt-4 space-y-4">
            {weakSkills.map((skill) => (
              <Link key={skill.id} href={`/skills/${skill.id}`} className="block">
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-semibold text-ink">{skill.name}</span>
                  <span className="text-slate-500">{skillLevels[skill.id] ?? 0}/5</span>
                </div>
                <LevelBar value={skillLevels[skill.id] ?? 0} />
              </Link>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel>
          <h2 className="text-lg font-bold">サブスキル別レベル</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {skills.slice(0, 12).map((skill) => (
              <Link key={skill.id} href={`/skills/${skill.id}`} className="rounded border border-slate-100 p-3 hover:border-blue-200">
                <LevelBar value={skillLevels[skill.id] ?? 0} label={skill.name} />
              </Link>
            ))}
          </div>
          <Link href="/skills" className="mt-4 inline-flex text-sm font-semibold text-train">
            全スキルを見る
          </Link>
        </Panel>

        <Panel>
          <h2 className="text-lg font-bold">直近7日間の練習時間</h2>
          <div className="mt-4 flex h-48 items-end gap-2">
            {sevenDays.map((item) => (
              <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-36 w-full items-end rounded bg-slate-100">
                  <div className="w-full rounded bg-train" style={{ height: `${Math.max(4, (item.minutes / maxDaily) * 100)}%` }} />
                </div>
                <span className="text-[11px] text-slate-500">{item.label}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel className="mt-6">
        <h2 className="text-lg font-bold">カテゴリ別平均</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {getCategoryAverages(skillLevels).map((item) => (
            <LevelBar key={item.category} value={item.average} label={item.category} />
          ))}
        </div>
      </Panel>
    </div>
  );
}
