export const skillCategories = [
  "スタンス・ガード",
  "フットワーク",
  "基本パンチ",
  "防御",
  "攻防連携",
  "コンビネーション",
  "距離感・レンジ管理",
  "リズム・フェイント",
  "体力・コンディショニング",
  "安全管理"
] as const;

export type SkillCategory = (typeof skillCategories)[number];
export type DrillIntensity = "低" | "中" | "高";

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  level: number;
  checkpoints: string[];
  commonMistakes: string[];
  correctionTips: string[];
  recommendedDrillIds: string[];
};

export type Drill = {
  id: string;
  title: string;
  category: SkillCategory;
  targetSkillIds: string[];
  purpose: string;
  howTo: string[];
  duration: number;
  intensity: DrillIntensity;
  equipment: string[];
  checkpoints: string[];
  commonMistakes: string[];
  safetyNotes: string[];
  progression: string;
  regression: string;
};

export type TrainingLog = {
  id: string;
  date: string;
  selectedDrills: string[];
  durationMinutes: number;
  perceivedExertion: number;
  painLevel: number;
  notes: string;
  selfRating: number;
  nextFocus: string;
};

export type AssessmentResult = {
  id: string;
  date: string;
  skillLevels: Record<string, number>;
};

export type Recommendation = {
  drillId: string;
  reason: string;
  priority: number;
};

export type SafetyFlag = {
  level: "safe" | "caution" | "danger";
  message: string;
  action: string;
};

export type UserSettings = {
  preferredDuration: number;
  lastRecommendationCategory?: SkillCategory;
};
