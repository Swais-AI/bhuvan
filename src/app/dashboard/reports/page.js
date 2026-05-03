"use client";

import { useState, useEffect } from "react";

function PercentBar({ value }) {
  const pct = value ?? 0;
  const gradient =
    pct >= 75 ? "linear-gradient(90deg,#10B981,#06B6D4)" :
    pct >= 50 ? "linear-gradient(90deg,#6366F1,#8B5CF6)" :
    pct >= 35 ? "linear-gradient(90deg,#F59E0B,#EF4444)" :
               "linear-gradient(90deg,#EF4444,#EC4899)";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#EEF2FF" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: gradient }} />
      </div>
      <span className="text-xs font-semibold w-10 text-right" style={{ color: "#475569" }}>
        {value !== null ? `${value}%` : "—"}
      </span>
    </div>
  );
}

const PODIUM_CONFIG = [
  { medal: "🥇", ring: "2px solid #F59E0B", bg: "linear-gradient(135deg,#FFFBEB,#FEF3C7)", textColor: "#D97706", size: "w-12 h-12", text: "text-xl" },
  { medal: "🥈", ring: "2px solid #9CA3AF", bg: "linear-gradient(135deg,#F9FAFB,#F3F4F6)", textColor: "#6B7280", size: "w-10 h-10", text: "text-base" },
  { medal: "🥉", ring: "2px solid #F97316", bg: "linear-gradient(135deg,#FFF7ED,#FFEDD5)", textColor: "#EA580C", size: "w-9 h-9", text: "text-sm"  },
];

