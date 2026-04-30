"use client";

/**
 * Dashboard Home — Overview page with stats and recent activity
 *
 * Displays:
 * - Welcome greeting
 * - Stats cards (total notes, students, chapters covered)
 * - Recent notes preview
 * - Quick actions
 */

import { useAuth } from "@/context/AuthContext";
import { useNotes } from "@/context/NotesContext";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();
  const { notes, totalNotes, isLoading } = useNotes();

  // Get unique chapters that have notes
  const coveredChapters = [...new Set(notes.map((n) => n.chapter))].length;

  // Recent 3 notes
  const recentNotes = notes.slice(0, 3);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  };

  const stats = [
    {
      label: "Total Notes",
      value: totalNotes,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "bg-primary-light text-primary",
      borderColor: "border-primary/20",
    },
    {
      label: "Students",
      value: user?.totalStudents || 200,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      color: "bg-accent-light text-accent",
      borderColor: "border-accent/20",
    },
    {
      label: "Chapters Covered",
      value: coveredChapters,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: "bg-secondary-light text-secondary",
      borderColor: "border-secondary/20",
    },
    {
      label: "Active Status",
      value: "Online",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "bg-green-50 text-success",
      borderColor: "border-success/20",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -right-5 bottom-0 w-24 h-24 rounded-full bg-white/5" />

        <div className="relative">
          <p className="text-white/80 text-sm mb-1">Welcome back,</p>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            {user?.name || "Teacher"} 👋
          </h1>
          <p className="text-white/80 text-sm max-w-lg">
            Manage your Class {user?.class || "8"} Social Studies content.
            You have{" "}
            <span className="font-semibold text-white">{totalNotes} notes</span>{" "}
            and{" "}
            <span className="font-semibold text-white">
              {user?.totalStudents || 200} students
            </span>{" "}
            in your class.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`bg-white rounded-xl p-5 shadow-card border-l-4 ${stat.borderColor} hover:shadow-card-hover transition-all duration-300`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-2xl font-bold text-text">{stat.value}</p>
            <p className="text-xs text-text-lighter mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Notes */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-primary">Recent Notes</h2>
            <Link
              href="/dashboard/notes"
              className="text-sm text-primary hover:text-secondary transition-colors font-medium"
            >
              View All →
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 rounded-lg border border-border">
                  <div className="skeleton h-4 w-2/3 mb-2" />
                  <div className="skeleton h-3 w-1/3" />
                </div>
              ))}
            </div>
          ) : recentNotes.length > 0 ? (
            <div className="space-y-3">
              {recentNotes.map((note) => (
                <Link
                  key={note.id}
                  href="/dashboard/notes"
                  className="block p-4 rounded-lg border border-border hover:border-accent hover:bg-accent-light/30 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-text group-hover:text-primary transition-colors truncate">
                        {note.title}
                      </h3>
                      <p className="text-xs text-text-lighter mt-0.5">
                        {note.chapter}
                      </p>
                    </div>
                    <span className="text-[11px] text-text-lighter shrink-0">
                      {formatDate(note.updatedAt)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-lighter text-center py-8">
              No notes yet. Create your first note!
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <h2 className="text-lg font-bold text-primary mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/dashboard/notes"
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary-light/30 transition-all duration-200 group"
            >
              <div className="p-2 rounded-lg bg-primary-light text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-text">Create Note</p>
                <p className="text-xs text-text-lighter">Add new study material</p>
              </div>
            </Link>

            <Link
              href="/dashboard/notes"
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-accent hover:bg-accent-light/30 transition-all duration-200 group"
            >
              <div className="p-2 rounded-lg bg-accent-light text-accent group-hover:bg-accent group-hover:text-white transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-text">Browse Notes</p>
                <p className="text-xs text-text-lighter">View all your content</p>
              </div>
            </Link>

            <Link
              href="/dashboard/assessments"
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-secondary hover:bg-secondary/5 transition-all duration-200 group"
            >
              <div className="p-2 rounded-lg bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-text">Assessments</p>
                <p className="text-xs text-text-lighter">View tests & results</p>
              </div>
            </Link>

            <Link
              href="/dashboard/reports"
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-success hover:bg-green-50 transition-all duration-200 group"
            >
              <div className="p-2 rounded-lg bg-green-50 text-success group-hover:bg-success group-hover:text-white transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-text">Reports</p>
                <p className="text-xs text-text-lighter">Student performance</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
