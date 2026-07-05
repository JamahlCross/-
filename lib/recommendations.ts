import { drills } from "@/data/drills";
import { skills, skillsById } from "@/data/skills";
import type { Recommendation, SkillCategory, TrainingLog } from "@/lib/types";

const foundationBoost: SkillCategory[] = ["スタンス・ガード", "フットワーク", "安全管理"];

export function getRecommendations(skillLevels: Record<string, number>, logs: TrainingLog[], limit = 5): Recommendation[] {
  const latestPain = [...logs].sort((a, b) => b.date.localeCompare(a.date))[0]?.painLevel ?? 0;
  const lastLog = [...logs].sort((a, b) => b.date.localeCompare(a.date))[0];
  const lastDrills = new Set(lastLog?.selectedDrills ?? []);
  const lastCategories = new Set((lastLog?.selectedDrills ?? []).map((id) => drills.find((drill) => drill.id === id)?.category).filter(Boolean));

  const lowSkills = skills
    .map((skill) => ({ skill, level: skillLevels[skill.id] ?? 0 }))
    .filter((item) => item.level <= 2)
    .sort((a, b) => a.level - b.level);

  const candidateSkillIds = lowSkills.length ? lowSkills.map((item) => item.skill.id) : skills.map((skill) => skill.id);

  const candidates = drills
    .filter((drill) => (latestPain >= 4 ? drill.intensity === "低" : true))
    .map((drill) => {
      const matched = drill.targetSkillIds.filter((id) => candidateSkillIds.includes(id));
      const matchedSkill = matched.map((id) => skillsById[id]).find(Boolean);
      let priority = matched.length * 10;
      if (matched.some((id) => (skillLevels[id] ?? 0) <= 2)) priority += 12;
      if (foundationBoost.includes(drill.category)) priority += 8;
      if (drill.intensity === "低") priority += latestPain >= 4 ? 10 : 3;
      if (lastDrills.has(drill.id)) priority -= 12;
      if (lastCategories.has(drill.category)) priority -= 4;
      if (drill.safetyNotes.length > 0) priority += 2;
      return {
        drill,
        matchedSkill,
        priority
      };
    })
    .filter((item) => item.priority > 0)
    .sort((a, b) => b.priority - a.priority);

  return candidates.slice(0, limit).map((item) => ({
    drillId: item.drill.id,
    priority: item.priority,
    reason:
      latestPain >= 4
        ? "痛みレベルを考慮し、低強度でフォームを整える練習です。"
        : item.matchedSkill
          ? `${item.matchedSkill.name}のスコアを優先して選びました。`
          : "基礎姿勢と安全を保ちやすい練習です。"
  }));
}
