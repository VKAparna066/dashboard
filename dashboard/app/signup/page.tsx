"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "../../lib/supabase-client";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        // Check if it's an email confirmation required message
        if (error.message?.includes("confirm")) {
          setMessage("Check your email to confirm your signup!");
          return;
        }
        throw error;
      }
      if (data?.user) {
        setMessage("Account created! Redirecting...");
        setTimeout(() => router.push("/dashboard"), 2000);
      }
    } catch (err: any) {
      console.error("Sign up error:", err?.message ?? err);
      setMessage("Sign up failed: " + (err?.message ?? "Unknown error"));
    }
  }

  async function handleGoogle() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: window.location.origin + "/dashboard" } });
      if (error) throw error;
    } catch (err: any) {
      console.error("Google sign-up error:", err?.message ?? err);
      alert("Google sign-up failed: " + (err?.message ?? "Unknown error"));
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-bg-main to-bg-card">
      <div className="w-full max-w-md p-8 bg-bg-card/80 backdrop-blur-md border border-bg-border rounded-2xl">
        <h1 className="text-2xl font-display font-700 text-white mb-4">Create account</h1>

        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 py-3 mb-4 rounded-lg bg-white/95 hover:opacity-95"
          aria-label="Continue with Google"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M21.35 11.1h-9.18v2.92h5.26c-.23 1.3-1.02 2.4-2.17 3.14v2.6h3.51c2.05-1.89 3.24-4.66 3.24-8.36 0-.6-.06-1.18-.66-1.32z" fill="#4285F4"/>
            <path d="M12.17 22c2.94 0 5.4-.95 7.2-2.58l-3.51-2.6c-.98.66-2.23 1.04-3.69 1.04-2.84 0-5.25-1.92-6.10-4.52H2.46v2.83C4.26 19.98 8.75 22 12.17 22z" fill="#34A853"/>
            <path d="M6.07 13.34a7.3 7.3 0 010-4.68V6.83H2.46a11.99 11.99 0 000 8.34l3.61-1.83z" fill="#FBBC05"/>
            <path d="M12.17 4.5c1.6 0 3.05.55 4.19 1.63l3.14-3.14C17.58 1.02 14.72 0 12.17 0 8.75 0 4.26 2.02 2.46 6.83l3.61 1.83c.85-2.6 3.26-4.52 6.1-4.52z" fill="#EA4335"/>
          </svg>
          <span className="text-sm font-medium text-black">Continue with Google</span>
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-bg-border" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col text-sm text-gray-300">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="mt-2 p-3 rounded-lg bg-[#07101a] border border-bg-border text-white placeholder-gray-400 caret-accent-cyan focus:outline-none focus:ring-2 focus:ring-accent-cyan"
            />
          </label>

          <label className="flex flex-col text-sm text-gray-300 relative">
            Password
            <div className="mt-2 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Choose a password"
                className="w-full p-3 rounded-lg bg-[#07101a] border border-bg-border text-white placeholder-gray-400 caret-accent-cyan pr-10 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          {message && (
            <div className={`text-sm p-3 rounded-lg ${
              message.includes("failed") || message.includes("Sign up failed")
                ? "bg-red-500/20 text-red-300"
                : "bg-accent-cyan/20 text-accent-cyan"
            }`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            className="mt-2 py-3 rounded-lg bg-accent-cyan text-black font-medium"
          >
            Create account
          </button>

          <div className="text-sm text-gray-400 pt-2">
            Already have an account? <a href="/login" className="text-accent-cyan underline">Sign in</a>
          </div>
        </form>
      </div>
    </div>
  );
}
