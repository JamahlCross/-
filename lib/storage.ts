"use client";

import { useEffect, useMemo, useState } from "react";
import { skills } from "@/data/skills";
import type { AssessmentResult, TrainingLog, UserSettings } from "@/lib/types";

export const STORAGE_KEYS = {
  skillLevels: "boxing.skillLevels",
  trainingLogs: "boxing.trainingLogs",
  assessmentHistory: "boxing.assessmentHistory",
  userSettings: "boxing.userSettings"
} as const;

export const defaultSkillLevels = Object.fromEntries(skills.map((skill) => [skill.id, skill.level])) as Record<string, number>;

const defaultSettings: UserSettings = {
  preferredDuration: 10
};

function safeJsonParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw) as unknown;
    return parsed as T;
  } catch {
    return fallback;
  }
}

function clampLevel(value: unknown) {
  const num = typeof value === "number" && Number.isFinite(value) ? value : 0;
  return Math.min(5, Math.max(0, Math.round(num)));
}

function normalizeSkillLevels(value: unknown): Record<string, number> {
  const raw = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  return Object.fromEntries(skills.map((skill) => [skill.id, clampLevel(raw[skill.id] ?? skill.level)]));
}

function normalizeLogs(value: unknown): TrainingLog[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is TrainingLog => Boolean(item && typeof item === "object" && "date" in item))
    .map((item) => ({
      id: String(item.id || crypto.randomUUID()),
      date: String(item.date),
      selectedDrills: Array.isArray(item.selectedDrills) ? item.selectedDrills.map(String) : [],
      durationMinutes: Math.max(0, Number(item.durationMinutes) || 0),
      perceivedExertion: Math.min(10, Math.max(1, Number(item.perceivedExertion) || 1)),
      painLevel: Math.min(10, Math.max(0, Number(item.painLevel) || 0)),
      notes: String(item.notes || ""),
      selfRating: Math.min(5, Math.max(0, Number(item.selfRating) || 0)),
      nextFocus: String(item.nextFocus || "")
    }));
}

export function getSafetyFlagFromPain(painLevel: number) {
  if (painLevel >= 7) {
    return {
      level: "danger" as const,
      message: "痛みが強い状態です。",
      action: "今日は練習を中止し、必要に応じて医療・運動指導の専門家へ相談してください。"
    };
  }
  if (painLevel >= 4) {
    return {
      level: "caution" as const,
      message: "痛みが気になる状態です。",
      action: "次回は低強度ドリルに絞り、跳躍や強いひねりを避けてください。"
    };
  }
  return {
    level: "safe" as const,
    message: "痛みレベルは低めです。",
    action: "ウォームアップを行い、フォームが崩れる前に休憩してください。"
  };
}

export function useBoxingData() {
  const [loaded, setLoaded] = useState(false);
  const [skillLevels, setSkillLevels] = useState<Record<string, number>>(defaultSkillLevels);
  const [trainingLogs, setTrainingLogs] = useState<TrainingLog[]>([]);
  const [assessmentHistory, setAssessmentHistory] = useState<AssessmentResult[]>([]);
  const [userSettings, setUserSettings] = useState<UserSettings>(defaultSettings);

  useEffect(() => {
    const levels = normalizeSkillLevels(safeJsonParse<unknown>(localStorage.getItem(STORAGE_KEYS.skillLevels), defaultSkillLevels));
    const logs = normalizeLogs(safeJsonParse<unknown>(localStorage.getItem(STORAGE_KEYS.trainingLogs), []));
    const history = safeJsonParse<AssessmentResult[]>(localStorage.getItem(STORAGE_KEYS.assessmentHistory), []);
    const settings = safeJsonParse<UserSettings>(localStorage.getItem(STORAGE_KEYS.userSettings), defaultSettings);
    setSkillLevels(levels);
    setTrainingLogs(logs);
    setAssessmentHistory(Array.isArray(history) ? history : []);
    setUserSettings({ ...defaultSettings, ...(settings || {}) });
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEYS.skillLevels, JSON.stringify(skillLevels));
  }, [loaded, skillLevels]);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEYS.trainingLogs, JSON.stringify(trainingLogs));
  }, [loaded, trainingLogs]);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEYS.assessmentHistory, JSON.stringify(assessmentHistory));
  }, [assessmentHistory, loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEYS.userSettings, JSON.stringify(userSettings));
  }, [loaded, userSettings]);

  const latestLog = useMemo(
    () => [...trainingLogs].sort((a, b) => b.date.localeCompare(a.date))[0],
    [trainingLogs]
  );

  const updateSkillLevel = (skillId: string, level: number) => {
    setSkillLevels((current) => ({ ...current, [skillId]: clampLevel(level) }));
  };

  const saveAssessmentSnapshot = () => {
    const result: AssessmentResult = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      skillLevels
    };
    setAssessmentHistory((current) => [result, ...current].slice(0, 50));
  };

  const addTrainingLog = (log: Omit<TrainingLog, "id">) => {
    setTrainingLogs((current) => [{ ...log, id: crypto.randomUUID() }, ...current]);
  };

  return {
    loaded,
    skillLevels,
    trainingLogs,
    assessmentHistory,
    userSettings,
    latestLog,
    safetyFlag: getSafetyFlagFromPain(latestLog?.painLevel ?? 0),
    setUserSettings,
    updateSkillLevel,
    saveAssessmentSnapshot,
    addTrainingLog
  };
}
