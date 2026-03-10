import Link from "next/link";
import AntigravityBackground from "../landing/AntigravityBackground";

type AuthShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: AuthShellProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 font-sans text-white overflow-hidden selection:bg-cyan-500/30">
      <AntigravityBackground />
      
      <div className="relative z-10 w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] md:text-xs font-medium text-white/50 hover:text-white/90 transition-colors mb-2"
          >
            <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-cyan-400 to-fuchsia-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
            <span className="tracking-[0.2em] uppercase">
              Infrastructure Intelligence
            </span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-white/50 font-light leading-relaxed max-w-sm mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl p-8 md:p-10 shadow-[0_40px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          {children}
        </div>

        {footer && (
          <div className="text-center text-xs font-light text-white/40">{footer}</div>
        )}
      </div>
    </div>
  );
}

