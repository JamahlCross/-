import { skills } from "@/data/skills";
import { drillsById } from "@/data/drills";
import { skillCategories, type SkillCategory, type TrainingLog } from "@/lib/types";

export function getRecentLogs(logs: TrainingLog[], days = 7) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - (days - 1));
  cutoff.setHours(0, 0, 0, 0);
  return logs.filter((log) => new Date(log.date) >= cutoff);
}

export function totalMinutes(logs: TrainingLog[]) {
  return logs.reduce((sum, log) => sum + log.durationMinutes, 0);
}

export function getWeakSkills(skillLevels: Record<string, number>, limit = 3) {
  return [...skills]
    .sort((a, b) => (skillLevels[a.id] ?? 0) - (skillLevels[b.id] ?? 0) || a.category.localeCompare(b.category))
    .slice(0, limit);
}

export function getCategoryAverages(skillLevels: Record<string, number>) {
  return skillCategories.map((category) => {
    const categorySkills = skills.filter((skill) => skill.category === category);
    const average = categorySkills.length
      ? categorySkills.reduce((sum, skill) => sum + (skillLevels[skill.id] ?? 0), 0) / categorySkills.length
      : 0;
    return { category, average };
  });
}

export function getSevenDayMinutes(logs: TrainingLog[]) {
  return Array.from({ length: 7 }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const key = date.toISOString().slice(0, 10);
    return {
      label: `${date.getMonth() + 1}/${date.getDate()}`,
      minutes: logs.filter((log) => log.date.slice(0, 10) === key).reduce((sum, log) => sum + log.durationMinutes, 0)
    };
  });
}

export function getImprovedSkills(
  currentLevels: Record<string, number>,
  history: { skillLevels: Record<string, number> }[],
  limit = 3
) {
  const oldest = history[history.length - 1]?.skillLevels;
  if (!oldest) return [];
  return skills
    .map((skill) => ({
      skill,
      diff: (currentLevels[skill.id] ?? 0) - (oldest[skill.id] ?? 0)
    }))
    .filter((item) => item.diff > 0)
    .sort((a, b) => b.diff - a.diff)
    .slice(0, limit);
}

export function getRecentLogsForSkill(skillId: string, logs: TrainingLog[], limit = 5) {
  return logs
    .filter((log) => log.selectedDrills.some((drillId) => drillsById[drillId]?.targetSkillIds.includes(skillId)))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}

export function categoryTone(category: SkillCategory) {
  if (category === "安全管理") return "border-green-200 bg-green-50 text-green-800";
  if (category === "体力・コンディショニング") return "border-yellow-200 bg-yellow-50 text-yellow-800";
  if (category === "基本パンチ" || category === "コンビネーション") return "border-blue-200 bg-blue-50 text-blue-800";
  return "border-slate-200 bg-white text-slate-700";
}
