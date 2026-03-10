"use client";

import Link from "next/link";
import AuthShell from "@/app/components/auth/AuthShell";
import { FormEvent } from "react";

export default function ForgotPasswordPage() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter the email you use for the Infrastructure Intelligence Platform and we'll send a reset link or code."
      footer={
        <>
          Remembered your password?{" "}
          <Link href="/auth/login" className="text-white/80 underline-offset-4 hover:underline">
            Back to sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2.5 text-left">
          <label className="text-[10px] font-medium text-white/50 tracking-[0.1em] uppercase ml-1">
            Work email
          </label>
          <input
            type="email"
            required
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm font-light text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] focus:ring-4 focus:ring-white/[0.02] transition-all"
            placeholder="you@institution.org"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 px-4 py-4 rounded-full bg-white text-black text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-white/90 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300"
        >
          Send reset link
        </button>
      </form>
    </AuthShell>
  );
}


