import { AlertTriangle, ShieldCheck } from "lucide-react";
import { PageHeader, Panel } from "@/components/UI";

const safetyItems = [
  "ウォームアップを行ってから練習を始める",
  "手首・肩・膝に痛みがある場合は無理をしない",
  "自宅では対人スパーリングをしない",
  "頭部接触を避ける",
  "硬いものを素手で殴らない",
  "疲労でフォームが崩れたら休む",
  "めまい、頭痛、吐き気、強い痛みがある場合は中止する",
  "子どもが使う場合は大人の見守りを推奨する"
];

const stopItems = [
  "痛みレベルが7以上",
  "頭痛、吐き気、めまいがある",
  "手首、肩、膝、腰の痛みが増えている",
  "フォームを保てないほど疲れている"
];

export default function SafetyPage() {
  return (
    <div>
      <PageHeader
        title="安全ガイド"
        description="このアプリは医療アドバイスではありません。家庭での軽いソロ練習を安全に始めるための一般的な注意です。"
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <Panel>
          <div className="mb-4 flex items-center gap-3">
            <ShieldCheck className="size-6 text-safe" />
            <h2 className="text-lg font-bold">練習前の基本ルール</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {safetyItems.map((item) => (
              <div key={item} className="rounded border border-green-200 bg-green-50 p-4 text-sm font-semibold leading-6 text-green-900">
                {item}
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <div className="mb-4 flex items-center gap-3">
            <AlertTriangle className="size-6 text-danger" />
            <h2 className="text-lg font-bold">中止の目安</h2>
          </div>
          <ul className="space-y-3">
            {stopItems.map((item) => (
              <li key={item} className="rounded border border-red-200 bg-red-50 p-3 text-sm font-semibold leading-6 text-red-900">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            痛みレベルが4以上の日は低強度に下げます。7以上、または不安な症状がある場合は練習を止め、必要に応じて専門家へ相談してください。
          </p>
        </Panel>
      </div>

      <Panel className="mt-6">
        <h2 className="text-lg font-bold">家庭練習で扱わない内容</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {["強い対人スパーリング", "頭部への接触", "強打の打ち合い", "壁や柱を殴る練習"].map((item) => (
            <div key={item} className="rounded border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
