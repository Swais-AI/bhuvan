"use client";

/**
 * Login Page — Entry point of the application
 *
 * Displays the mock login form.
 * Redirects authenticated users to /dashboard.
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/auth/LoginForm";

function LoginPageContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-bg">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If already authenticated, don't flash the login form
  if (isAuthenticated) return null;

  return (
    <div className="flex-1 flex items-center justify-center bg-bg px-4 py-8">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/3 blur-3xl" />
      </div>

      <LoginForm />
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginPageContent />
    </AuthProvider>
  );
}
