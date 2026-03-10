"use client";

import Link from "next/link";
import AuthShell from "@/app/components/auth/AuthShell";
import { FormEvent } from "react";

export default function OtpPage() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <AuthShell
      title="Enter verification code"
      subtitle="We've sent a one-time code to your email. Enter it below to continue."
      footer={
        <>
          Didn't receive a code?{" "}
          <button className="text-white/80 underline-offset-4 hover:underline">
            Resend
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex justify-between gap-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-10 h-12 md:w-12 md:h-14 rounded-2xl border border-white/10 bg-white/[0.03] text-center text-lg md:text-xl font-light text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.05] focus:ring-4 focus:ring-white/[0.02] transition-all"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full mt-4 px-4 py-4 rounded-full bg-white text-black text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-white/90 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300"
        >
          Verify code
        </button>

        <p className="text-[11px] text-white/40 text-center font-light leading-relaxed">
          This helps keep access to infrastructure data secure for your organisation.
        </p>
      </form>
    </AuthShell>
  );
}


