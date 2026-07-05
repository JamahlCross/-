"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, BarChart3, BookOpen, ClipboardCheck, Dumbbell, Home, ListChecks, Moon, ShieldCheck, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", label: "ホーム", icon: Home },
  { href: "/assessment", label: "診断", icon: ClipboardCheck },
  { href: "/skills", label: "スキル", icon: ListChecks },
  { href: "/drills", label: "練習", icon: Dumbbell },
  { href: "/log", label: "ログ", icon: Activity },
  { href: "/progress", label: "進捗", icon: BarChart3 },
  { href: "/safety", label: "安全", icon: ShieldCheck },
  { href: "/sources", label: "資料", icon: BookOpen }
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("boxing.theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = saved === "dark" || saved === "light" ? saved : prefersDark ? "dark" : "light";
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("boxing.theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded bg-train text-sm font-black text-white">BST</span>
            <span>
              <span className="block text-base font-bold leading-tight">Boxing Skill Tracker</span>
              <span className="block text-xs text-slate-500">家庭用ソロ練習</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`focus-ring inline-flex items-center gap-2 rounded px-3 py-2 text-sm font-medium ${
                    active ? "bg-blue-50 text-train" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="size-4" aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            className="focus-ring grid size-10 shrink-0 place-items-center rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "ライトモードに切り替え" : "ダークモードに切り替え"}
            title={theme === "dark" ? "ライトモード" : "ダークモード"}
          >
            {theme === "dark" ? <Sun className="size-5" aria-hidden /> : <Moon className="size-5" aria-hidden />}
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 pb-28 md:py-8">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white md:hidden">
        <div className="grid grid-cols-4 gap-1 px-2 py-2">
          {navItems.slice(0, 8).map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`focus-ring flex min-h-14 flex-col items-center justify-center rounded text-[11px] font-medium ${
                  active ? "bg-blue-50 text-train" : "text-slate-600"
                }`}
              >
                <Icon className="mb-1 size-5" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
