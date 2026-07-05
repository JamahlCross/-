import { drills } from "@/data/drills";
import { DrillDetail } from "./drill-detail";

export const dynamicParams = false;

export function generateStaticParams() {
  return drills.map((drill) => ({ id: drill.id }));
}

export default async function DrillDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DrillDetail id={id} />;
}
