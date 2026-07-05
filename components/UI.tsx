import Link from "next/link";
import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import type { SafetyFlag } from "@/lib/types";

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-normal text-ink md:text-3xl">{title}</h1>
        {description ? <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-lg border border-slate-200 bg-white p-4 shadow-sm ${className}`}>{children}</section>;
}

export function StatCard({ label, value, detail, tone = "blue" }: { label: string; value: string; detail?: string; tone?: "blue" | "green" | "yellow" | "red" }) {
  const tones = {
    blue: "border-blue-200 bg-blue-50 text-blue-800",
    green: "border-green-200 bg-green-50 text-green-800",
    yellow: "border-yellow-200 bg-yellow-50 text-yellow-800",
    red: "border-red-200 bg-red-50 text-red-800"
  };
  return (
    <div className={`rounded-lg border p-4 ${tones[tone]}`}>
      <p className="text-xs font-semibold">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      {detail ? <p className="mt-1 text-xs opacity-80">{detail}</p> : null}
    </div>
  );
}

export function SafetyBanner({ flag }: { flag: SafetyFlag }) {
  const Icon = flag.level === "danger" ? ShieldAlert : flag.level === "caution" ? AlertTriangle : CheckCircle2;
  const tone =
    flag.level === "danger"
      ? "border-red-300 bg-red-50 text-red-900"
      : flag.level === "caution"
        ? "border-yellow-300 bg-yellow-50 text-yellow-900"
        : "border-green-300 bg-green-50 text-green-900";
  return (
    <div className={`flex gap-3 rounded-lg border p-4 ${tone}`}>
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden />
      <div>
        <p className="font-semibold">{flag.message}</p>
        <p className="mt-1 text-sm leading-6">{flag.action}</p>
      </div>
    </div>
  );
}

export function EmptyState({ title, description, href, actionLabel }: { title: string; description: string; href?: string; actionLabel?: string }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center">
      <p className="font-semibold text-ink">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">{description}</p>
      {href && actionLabel ? (
        <Link className="focus-ring mt-4 inline-flex rounded bg-train px-4 py-2 text-sm font-semibold text-white" href={href}>
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}

export function LevelBar({ value, max = 5, label }: { value: number; max?: number; label?: string }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const color = value >= 4 ? "bg-safe" : value >= 2.5 ? "bg-caution" : "bg-danger";
  return (
    <div>
      {label ? <div className="mb-1 flex justify-between text-xs text-slate-600"><span>{label}</span><span>{value.toFixed(1)}</span></div> : null}
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
