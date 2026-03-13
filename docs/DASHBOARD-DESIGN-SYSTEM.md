# Dashboard Design System & Map Implementation Prompt

This document provides a comprehensive overview of the "Antigravity/Glassmorphism" dashboard design system created for the Infrastructure Intelligence Platform, along with a specific prompt for extracting and adapting the interactive map component for a weather application.

---

## Part 1: Dashboard Design System Overview

The dashboard utilizes a premium, dark-mode-first aesthetic heavily inspired by Apple's MacOS window styling and modern "Antigravity" web trends. It focuses on depth, translucency, and subtle glowing accents.

### Core Aesthetic Principles
*   **Theme:** Deep dark background (`#030305` or `#0a0a0f`) with high-contrast, glowing accents.
*   **Material:** Heavy use of "Glassmorphism" — panels are semi-transparent (`bg-white/[0.02]` or `bg-white/1`), utilize background blurring (`backdrop-blur-xl` to `3xl`), and have very subtle, thin borders (`border-white/5`).
*   **Typography:** Clean, modern sans-serif (Google Sans Flex). High contrast for primary data (pure white), muted for labels (`text-white/50`), and tracking/uppercase for metadata (`tracking-widest uppercase text-[10px]`).
*   **Accents:** Neon, cyberpunk-inspired colors used sparingly for data visualization and hover states (Cyan `#22d3ee`, Fuchsia `#d946ef`, Orange `#f97316`).
*   **Lighting/Depth:** Elements don't cast traditional drop shadows; instead, they emit "glows" using radial gradients or colored box-shadows (`shadow-[0_0_15px_rgba(34,211,238,0.3)]`). Large, soft, blurred colored orbs sit behind panels to create atmospheric depth.

### Key Structural Components

1.  **Layout (`app/dashboard/layout.tsx`)**
    *   Full-screen, non-scrolling outer container (`h-screen overflow-hidden`).
    *   A massive, subtle background glow behind the main content area.
    *   Flexbox layout: Sidebar on the left, Header + Main Content column on the right.

2.  **Sidebar (`app/components/dashboard/Sidebar.tsx`)**
    *   **Desktop:** Collapsible (expands from 20px to 64px width). Uses a smooth cubic-bezier transition. Active states feature a glowing left border indicator and highlighted icons.
    *   **Mobile:** Transforms into an off-canvas drawer that slides in from the left, overlaying the content with a darkened backdrop.
    *   **Icons:** Uses `hugeicons-react` for a consistent, thin-line aesthetic.

3.  **Header (`app/components/dashboard/Header.tsx`)**
    *   Fixed at the top, highly blurred (`backdrop-blur-xl`).
    *   Contains a global "Command Menu" search trigger (looks like an input, acts like a button).
    *   Features utility icons (density toggle, notifications) with hover-glow effects.

4.  **Cards / Panels (The "Glass Panel" Utility)**
    *   The fundamental building block.
    *   Classes: `rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl overflow-hidden`.
    *   Often feature a subtle, colored glowing orb positioned absolutely in the top right corner (`blur-3xl opacity-10`) that intensifies on hover.

5.  **Global State (`app/dashboard/context.tsx`)**
    *   Manages the Command Menu (`Cmd+K`) visibility.
    *   Manages "Data Density" (Comfortable vs. Compact), which dynamically adjusts table padding (`py-4` vs `py-2`) across the app.
    *   Manages Mobile Sidebar toggle state.

---

## Part 2: Prompt for Replicating the Interactive Map for a Weather App

*Copy and paste the following prompt to an AI assistant when you are ready to build your weather app.*

***

**Context:**
I am building a modern, dark-themed weather application. I want to implement a highly interactive, premium-looking world map to display weather data (like temperature, precipitation, or storm tracking) across different regions. 

I want to replicate a specific map component style I used in a previous project. That component was built using `react-simple-maps` and `d3-geo` in a Next.js (React) environment.

**Visual Aesthetic & Requirements:**
1.  **Base Map:** The map should use a dark, glassmorphism aesthetic. The landmasses should be a very subtle translucent white (`fill="rgba(255,255,255,0.03)"`) with thin, slightly brighter borders (`stroke="rgba(255,255,255,0.1)"`).
2.  **Interactivity:** 
    *   The map must support zooming and panning (`ZoomableGroup`).
    *   Hovering over a country should slightly highlight it (e.g., a faint cyan or white tint).
3.  **Markers (The Weather Data):**
    *   Instead of infrastructure projects, the markers will represent weather stations or major cities.
    *   Each marker should consist of a solid inner circle and a larger, pulsing outer circle to draw attention (using a CSS `animate-pulse` or similar).
    *   The color of the marker should dynamically reflect the weather condition (e.g., Blue for cold/rain, Orange/Red for heat, White for snow).
4.  **Tooltips:** Hovering over a marker should display a sleek, floating tooltip. The tooltip must look like a "glass panel" (dark background, heavy backdrop blur, thin white border, rounded corners) and animate in smoothly. It should display the city name and the current temperature/condition.
5.  **Legend:** There should be a floating legend overlay in the bottom corner of the map container. It should also use the glass panel styling and explain the color coding of the markers.
6.  **Responsiveness:** The map must be fully responsive. On mobile devices, the legend and tooltips should scale down so they don't obscure the map.

**Technical Stack:**
*   React (Next.js App Router preferred, but standard React is fine).
*   `react-simple-maps` (for the SVG map rendering).
*   Tailwind CSS (for styling the container, tooltips, legend, and pulsing animations).

**Task:**
Please generate the complete code for this `WeatherMap` component. Include dummy data for 5-6 global cities with varying weather conditions so I can see the dynamic coloring and tooltips in action. Ensure the code handles hydration properly (e.g., using a `mounted` state) if using Next.js to avoid SSR mismatch errors with the map projection.