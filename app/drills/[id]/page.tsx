import { DrillDetail } from "./drill-detail";

export default async function DrillDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DrillDetail id={id} />;
}
