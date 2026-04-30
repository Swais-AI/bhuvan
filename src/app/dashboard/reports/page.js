"use client";

import { useState, useEffect } from "react";

function PercentBar({ value }) {
  const pct = value ?? 0;
  const color =
    pct >= 75 ? "bg-green-400" :
    pct >= 50 ? "bg-primary" :
    pct >= 35 ? "bg-yellow-400" : "bg-danger";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-medium text-text w-10 text-right">{value !== null ? `${value}%` : "—"}</span>
    </div>
  );
}

export default function ReportsPage() {
  const [report, setReport]   = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch]   = useState("");
  const [sortBy, setSortBy]   = useState("rank"); // rank | name | avg

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
        <h1 className="text-2xl font-bold text-primary">Reports</h1>
        <p className="text-sm text-text-lighter mt-0.5">
          Class {report?.class_name || "8"} — Section {report?.section || "A"} &nbsp;·&nbsp;
          {report?.total_assessments || 0} assessments · {report?.total_students || 0} students
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-16 text-text-lighter text-sm">Loading report…</div>
      ) : (
        <>
          {/* Top 3 podium */}
          <div className="grid grid-cols-3 gap-4">
            {[1, 0, 2].map((idx) => {
              const s = top3[idx];
              if (!s) return <div key={idx} />;
              const medals = ["🥇", "🥈", "🥉"];
              const heights = ["h-28", "h-20", "h-16"];
              const colors = [
                "border-yellow-400 bg-yellow-50",
                "border-gray-300 bg-gray-50",
                "border-orange-300 bg-orange-50",
              ];
              return (
                <div key={s.student_id} className={`flex flex-col items-center text-center p-4 rounded-2xl border-2 ${colors[idx]}`}>
                  <span className="text-2xl mb-1">{medals[idx]}</span>
                  <div className="w-10 h-10 rounded-full bg-white border border-current/20 flex items-center justify-center text-sm font-bold text-primary mb-2">
                    {s.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </div>
                  <p className="text-xs font-bold text-text leading-tight">{s.name}</p>
                  <p className="text-xs text-text-lighter">{s.roll_number}</p>
                  <p className="text-sm font-bold text-primary mt-1">{s.average_percent}%</p>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-lighter"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search student…"
                className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-sm border border-border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="rank">Sort by Rank</option>
              <option value="avg">Sort by Average</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>

          {/* Full table */}
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="text-center px-4 py-3.5 text-xs font-semibold text-text-lighter uppercase tracking-wide w-12">Rank</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-lighter uppercase tracking-wide">Student</th>
                    <th className="text-center px-4 py-3.5 text-xs font-semibold text-text-lighter uppercase tracking-wide">Assessed</th>
                    <th className="text-right px-4 py-3.5 text-xs font-semibold text-text-lighter uppercase tracking-wide">Avg Marks</th>
                    <th className="text-right px-4 py-3.5 text-xs font-semibold text-text-lighter uppercase tracking-wide w-10">High</th>
                    <th className="text-right px-4 py-3.5 text-xs font-semibold text-text-lighter uppercase tracking-wide w-10">Low</th>
                    <th className="px-5 py-3.5 text-xs font-semibold text-text-lighter uppercase tracking-wide w-40">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((s) => (
                    <tr key={s.student_id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold
                          ${s.rank <= 3 ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-text-lighter"}`}>
                          {s.rank}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center text-xs font-bold shrink-0">
                            {s.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                          </div>
                          <div>
                            <p className="font-medium text-text">{s.name}</p>
                            <p className="text-xs text-text-lighter font-mono">{s.roll_number}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-text-lighter">{s.total_assessed}</td>
                      <td className="px-4 py-3 text-right font-medium text-text">
                        {s.average_marks !== null ? s.average_marks : "—"}
                      </td>
                      <td className="px-4 py-3 text-right text-green-600 text-xs">{s.highest_marks ?? "—"}</td>
                      <td className="px-4 py-3 text-right text-danger text-xs">{s.lowest_marks ?? "—"}</td>
                      <td className="px-5 py-3">
                        <PercentBar value={s.average_percent} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs text-text-lighter text-right">
            Showing {filtered.length} of {students.length} students
          </p>
        </>
      )}
    </div>
  );
}
