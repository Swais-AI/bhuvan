"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const GENDER_STYLE = {
  male:   { bg: "#EFF6FF", color: "#3B82F6" },
  female: { bg: "#FDF2F8", color: "#EC4899" },
  other:  { bg: "#F8FAFC", color: "#64748B"  },
};

export default function StudentsPage() {
  const { user } = useAuth();
  const [students, setStudents]   = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState(null);
  const [search, setSearch]       = useState("");

  useEffect(() => {
    const token = localStorage.getItem("swais_faculty_token");
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/students`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setStudents(d.students || []))
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.roll_number.toLowerCase().includes(search.toLowerCase()) ||
      (s.parent_name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-8 h-8 rounded-lg ai-gradient flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold" style={{ color: "#0F172A", fontFamily: "var(--font-space-grotesk)" }}>
              Students
            </h1>
          </div>
          <p className="text-sm pl-10" style={{ color: "#94A3B8" }}>
            Class {user?.class || "8"} — Section {user?.section || "A"} &nbsp;·&nbsp;
            <span className="font-semibold" style={{ color: "#6366F1" }}>{students.length}</span> students enrolled
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#94A3B8" }}
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, roll or parent…"
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl focus:outline-none transition-all"
            style={{ border: "1.5px solid #E2E8F0", background: "white", color: "#0F172A" }}
            onFocus={e => { e.target.style.border = "1.5px solid #6366F1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)"; }}
            onBlur={e => { e.target.style.border = "1.5px solid #E2E8F0"; e.target.style.boxShadow = "none"; }}
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(99,102,241,0.1)", boxShadow: "0 1px 3px rgba(99,102,241,0.06)" }}>
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="w-10 h-10 rounded-full ai-gradient mx-auto mb-3 animate-pulse" />
            <p className="text-sm" style={{ color: "#94A3B8" }}>Loading students…</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-sm" style={{ color: "#EF4444" }}>{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "linear-gradient(135deg,#EEF2FF,#F5F3FF)", borderBottom: "1px solid rgba(99,102,241,0.12)" }}>
                  <th className="text-left px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: "#6366F1" }}>Roll No.</th>
                  <th className="text-left px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: "#6366F1" }}>Name</th>
                  <th className="text-left px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: "#6366F1" }}>Gender</th>
                  <th className="text-left px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: "#6366F1" }}>Parent / Guardian</th>
                  <th className="text-left px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: "#6366F1" }}>Phone</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => {
                  const gStyle = GENDER_STYLE[s.gender] || GENDER_STYLE.other;
                  return (
                    <tr key={s.student_id}
                      className="transition-colors"
                      style={{ borderBottom: "1px solid #F1F5F9" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#EEF2FF40"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <td className="px-5 py-3.5 font-mono text-xs" style={{ color: "#94A3B8" }}>{s.roll_number}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                            style={{ background: `linear-gradient(135deg,${i % 2 === 0 ? "#6366F1,#8B5CF6" : "#8B5CF6,#06B6D4"})` }}>
                            {s.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                          </div>
                          <span className="font-medium" style={{ color: "#0F172A" }}>{s.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        {s.gender && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize"
                            style={{ background: gStyle.bg, color: gStyle.color }}>
                            {s.gender}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5" style={{ color: "#475569" }}>{s.parent_name || "—"}</td>
                      <td className="px-5 py-3.5 font-mono text-xs" style={{ color: "#94A3B8" }}>{s.parent_phone || "—"}</td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-sm" style={{ color: "#94A3B8" }}>
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer count */}
      {!isLoading && !error && (
        <p className="text-xs text-right" style={{ color: "#94A3B8" }}>
          Showing <span className="font-semibold" style={{ color: "#6366F1" }}>{filtered.length}</span> of {students.length} students
        </p>
      )}
    </div>
  );
}
