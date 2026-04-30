"use client";

import { useState, useEffect } from "react";

const TYPE_CONFIG = {
  quiz:       { label: "Quiz",       cls: "bg-accent-light text-accent" },
  test:       { label: "Test",       cls: "bg-primary-light text-primary" },
  exam:       { label: "Exam",       cls: "bg-red-50 text-red-600" },
  assignment: { label: "Assignment", cls: "bg-yellow-50 text-yellow-600" },
};

function getGrade(pct) {
  if (pct === null || pct === undefined) return { label: "—",  cls: "text-text-lighter" };
  if (pct >= 90) return { label: "A+", cls: "text-green-600 font-bold" };
  if (pct >= 75) return { label: "A",  cls: "text-green-500 font-bold" };
  if (pct >= 60) return { label: "B",  cls: "text-primary font-semibold" };
  if (pct >= 45) return { label: "C",  cls: "text-yellow-600 font-semibold" };
  return { label: "D", cls: "text-danger font-semibold" };
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

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      {/* panel */}
      <div className="relative ml-auto w-full max-w-lg bg-white h-full shadow-xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="px-6 py-5 border-b border-border">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-2 ${TYPE_CONFIG[assessment.assessment_type]?.cls}`}>
                {TYPE_CONFIG[assessment.assessment_type]?.label}
              </span>
              <h2 className="text-base font-bold text-primary leading-snug">{assessment.title}</h2>
              {assessment.chapter && <p className="text-xs text-text-lighter mt-1">{assessment.chapter}</p>}
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-text-lighter cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex gap-4 mt-3 text-xs text-text-lighter">
            <span>Max: <strong className="text-text">{assessment.max_marks}</strong></span>
            <span>Submitted: <strong className="text-text">{assessment.submitted}/{assessment.total_students}</strong></span>
            <span>Avg: <strong className="text-primary">{assessment.class_average ?? "—"}</strong></span>
          </div>
        </div>

        {/* Results table */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center text-text-lighter text-sm">Loading results…</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-50 border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-lighter uppercase">Roll</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-lighter uppercase">Name</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-text-lighter uppercase">Marks</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-text-lighter uppercase">%</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-text-lighter uppercase">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {detail?.results?.map((r) => {
                  const grade = getGrade(r.percentage);
                  return (
                    <tr key={r.result_id} className="hover:bg-gray-50">
                      <td className="px-4 py-2.5 font-mono text-xs text-text-lighter">{r.roll_number}</td>
                      <td className="px-4 py-2.5 text-text font-medium">{r.student_name}</td>
                      <td className="px-4 py-2.5 text-right text-text">
                        {r.marks_obtained !== null ? r.marks_obtained : <span className="text-danger text-xs">Absent</span>}
                      </td>
                      <td className="px-4 py-2.5 text-right text-text-light">
                        {r.percentage !== null ? `${r.percentage}%` : "—"}
                      </td>
                      <td className={`px-4 py-2.5 text-center ${grade.cls}`}>{grade.label}</td>
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
      <div>
        <h1 className="text-2xl font-bold text-primary">Assessments</h1>
        <p className="text-sm text-text-lighter mt-0.5">
          <span className="font-semibold text-text">{assessments.length}</span> assessments · Click any row to view student results
        </p>
      </div>

      {/* Cards */}
      {isLoading ? (
        <div className="text-center py-16 text-text-lighter text-sm">Loading…</div>
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
                className="bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-border hover:border-primary/30 transition-all duration-200 p-5 text-left group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.cls}`}>
                    {cfg.label}
                  </span>
                  <span className="text-xs text-text-lighter">{formatDate(a.assessment_date)}</span>
                </div>
                <h3 className="text-sm font-bold text-text group-hover:text-primary transition-colors leading-snug mb-1">
                  {a.title}
                </h3>
                {a.chapter && (
                  <p className="text-xs text-text-lighter mb-3 truncate">{a.chapter}</p>
                )}
                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-text-lighter mb-1">
                    <span>Submitted</span>
                    <span>{a.submitted}/{a.total_students}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${submittedPct}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-lighter">Max: <strong className="text-text">{a.max_marks}</strong></span>
                  <span className="text-text-lighter">Avg: <strong className="text-primary">{a.class_average ?? "—"}</strong></span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Drawer */}
      {selected && <ResultDrawer assessment={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
