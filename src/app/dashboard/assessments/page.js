"use client";

import { useState, useEffect } from "react";

const TYPE_CONFIG = {
  quiz:       { label: "Quiz",       bg: "#F5F3FF", color: "#8B5CF6", dot: "#8B5CF6" },
  test:       { label: "Test",       bg: "#EEF2FF", color: "#6366F1", dot: "#6366F1" },
  exam:       { label: "Exam",       bg: "#FEF2F2", color: "#EF4444", dot: "#EF4444" },
  assignment: { label: "Assignment", bg: "#FFFBEB", color: "#D97706", dot: "#F59E0B" },
};

const GRADE_STYLE = {
  "A+": { color: "#10B981", bg: "#ECFDF5" },
  "A":  { color: "#10B981", bg: "#ECFDF5" },
  "B":  { color: "#6366F1", bg: "#EEF2FF" },
  "C":  { color: "#F59E0B", bg: "#FFFBEB" },
  "D":  { color: "#EF4444", bg: "#FEF2F2" },
  "—":  { color: "#94A3B8", bg: "#F8FAFC" },
};

function getGrade(pct) {
  if (pct === null || pct === undefined) return "—";
  if (pct >= 90) return "A+";
  if (pct >= 75) return "A";
  if (pct >= 60) return "B";
  if (pct >= 45) return "C";
  return "D";
}

