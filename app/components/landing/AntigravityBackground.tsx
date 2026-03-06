"use client";

import { useEffect, useRef } from "react";

const SVG_NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

const LERP = 0.08;
const PARALLAX_1 = 80;
const PARALLAX_2 = 45;
const PARALLAX_3 = 20;

export default function AntigravityBackground() {
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    let rafId: number;

    const animate = () => {
      const target = targetRef.current;
      const current = currentRef.current;
      current.x += (target.x - current.x) * LERP;
      current.y += (target.y - current.y) * LERP;

      const l1 = layer1Ref.current;
      const l2 = layer2Ref.current;
      const l3 = layer3Ref.current;
      if (l1)
        l1.style.transform = `translate3d(${current.x * -PARALLAX_1}px, ${current.y * -PARALLAX_1}px, 0)`;
      if (l2)
        l2.style.transform = `translate3d(${current.x * -PARALLAX_2}px, ${current.y * -PARALLAX_2}px, 0)`;
      if (l3)
        l3.style.transform = `translate3d(${current.x * -PARALLAX_3}px, ${current.y * -PARALLAX_3}px, 0)`;

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none bg-[#030305] -z-10">
      {/* Deep space background noise mesh */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{ backgroundImage: SVG_NOISE }}
      />

      {/* Parallax layer 1 (fastest) */}
      <div
        ref={layer1Ref}
        className="absolute inset-0 w-full h-full transform-gpu will-change-transform"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-gradient-to-tr from-cyan-400/40 to-blue-600/40 rounded-full mix-blend-screen filter blur-[120px] animate-orb" />
      </div>

      {/* Parallax layer 2 (medium) */}
      <div
        ref={layer2Ref}
        className="absolute inset-0 w-full h-full transform-gpu will-change-transform"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        <div
          className="absolute top-[30%] right-[10%] w-[700px] h-[700px] bg-gradient-to-bl from-fuchsia-500/30 to-purple-600/30 rounded-full mix-blend-screen filter blur-[140px] animate-orb"
          style={{ animationDelay: "-10s", animationDuration: "30s" }}
        />
      </div>

      {/* Parallax layer 3 (slowest) */}
      <div
        ref={layer3Ref}
        className="absolute inset-0 w-full h-full transform-gpu will-change-transform"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        <div
          className="absolute -bottom-[20%] left-[30%] w-[900px] h-[900px] bg-gradient-to-t from-pink-500/20 to-indigo-500/20 rounded-full mix-blend-screen filter blur-[150px] animate-orb"
          style={{ animationDelay: "-5s", animationDuration: "35s" }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_10%,transparent_100%)] opacity-50" />
    </div>
  );
}
