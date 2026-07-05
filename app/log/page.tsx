"use client";

import { FormEvent, useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { drills } from "@/data/drills";
import { DrillCard } from "@/components/DrillCard";
import { EmptyState, PageHeader, Panel, SafetyBanner } from "@/components/UI";
import { getRecommendations } from "@/lib/recommendations";
import { getSafetyFlagFromPain, useBoxingData } from "@/lib/storage";

const today = () => new Date().toISOString().slice(0, 10);

export default function LogPage() {
  const { skillLevels, trainingLogs, addTrainingLog, safetyFlag } = useBoxingData();
  const [date, setDate] = useState(today());
  const [selectedDrills, setSelectedDrills] = useState<string[]>([]);
  const [durationMinutes, setDurationMinutes] = useState(10);
  const [perceivedExertion, setPerceivedExertion] = useState(4);
  const [painLevel, setPainLevel] = useState(0);
  const [notes, setNotes] = useState("");
  const [selfRating, setSelfRating] = useState(3);
  const [nextFocus, setNextFocus] = useState("");
  const [saved, setSaved] = useState(false);

  const recommendations = useMemo(() => getRecommendations(skillLevels, trainingLogs, 4), [skillLevels, trainingLogs]);
  const formSafety = getSafetyFlagFromPain(painLevel);

  const toggleDrill = (id: string) => {
    setSelectedDrills((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTrainingLog({
      date: new Date(`${date}T12:00:00`).toISOString(),
      selectedDrills,
      durationMinutes,
      perceivedExertion,
      painLevel,
      notes,
      selfRating,
      nextFocus
    });
    setSaved(true);
    setNotes("");
    setNextFocus("");
    setSelectedDrills([]);
  };

  return (
    <div>
      <PageHeader title="練習ログ入力" description="練習内容、体感強度、痛み、次回の焦点を記録します。痛みが高い日は自動で注意を表示します。" />
      <div className="mb-6">
        <SafetyBanner flag={painLevel > 0 ? formSafety : safetyFlag} />
      </div>
      {saved ? (
        <div className="mb-4 flex items-center gap-2 rounded border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
          <CheckCircle2 className="size-4" />
          練習ログを保存しました。
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Panel>
          <form className="space-y-5" onSubmit={submit}>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="日付">
                <input className="focus-ring w-full rounded border border-slate-300 px-3 py-2" type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
              </Field>
              <Field label="練習時間">
                <input className="focus-ring w-full rounded border border-slate-300 px-3 py-2" type="number" min={1} max={120} value={durationMinutes} onChange={(event) => setDurationMinutes(Number(event.target.value))} />
              </Field>
              <Field label="体感強度 1-10">
                <input className="w-full accent-blue-600" type="range" min={1} max={10} value={perceivedExertion} onChange={(event) => setPerceivedExertion(Number(event.target.value))} />
                <span className="text-sm font-semibold">{perceivedExertion}/10</span>
              </Field>
              <Field label="痛みレベル 0-10">
                <input className="w-full accent-red-600" type="range" min={0} max={10} value={painLevel} onChange={(event) => setPainLevel(Number(event.target.value))} />
                <span className="text-sm font-semibold">{painLevel}/10</span>
              </Field>
              <Field label="自己評価 0-5">
                <input className="w-full accent-green-600" type="range" min={0} max={5} value={selfRating} onChange={(event) => setSelfRating(Number(event.target.value))} />
                <span className="text-sm font-semibold">{selfRating}/5</span>
              </Field>
              <Field label="次回の焦点">
                <input className="focus-ring w-full rounded border border-slate-300 px-3 py-2" value={nextFocus} onChange={(event) => setNextFocus(event.target.value)} placeholder="例: ガードの戻り" />
              </Field>
            </div>

            <Field label="メモ">
              <textarea className="focus-ring min-h-28 w-full rounded border border-slate-300 px-3 py-2" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="フォーム、疲れ、痛み、気づいたこと" />
            </Field>

            <div>
              <h2 className="text-lg font-bold">実施した練習</h2>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {drills.map((drill) => (
                  <label key={drill.id} className="flex cursor-pointer items-center gap-3 rounded border border-slate-200 bg-white p-3 text-sm">
                    <input className="size-4 accent-blue-600" type="checkbox" checked={selectedDrills.includes(drill.id)} onChange={() => toggleDrill(drill.id)} />
                    <span className="min-w-0">
                      <span className="block font-semibold text-ink">{drill.title}</span>
                      <span className="block text-xs text-slate-500">{drill.duration}分 / 強度{drill.intensity}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button className="focus-ring w-full rounded bg-train px-4 py-3 font-semibold text-white md:w-auto" type="submit">
              ログを保存
            </button>
          </form>
        </Panel>

        <div className="space-y-6">
          <Panel>
            <h2 className="text-lg font-bold">おすすめから選ぶ</h2>
            <div className="mt-4 grid gap-3">
              {recommendations.map((item) => {
                const drill = drills.find((candidate) => candidate.id === item.drillId);
                return drill ? <DrillCard key={item.drillId} drill={drill} reason={item.reason} /> : null;
              })}
            </div>
          </Panel>

          <Panel>
            <h2 className="text-lg font-bold">最近のログ</h2>
            {trainingLogs.length ? (
              <div className="mt-3 divide-y divide-slate-100">
                {trainingLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="py-3 text-sm">
                    <div className="flex justify-between gap-3">
                      <span className="font-semibold">{log.date.slice(0, 10)}</span>
                      <span className="text-slate-500">{log.durationMinutes}分 / 痛み {log.painLevel}</span>
                    </div>
                    {log.nextFocus ? <p className="mt-1 text-slate-600">次回: {log.nextFocus}</p> : null}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title="ログはまだありません" description="最初は5分の低強度ドリルだけでも十分です。" />
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      {children}
    </label>
  );
}
