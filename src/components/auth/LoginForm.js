"use client";

/**
 * LoginForm — Mock authentication form
 *
 * Validates against hardcoded credentials from dummy data.
 * Redirects to /dashboard on successful login.
 *
 * Test credentials:
 *   Email:    priya.sharma@swais.edu
 *   Password: password123
 *
 * TODO: Replace with real API authentication when FastAPI backend is ready.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, clearError } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    const result = await login(email, password);
    if (result.success) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-full max-w-md animate-fade-in">
      {/* Logo & Branding */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent text-white text-2xl font-bold mb-4 shadow-lg">
          S
        </div>
        <h1 className="text-3xl font-bold text-primary mb-2">SWAIS Faculty</h1>
        <p className="text-text-light text-sm">
          EdTech Platform — Teacher Portal
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-white rounded-2xl shadow-card p-8 border-t-4 border-accent">
        <h2 className="text-xl font-bold text-text mb-1">Welcome Back</h2>
        <p className="text-text-lighter text-sm mb-6">
          Sign in to manage your Class 8 Social Studies content
        </p>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-danger-light text-danger rounded-lg text-sm flex items-center gap-2 animate-scale-in">
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label
              htmlFor="login-email"
              className="block text-sm font-medium text-text mb-1.5"
            >
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="priya.sharma@swais.edu"
              required
              className="w-full px-4 py-2.5 border border-border rounded-lg text-sm text-text placeholder:text-text-lighter focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="login-password"
              className="block text-sm font-medium text-text mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2.5 pr-11 border border-border rounded-lg text-sm text-text placeholder:text-text-lighter focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-lighter hover:text-text transition-colors cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
              <span className="text-xs text-text-light">Remember me</span>
            </label>
            <a
              href="#"
              className="text-xs text-primary hover:text-secondary transition-colors"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            loading={isLoading}
            className="w-full"
            size="lg"
            id="login-submit-btn"
          >
            Sign In
          </Button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 p-3 bg-primary-light rounded-lg">
          <p className="text-xs font-semibold text-primary mb-1">
            Demo Credentials
          </p>
          <p className="text-xs text-text-light">
            Email: <span className="font-mono">priya.sharma@swais.edu</span>
          </p>
          <p className="text-xs text-text-light">
            Password: <span className="font-mono">password123</span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-text-lighter mt-6">
        © 2026 SWAIS International Academy. All rights reserved.
      </p>
    </div>
  );
}