function ResultDrawer({ assessment, onClose }) {
  const [detail, setDetail]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("swais_faculty_token");
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/assessments/${assessment.assessment_id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((r) => r.json())
      .then(setDetail)
      .finally(() => setLoading(false));
  }, [assessment.assessment_id]);

  const cfg = TYPE_CONFIG[assessment.assessment_type] || TYPE_CONFIG.test;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-slide-in">
        {/* Drawer Header */}
        <div className="px-6 py-5" style={{ borderBottom: "1px solid rgba(99,102,241,0.1)" }}>
          {/* gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-1 ai-gradient rounded-t-none" />

          <div className="flex items-start justify-between gap-3 mt-1">
            <div className="flex-1 min-w-0">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2"
                style={{ background: cfg.bg, color: cfg.color }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.dot }} />
                {cfg.label}
              </span>
              <h2 className="text-base font-bold leading-snug" style={{ color: "#0F172A", fontFamily: "var(--font-space-grotesk)" }}>
                {assessment.title}
              </h2>
              {assessment.chapter && (
                <p className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>{assessment.chapter}</p>
              )}
            </div>
            <button onClick={onClose}
              className="p-1.5 rounded-lg cursor-pointer transition-all"
              style={{ color: "#94A3B8" }}
              onMouseEnter={e => { e.currentTarget.style.background="#FEF2F2"; e.currentTarget.style.color="#EF4444"; }}
              onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#94A3B8"; }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Meta pills */}
          <div className="flex flex-wrap gap-2 mt-3">
            {[
              { label: "Max Marks", value: assessment.max_marks },
              { label: "Submitted", value: `${assessment.submitted}/${assessment.total_students}` },
              { label: "Avg Score", value: assessment.class_average ? `${assessment.class_average}` : "—", highlight: true },
            ].map(m => (
              <div key={m.label} className="px-3 py-1.5 rounded-lg text-xs"
                style={{ background: m.highlight ? "#EEF2FF" : "#F8FAFC", border: "1px solid", borderColor: m.highlight ? "#C7D2FE" : "#E2E8F0" }}>
                <span style={{ color: "#94A3B8" }}>{m.label}: </span>
                <span className="font-bold" style={{ color: m.highlight ? "#6366F1" : "#0F172A" }}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Results table */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 rounded-full ai-gradient mx-auto mb-3 animate-pulse" />
              <p className="text-sm" style={{ color: "#94A3B8" }}>Loading results…</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="sticky top-0" style={{ background: "linear-gradient(135deg,#EEF2FF,#F5F3FF)", borderBottom: "1px solid rgba(99,102,241,0.1)" }}>
                <tr>
                  {["Roll", "Name", "Marks", "%", "Grade"].map((h, i) => (
                    <th key={h} className={`px-4 py-3 text-[10px] font-bold uppercase tracking-widest ${i >= 2 ? "text-right" : "text-left"} ${i === 4 ? "text-center" : ""}`}
                      style={{ color: "#6366F1" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {detail?.results?.map((r) => {
                  const grade = getGrade(r.percentage);
                  const gs = GRADE_STYLE[grade] || GRADE_STYLE["—"];
                  return (
                    <tr key={r.result_id}
                      style={{ borderBottom: "1px solid #F1F5F9" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#EEF2FF40"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <td className="px-4 py-2.5 font-mono text-xs" style={{ color: "#94A3B8" }}>{r.roll_number}</td>
                      <td className="px-4 py-2.5 font-medium" style={{ color: "#0F172A" }}>{r.student_name}</td>
                      <td className="px-4 py-2.5 text-right">
                        {r.marks_obtained !== null
                          ? <span className="font-semibold" style={{ color: "#0F172A" }}>{r.marks_obtained}</span>
                          : <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#FEF2F2", color: "#EF4444" }}>Absent</span>}
                      </td>
                      <td className="px-4 py-2.5 text-right text-xs" style={{ color: "#64748B" }}>
                        {r.percentage !== null ? `${r.percentage}%` : "—"}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                          style={{ background: gs.bg, color: gs.color }}>{grade}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AssessmentsPage() {
  const [assessments, setAssessments] = useState([]);
  const [isLoading, setIsLoading]     = useState(true);
  const [selected, setSelected]       = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("swais_faculty_token");
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/assessments`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setAssessments(d.assessments || []))
      .finally(() => setIsLoading(false));
  }, []);

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-8 h-8 rounded-lg ai-gradient flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold" style={{ color: "#0F172A", fontFamily: "var(--font-space-grotesk)" }}>
              Assessments
            </h1>
          </div>
          <p className="text-sm pl-10" style={{ color: "#94A3B8" }}>
            <span className="font-semibold" style={{ color: "#6366F1" }}>{assessments.length}</span> assessments · Click any card to view results
          </p>
        </div>
      </div>

      {/* Cards */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E2E8F0" }}>
              <div className="skeleton h-5 w-16 mb-3 rounded-full" />
              <div className="skeleton h-4 w-3/4 mb-2" />
              <div className="skeleton h-3 w-1/2 mb-4" />
              <div className="skeleton h-2 w-full rounded-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {assessments.map((a) => {
            const cfg = TYPE_CONFIG[a.assessment_type] || TYPE_CONFIG.test;
            const submittedPct = a.total_students
              ? Math.round((a.submitted / a.total_students) * 100)
              : 0;
            return (
              <button
                key={a.assessment_id}
                onClick={() => setSelected(a)}
                className="bg-white rounded-2xl p-5 text-left group transition-all duration-200 cursor-pointer"
                style={{ border: "1px solid rgba(99,102,241,0.1)" }}
                onMouseEnter={e => { e.currentTarget.style.border = "1px solid #A5B4FC"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(99,102,241,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.border = "1px solid rgba(99,102,241,0.1)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                    style={{ background: cfg.bg, color: cfg.color }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.dot }} />
                    {cfg.label}
                  </span>
                  <span className="text-xs" style={{ color: "#94A3B8" }}>{formatDate(a.assessment_date)}</span>
                </div>

                <h3 className="text-sm font-bold leading-snug mb-1 transition-colors" style={{ color: "#0F172A", fontFamily: "var(--font-space-grotesk)" }}>
                  {a.title}
                </h3>
                {a.chapter && (
                  <p className="text-xs mb-3 truncate" style={{ color: "#94A3B8" }}>{a.chapter}</p>
                )}

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1" style={{ color: "#94A3B8" }}>
                    <span>Submitted</span>
                    <span>{a.submitted}/{a.total_students} · {submittedPct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#EEF2FF" }}>
                    <div className="h-full rounded-full ai-gradient transition-all"
                      style={{ width: `${submittedPct}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: "#94A3B8" }}>
                    Max: <strong style={{ color: "#0F172A" }}>{a.max_marks}</strong>
                  </span>
                  <span className="px-2 py-0.5 rounded-lg font-semibold" style={{ background: "#EEF2FF", color: "#6366F1" }}>
                    Avg: {a.class_average ?? "—"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {selected && <ResultDrawer assessment={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
