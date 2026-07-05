import { skills } from "@/data/skills";
import { SkillDetail } from "./skill-detail";

export const dynamicParams = false;

export function generateStaticParams() {
  return skills.map((skill) => ({ id: skill.id }));
}

export default async function SkillDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SkillDetail id={id} />;
}
