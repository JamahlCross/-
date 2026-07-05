import { SkillDetail } from "./skill-detail";

export default async function SkillDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SkillDetail id={id} />;
}
