"use client";

import { useRef, useEffect, useCallback } from "react";

interface Point {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
  trendId: number;
  floatOffset: number;
}

const DOT_COUNT = 140;
const TREND_LINES = 4;
const MOUSE_RADIUS = 140;
const CONNECT_THRESHOLD = 95;
const SMOOTH = 0.04;
const FLOAT_STRENGTH = 0.6;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function InteractiveTrendDots({
  mouseX,
  mouseY,
  width,
  height,
  variant,
}: {
  mouseX: number;
  mouseY: number;
  width: number;
  height: number;
  variant?: "hero";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const initRef = useRef(false);
  const timeRef = useRef(0);
  const isHero = variant === "hero";

  const initPoints = useCallback(() => {
    const points: Point[] = [];
    const trendCount = Math.floor(DOT_COUNT / TREND_LINES);
    const hues = [210, 260, 320, 30];

    for (let t = 0; t < TREND_LINES; t++) {
      const hue = hues[t];
      for (let i = 0; i < trendCount; i++) {
        const tNorm = i / (trendCount - 1);
        const jitter = (Math.random() - 0.5) * 50;
        const curve = Math.sin(tNorm * Math.PI) * 0.6 + 0.4;
        const x = 0.06 * width + tNorm * width * 0.88 + (Math.random() - 0.5) * 70;
        const y = height * (0.15 + 0.7 * (1 - curve)) + jitter + t * 25;
        points.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          radius: 3 + Math.random() * 4,
          hue,
          trendId: t,
          floatOffset: Math.random() * Math.PI * 2,
        });
      }
    }
    pointsRef.current = points;
  }, []);

  useEffect(() => {
    if (!width || !height) return;
    if (!initRef.current) {
      initPoints();
      initRef.current = true;
    }
  }, [width, height, initPoints]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !width || !height) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;

    const draw = (t: number) => {
      timeRef.current = t;
      ctx.clearRect(0, 0, width, height);
      const points = pointsRef.current;
      const mx = mouseX;
      const my = mouseY;
      const time = t * 0.001;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.hypot(dx, dy);

        let force = 0;
        if (dist < MOUSE_RADIUS && dist > 0) {
          force = (1 - dist / MOUSE_RADIUS) * FLOAT_STRENGTH;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 2;
          p.vy += Math.sin(angle) * force * 2;
        }

        p.vx *= 0.88;
        p.vy *= 0.88;
        p.x = lerp(p.x, p.baseX, SMOOTH);
        p.y = lerp(p.y, p.baseY, SMOOTH);
        p.x += p.vx;
        p.y += p.vy;

        const floatY = Math.sin(time + p.floatOffset) * 3;
        p.y += floatY;
      }

      ctx.lineWidth = 1.2;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < CONNECT_THRESHOLD && a.trendId === b.trendId) {
            const nearMouseA = Math.hypot(mx - a.x, my - a.y) < MOUSE_RADIUS;
            const nearMouseB = Math.hypot(mx - b.x, my - b.y) < MOUSE_RADIUS;
            const baseAlpha = (nearMouseA || nearMouseB ? 0.35 : 0.08);
            const alpha = (1 - d / CONNECT_THRESHOLD) * baseAlpha * (isHero ? 0.8 : 1);
            ctx.strokeStyle = `hsla(${a.hue}, 55%, 65%, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of points) {
        const d = Math.hypot(mx - p.x, my - p.y);
        const inRange = d < MOUSE_RADIUS;
        const scale = inRange ? 1 + (1 - d / MOUSE_RADIUS) * 0.6 : 1;
        const r = p.radius * scale;
        const alpha = (inRange ? 0.85 : 0.5) * (isHero ? 0.75 : 1);
        ctx.strokeStyle = `hsla(${p.hue}, 50%, 60%, ${alpha})`;
        ctx.fillStyle = `hsla(${p.hue}, 45%, 92%, ${alpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [mouseX, mouseY, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 w-full h-full touch-none"
      aria-hidden
    />
  );
}
