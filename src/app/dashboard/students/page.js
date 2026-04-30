"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const GENDER_BADGE = {
  male:   "bg-blue-50 text-blue-600",
  female: "bg-pink-50 text-pink-600",
  other:  "bg-gray-100 text-gray-500",
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
          <h1 className="text-2xl font-bold text-primary">Students</h1>
          <p className="text-sm text-text-lighter mt-0.5">
            Class {user?.class || "8"} — Section {user?.section || "A"} &nbsp;·&nbsp;
            <span className="font-semibold text-text">{students.length}</span> students
          </p>
        </div>
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-lighter"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, roll or parent…"
            className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-text-lighter text-sm">Loading students…</div>
        ) : error ? (
          <div className="p-8 text-center text-danger text-sm">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-border">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-lighter uppercase tracking-wide">Roll No.</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-lighter uppercase tracking-wide">Name</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-lighter uppercase tracking-wide">Gender</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-lighter uppercase tracking-wide">Parent / Guardian</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-lighter uppercase tracking-wide">Phone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((s) => (
                  <tr key={s.student_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-text-lighter">{s.roll_number}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center text-xs font-bold shrink-0">
                          {s.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                        </div>
                        <span className="font-medium text-text">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      {s.gender && (
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${GENDER_BADGE[s.gender] || "bg-gray-100 text-gray-500"}`}>
                          {s.gender}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-text-light">{s.parent_name || "—"}</td>
                    <td className="px-5 py-3.5 text-text-lighter font-mono text-xs">{s.parent_phone || "—"}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-text-lighter text-sm">
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
        <p className="text-xs text-text-lighter text-right">
          Showing {filtered.length} of {students.length} students
        </p>
      )}
    </div>
  );
}