export default function ReportsPage() {
  const [report, setReport]       = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch]       = useState("");
  const [sortBy, setSortBy]       = useState("rank");

  useEffect(() => {
    const token = localStorage.getItem("swais_faculty_token");
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reports`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setReport)
      .finally(() => setIsLoading(false));
  }, []);

  const students = report?.students || [];

  const filtered = students
    .filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.roll_number.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "rank") return a.rank - b.rank;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return (b.average_percent ?? 0) - (a.average_percent ?? 0);
    });

  const top3 = [...students].slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-0.5">
          <div className="w-8 h-8 rounded-lg ai-gradient flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold" style={{ color: "#0F172A", fontFamily: "var(--font-space-grotesk)" }}>Reports</h1>
        </div>
        <p className="text-sm pl-10" style={{ color: "#94A3B8" }}>
          Class {report?.class_name || "8"} — Section {report?.section || "A"} &nbsp;·&nbsp;
          <span className="font-semibold" style={{ color: "#6366F1" }}>{report?.total_assessments || 0}</span> assessments ·{" "}
          <span className="font-semibold" style={{ color: "#6366F1" }}>{report?.total_students || 0}</span> students
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center py-16 gap-3">
          <div className="w-10 h-10 rounded-full ai-gradient animate-pulse" />
          <p className="text-sm" style={{ color: "#94A3B8" }}>Loading report…</p>
        </div>
      ) : (
        <>
          {/* ── Top 3 Podium ─────────────────────────────────── */}
          {top3.length >= 1 && (
            <div className="grid grid-cols-3 gap-4">
              {[1, 0, 2].map((origIdx, podiumPos) => {
                const s = top3[origIdx];
                if (!s) return <div key={podiumPos} />;
                const cfg = PODIUM_CONFIG[origIdx];
                return (
                  <div key={s.student_id}
                    className="flex flex-col items-center text-center p-5 rounded-2xl transition-all"
                    style={{ background: cfg.bg, border: cfg.ring, boxShadow: origIdx === 0 ? "0 8px 24px rgba(245,158,11,0.2)" : "none" }}>
                    <span className={cfg.text + " mb-2"}>{cfg.medal}</span>
                    <div className={`${cfg.size} rounded-full flex items-center justify-center font-bold text-white mb-2 shrink-0`}
                      style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>
                      {s.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                    </div>
                    <p className="text-xs font-bold leading-tight mb-0.5" style={{ color: "#0F172A" }}>{s.name}</p>
                    <p className="text-[10px] font-mono mb-1.5" style={{ color: "#94A3B8" }}>{s.roll_number}</p>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                      style={{ background: "white", color: cfg.textColor, border: `1px solid ${cfg.textColor}40` }}>
                      {s.average_percent}%
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Controls ─────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#94A3B8" }}
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search student by name or roll…"
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl focus:outline-none transition-all"
                style={{ border: "1.5px solid #E2E8F0", background: "white", color: "#0F172A" }}
                onFocus={e => { e.target.style.border = "1.5px solid #6366F1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)"; }}
                onBlur={e => { e.target.style.border = "1.5px solid #E2E8F0"; e.target.style.boxShadow = "none"; }}
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 text-sm rounded-xl focus:outline-none transition-all"
              style={{ border: "1.5px solid #E2E8F0", background: "white", color: "#0F172A" }}
              onFocus={e => { e.target.style.border = "1.5px solid #6366F1"; }}
              onBlur={e => { e.target.style.border = "1.5px solid #E2E8F0"; }}
            >
              <option value="rank">Sort by Rank</option>
              <option value="avg">Sort by Average</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>

          {/* ── Full Table ───────────────────────────────────── */}
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(99,102,241,0.1)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "linear-gradient(135deg,#EEF2FF,#F5F3FF)", borderBottom: "1px solid rgba(99,102,241,0.1)" }}>
                    {[
                      { label: "Rank", cls: "text-center w-12" },
                      { label: "Student", cls: "text-left" },
                      { label: "Assessed", cls: "text-center" },
                      { label: "Avg Marks", cls: "text-right" },
                      { label: "High", cls: "text-right w-12" },
                      { label: "Low", cls: "text-right w-12" },
                      { label: "Performance", cls: "w-40" },
                    ].map(h => (
                      <th key={h.label} className={`px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest ${h.cls}`}
                        style={{ color: "#6366F1" }}>{h.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => {
                    const isTop3 = s.rank <= 3;
                    return (
                      <tr key={s.student_id}
                        style={{ borderBottom: "1px solid #F1F5F9" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#EEF2FF40"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>

                        {/* Rank */}
                        <td className="px-4 py-3 text-center">
                          {isTop3 ? (
                            <span className="text-base">{"🥇🥈🥉"[s.rank - 1]}</span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold"
                              style={{ background: "#F1F5F9", color: "#64748B" }}>{s.rank}</span>
                          )}
                        </td>

                        {/* Student */}
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                              style={{ background: isTop3 ? "linear-gradient(135deg,#F59E0B,#EF4444)" : "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>
                              {s.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                            </div>
                            <div>
                              <p className="font-semibold" style={{ color: "#0F172A" }}>{s.name}</p>
                              <p className="text-xs font-mono" style={{ color: "#94A3B8" }}>{s.roll_number}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3 text-center text-xs" style={{ color: "#94A3B8" }}>{s.total_assessed}</td>
                        <td className="px-4 py-3 text-right font-semibold" style={{ color: "#0F172A" }}>
                          {s.average_marks !== null ? s.average_marks : "—"}
                        </td>
                        <td className="px-4 py-3 text-right text-xs font-semibold" style={{ color: "#10B981" }}>
                          {s.highest_marks ?? "—"}
                        </td>
                        <td className="px-4 py-3 text-right text-xs font-semibold" style={{ color: "#EF4444" }}>
                          {s.lowest_marks ?? "—"}
                        </td>
                        <td className="px-5 py-3">
                          <PercentBar value={s.average_percent} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs text-right" style={{ color: "#94A3B8" }}>
            Showing <span className="font-semibold" style={{ color: "#6366F1" }}>{filtered.length}</span> of {students.length} students
          </p>
        </>
      )}
    </div>
  );
}
