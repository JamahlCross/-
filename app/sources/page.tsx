import { BookOpen } from "lucide-react";
import { sourceTitles } from "@/data/sources";
import { PageHeader, Panel } from "@/components/UI";

export default function SourcesPage() {
  return (
    <div>
      <PageHeader
        title="参考資料"
        description="アプリ内のチェック項目や練習分類は、以下の資料を参考に家庭用ソロ練習向けへ短く再構成しています。本文の大量転載はしていません。"
      />
      <Panel>
        <div className="space-y-3">
          {sourceTitles.map((title) => (
            <div key={title} className="flex items-start gap-3 rounded border border-slate-200 bg-white p-4">
              <BookOpen className="mt-0.5 size-5 text-train" />
              <span className="font-semibold text-ink">{title}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
