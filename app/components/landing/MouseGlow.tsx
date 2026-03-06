"use client";

export default function MouseGlow() {
  return (
    <div
      className="pointer-events-none fixed inset-0 cursor-glow z-0"
      aria-hidden
    />
  );
}
