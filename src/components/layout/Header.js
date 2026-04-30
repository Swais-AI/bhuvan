"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Header({ onMenuToggle }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-border px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left: Menu + Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-lg text-text-light hover:bg-gray-100 lg:hidden cursor-pointer"
            aria-label="Toggle sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <span className="px-2.5 py-1 bg-accent-light text-accent text-xs font-semibold rounded-full">
              {user?.subject || "Social Studies"}
            </span>
            <span className="text-text-lighter text-xs">•</span>
            <span className="text-xs text-text-light">
              Class {user?.class || "8"}{user?.section ? `-${user.section}` : ""}
            </span>
            <span className="text-text-lighter text-xs">•</span>
            <span className="text-xs text-text-light flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              {user?.totalStudents || 200} Students
            </span>
          </div>
        </div>

        {/* Right: User info + Logout */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-text leading-tight">
                {user?.name || "Teacher"}
              </p>
              <p className="text-[11px] text-text-lighter leading-tight">
                {user?.email || ""}
              </p>
            </div>

            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold shadow-sm">
              {user?.avatar || "T"}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg text-text-lighter hover:text-danger hover:bg-danger-light transition-all duration-200 cursor-pointer"
            aria-label="Sign out"
            title="Sign out"
          >
            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
