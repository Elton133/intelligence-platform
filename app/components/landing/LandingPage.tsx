"use client";

import { useRef } from "react";
import AntigravityBackground from "./AntigravityBackground";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP, TextPlugin);
}

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaContainerRef = useRef<HTMLElement>(null);
  const ctaCardRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const heroButtonRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const spatialCardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    // Hero Fader
    gsap.fromTo(
      heroTextRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.1, ease: "power3.out" }
    );

    // Initial Hide for sequential elements
    gsap.set(heroButtonRef.current, { y: 30, opacity: 0 });
    gsap.set(dashboardRef.current, { y: 80, opacity: 0, scale: 0.95 });

    // Hero Typed Sequence
    const tl = gsap.timeline();

    tl.to(line1Ref.current, {
      text: "Experience liftoff with",
      duration: 1.5,
      ease: "none",
      delay: 2 // 2 secs blink before typing
    })
    .add(() => {
      // Remove cursor from line 1 wrapper and append to line 2 wrapper
      if (cursorRef.current && line2Ref.current) {
        // Change cursor color from cyan to fuchsia
        cursorRef.current.classList.remove('bg-cyan-300', 'text-cyan-300');
        cursorRef.current.classList.add('bg-fuchsia-400', 'text-fuchsia-400');
        // Move it down to line 2
        line2Ref.current.parentElement?.appendChild(cursorRef.current);
      }
    })
    .to(line2Ref.current, {
      text: "the next-generation Intelligence Platform",
      duration: 2.2,
      ease: "none"
    })
    .add(() => {
      // Hide cursor entirely when done
      if (cursorRef.current) {
        cursorRef.current.style.display = 'none';
      }
    })
    // Now show elements after typing
    .to(heroButtonRef.current, {
      y: 0, opacity: 1, duration: 0.8, ease: "power3.out"
    }, "+=0.2")
    .to(dashboardRef.current, {
      y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "expo.out"
    }, "-=0.6");

    // Narrative section scroll animations
    gsap.utils.toArray<HTMLElement>('.narrative-text').forEach((el) => {
      gsap.fromTo(el, 
        { y: 40, opacity: 0 },
        {
          y: 0, 
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Spatial Cards Stagger Animation
    if (spatialCardsRef.current.length > 0) {
      gsap.fromTo(
        spatialCardsRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: spatialCardsRef.current[0],
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // CTA Scaling Animation (replaces raw scroll listener)
    if (ctaContainerRef.current && ctaCardRef.current) {
      gsap.fromTo(ctaCardRef.current, 
        {
          maxWidth: "56rem",
          width: "100%",
          borderRadius: "3rem",
        },
        {
          scrollTrigger: {
            trigger: ctaContainerRef.current,
            start: "top 90%",
            end: "top 10%",
            scrub: 1,
          },
          maxWidth: "100%",
          width: "calc(100% - 2rem)",
          borderRadius: "1.25rem",
          ease: "none",
        }
      );
    }

    // Brand Ticker Animation
    gsap.to('.brand-ticker', {
      xPercent: -50,
      ease: "none",
      duration: 30,
      repeat: -1
    });

    // Magnetic Button Effect on Hero Button
    if (heroButtonRef.current) {
      const btn = heroButtonRef.current.querySelector('button');
      if (btn) {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, {
            x: x * 0.4,
            y: y * 0.4,
            duration: 0.6,
            ease: "power2.out"
          });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "power3.out"
          });
        });
      }
    }

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative min-h-screen text-white overflow-x-hidden font-sans selection:bg-cyan-500/30">
      <AntigravityBackground />
      
      {/* --- APPLE UI INSPIRED NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-4 md:px-6 py-4 bg-black/10 backdrop-blur-2xl border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-fuchsia-500 shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
          <span className="font-medium tracking-wide text-sm hidden sm:block">Platform</span>
        </div>
        <div className="flex items-center gap-4 md:gap-6 text-sm">
          <button className="text-white/70 hover:text-white transition-colors duration-300 font-medium">Log in</button>
          <button className="px-5 py-2.5 rounded-full bg-white text-black font-medium hover:bg-white/90 hover:scale-105 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Sign up
          </button>
        </div>
      </nav>
      
      <main className="relative z-10 flex flex-col items-center pt-24">
        {/* --- HERO SECTION --- */}
        <section className="relative w-full flex flex-col items-center justify-center px-4 md:px-6 pt-16 pb-8">
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-8 z-10">
            
            <h1 ref={heroTextRef} className="text-4xl md:text-5xl lg:text-[72px] font-light tracking-tighter leading-[1.05] drop-shadow-2xl flex flex-col items-center z-10 opacity-0 translate-y-8">
              <div className="flex items-center justify-center h-[1.2em]">
                <span ref={line1Ref}></span>
                <span ref={cursorRef} className="animate-neon-blink inline-block w-[4px] md:w-[6px] h-[0.9em] bg-cyan-300 ml-2 rounded-full text-cyan-300 transition-colors duration-300"></span>
              </div>
              <div className="flex items-center justify-center h-[1.2em] mt-1 md:mt-2">
                <span ref={line2Ref} className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-300 drop-shadow-lg"></span>
              </div>
            </h1>

            <div ref={heroButtonRef} className="pt-6 md:pt-6 opacity-0 translate-y-8">
              <button className="group relative px-8 py-4 md:px-10 md:py-5 bg-white text-black rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-fuchsia-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10 font-medium tracking-widest uppercase text-xs md:text-sm">
                  Explore live projects
                </span>
              </button>
            </div>
          </div>
          
          {/* Dashboard / IDE Showcase (Apple MacOS Window Style) */}
          <div
          ref={dashboardRef}
          className="mt-10 md:mt-20 relative w-full max-w-6xl aspect-[4/3] sm:aspect-video rounded-2xl md:rounded-[2.5rem] border border-white/20 bg-black/40 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden glass-panel transform transition-transform duration-1000 md:hover:scale-[1.02] flex flex-col group opacity-0 scale-95"
          >
          {/* macOS styled Title Bar */}
          <div className="w-full h-10 md:h-12 border-b border-white/10 bg-white/[0.03] flex items-center px-4 md:px-6 gap-2 shrink-0">
            <div className="flex gap-2">
              <div className="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-red-500/80"></div>
              <div className="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="mx-auto text-[10px] md:text-xs font-medium tracking-wider text-white/40 uppercase pl-8 md:pl-0">
              Infrastructure Projects Intelligence & Monitoring Platform
            </div>
          </div>

          {/* Video/Image Placeholder Area */}
          <div className="flex-1 relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.05)_0%,transparent_50%)]">
            <Image
              src="/assets/dashboard.jpeg"
              alt="Dashboard"
              fill
              className="object-cover"
            />
          </div>

  {/* Gradient overlay at bottom */}
  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-900/10 to-transparent pointer-events-none mix-blend-screen"></div>
          </div>
        </section>

        {/* --- BRAND TICKER SECTION --- */}
        <section className="relative w-full py-8 border-y border-white/5 bg-white/[0.01] overflow-hidden flex items-center z-10 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
          <div className="flex whitespace-nowrap opacity-60 font-mono text-xs md:text-sm tracking-widest uppercase brand-ticker w-max">
            {/* Will be duplicated for continuous scroll */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-12 md:gap-24 px-6 md:px-12 items-center">
                <span>Next-Gen Infrastructure</span>
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.8)]"></span>
                <span>Real-Time Intelligence</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
                <span>Global Market Data</span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></span>
                <span>Hyper-Fluid UX</span>
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]"></span>
              </div>
            ))}
          </div>
        </section>

        {/* --- NARRATIVE SECTION 1 --- */}
        <section className="relative w-full py-20 md:py-40 px-6 z-10">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 md:gap-24">
            <div className="w-full lg:w-1/2 flex justify-center perspective-[1000px] order-2 lg:order-1">
              <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] rounded-full border border-white/10 glass-panel backdrop-blur-3xl flex items-center justify-center overflow-hidden hover:border-white/20 transition-all duration-1000 lg:hover:scale-[1.03] group transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
                <div className="absolute w-3/4 h-3/4 rounded-full border border-white/5 bg-gradient-to-br from-indigo-500/20 to-transparent backdrop-blur-2xl animate-bob lg:group-hover:rotate-12 transition-transform duration-1000" style={{ transform: 'translateZ(50px)' }}></div>
                <div className="absolute w-1/2 h-1/2 rounded-full border border-white/5 bg-gradient-to-tl from-fuchsia-500/20 to-transparent backdrop-blur-3xl animate-bob" style={{ animationDelay: '1.5s', transform: 'translateZ(100px)' }}></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_60%)]"></div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 space-y-8 md:space-y-10 order-1 lg:order-2">
              <h2 className="narrative-text text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.1] text-center lg:text-left">
                Hyper-fluid <br/>
                <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-pink-300 to-orange-300">UX Architecture</span>
              </h2>
              <p className="narrative-text text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                Interactions and animations create sensations that are incredibly smooth, buoyant, and kinetic. 
                Interface elements gently drift, bob, or scatter smoothly in response to user input.
              </p>
              
              <ul className="narrative-text space-y-4 md:space-y-6 pt-4 max-w-sm mx-auto lg:mx-0">
                {[
                  "Untethered precise typography",
                  "Multi-dimensional optical shadows",
                  "Boundless spatial ascension"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-white/70 text-base md:text-lg font-light">
                    <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-fuchsia-400 mr-4 md:mr-6 shadow-[0_0_15px_rgba(232,121,249,0.8)]"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --- SPATIAL CARDS SECTION --- */}
        <section className="relative w-full pt-16 md:pt-32 pb-32 md:pb-48 px-4 md:px-6 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 md:mb-32">
              <h2 className="narrative-text text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-6 md:mb-8">
                The Quiet Vastness of <br />
                <span className="font-medium italic text-white/90">Orbital Environments</span>
              </h2>
              <p className="narrative-text text-white/50 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                Channel the emotional resonance of premium, hyper-sophisticated architectural spaces 
                that playfully shatter expected constraints.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
              {[
                { title: "Suspended Tranquility", color: "from-cyan-400/20", borderC: "hover:border-cyan-400/30", textC: "text-cyan-400" },
                { title: "Kinetic Tension", color: "from-indigo-400/20", borderC: "hover:border-indigo-400/30", textC: "text-indigo-400" },
                { title: "Frictionless Atmosphere", color: "from-fuchsia-400/20", borderC: "hover:border-fuchsia-400/30", textC: "text-fuchsia-400" },
              ].map((card, i) => (
                <div 
                  key={i} 
                  ref={el => { if (el) spatialCardsRef.current[i] = el; }}
                  className={`group relative p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl ${card.borderC} transition-all duration-700 md:hover:-translate-y-6 flex flex-col justify-end h-[350px] md:h-[450px] overflow-hidden glass-panel opacity-0 translate-y-12`}
                >
                  <div className={`absolute top-0 right-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-gradient-to-bl ${card.color} to-transparent rounded-full filter blur-[60px] md:blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform translate-x-1/3 -translate-y-1/3`}></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 mb-8 md:mb-10 flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors duration-500">
                      <span className={`text-xs md:text-sm font-mono text-white/50 group-hover:${card.textC} transition-colors`}>0{i+1}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-light mb-4 md:mb-5 tracking-tight">{card.title}</h3>
                    <p className="text-white/40 font-light leading-relaxed text-sm md:text-lg group-hover:text-white/60 transition-colors duration-500">
                      Impeccably crafted and technologically boundless, entirely devoid of heavy borders.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FINAL CTA SECTION --- */}
        <section ref={ctaContainerRef} className="relative w-full py-32 md:py-48 flex flex-col items-center justify-center z-10 overflow-hidden">
           {/* Abstract Orbital Rings */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
             <div className="w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] border border-white/[0.03] rounded-full animate-[spin_80s_linear_infinite]"></div>
             <div className="absolute w-[500px] h-[500px] md:w-[800px] md:h-[800px] border border-white/[0.05] rounded-full animate-[spin_50s_linear_infinite_reverse]"></div>
             <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-white/[0.08] rounded-full animate-[spin_30s_linear_infinite]"></div>
           </div>

           {/* Pure DOM-manipulated smooth scaling card */}
           <div className="px-4 md:px-8 lg:px-24 flex justify-center w-full">
  <div 
    ref={ctaCardRef}
    className="relative z-10 w-full max-w-4xl border border-white/10 bg-white/5 backdrop-blur-[40px] p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] text-center shadow-[0_0_100px_rgba(255,255,255,0.03)] glass-panel
    transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
    transform-gpu will-change-transform
    hover:scale-[1.03] overflow-hidden"
    style={{ boxSizing: 'border-box' }}
  >
    {/* Video container — larger, rounded */}
    <div className="w-full mx-auto mb-8 md:mb-10 rounded-2xl overflow-hidden border border-white/10 bg-black/30 aspect-video">
      <video
        className="w-full h-full object-cover"
        src="/assets/BI.mp4"
        poster="/assets/BI.jpg"
        playsInline
        muted
        loop
        autoPlay
      >
        <track kind="captions" />
      </video>
    </div>

    <button className="px-8 py-4 md:px-12 md:py-6 bg-white text-black rounded-full font-medium tracking-widest uppercase text-xs md:text-sm hover:bg-transparent hover:text-white hover:border-white border border-transparent transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
      Request platform access
    </button>
  </div>
</div>
        </section>
        
        {/* Minimal Footer */}
        <footer className="w-full py-12 text-center text-white/20 text-[10px] md:text-xs tracking-[0.2em] font-light uppercase z-10 relative">
          <p>Antigravity Modernism Concept • No Grid, All Flow</p>
        </footer>
      </main>
    </div>
  );
}
