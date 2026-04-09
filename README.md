# IUCEE-EWB HITAM ✨

Welcome to the official web platform for the **IUCEE-EWB HITAM** (Engineers Without Borders) student chapter. This ecosystem is engineered from the ground up to showcase our technological journey, multi-disciplinary engineering initiatives, and core community members.

It moves beyond a simple informational website to deliver a premium, software-dashboard experience utilizing modern web paradigms like **Glassmorphism**, **Physics-Based UI Animations**, **Real-time Counters**, and **Interactive 3D Visualizations**.

---

## ⚡ Architecture & Tech Stack

This project was built with performance, high-end aesthetics, and maintainability in mind.

- **Framework**: [Next.js 16.2](https://nextjs.org) (App Router approach)
- **Core Library**: [React 19](https://react.dev)
- **Styling Engine**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation Physics**: [Framer Motion v12](https://www.framer.com/motion/) for fluid page transitions, spring-based interactions, and scroll-reveal triggers.
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 💎 Premium UI Highlights & Sub-systems

### 1. Projects Dashboard Ecosystem
The crown jewel of the platform is the **Projects** section.
- **App-like Layout**: Integrates a responsive, category-colored Grid (AI, IoT, Sustainability, Software) for over 20+ engineering projects.
- **Deep-Integration Modals**: Expanding a project bypasses standard page-routing into an immersive `<AnimatePresence>` overlay modal, ensuring maximum read retention and seamless UX.
- **Rolling Number Physics**: Custom-engineered `Counter.tsx` animations inject motion into UI stat blocks, simulating rotating physical odometers.

### 2. Interactive Historical Tracking
- **The Snake Timeline**: A customized, responsive 1200x1200 SVG S-Curve `#50C878` neon path that logs chapter milestones utilizing intricate collision-resistant bounding box staggering.
- **Dynamic Backgrounds**: Uses reactive 3D aesthetic environments like `LiquidOcean` (a simulated fluid topography data layer) and `PerspectiveGrid` (an interactive neon framework grid) that dynamically adapt to the user's cursor.

### 3. State-of-the-Art Team Showcases
- **Orbit Team Stage**: A gravitational `OrbitTeamSection` rotates the Core Team profiles natively around the foundational IUCEE logo in a constant physics loop.
- **Holographic Testimonials**: 3D perspective-tilt carousels (`TestimonialCarousel`) and interactive glassmorphic profile cards bring member voices to life using `useMotionValue` tracking.
- **Masked Avatars**: A bespoke aesthetic rendering technique leveraging alpha-channel SVGs to integrate rich photography with high-tech background framing.

---

## 📁 Development Structure & Data Abstraction

To ensure non-developers can manage update flows, all deep architectural context is abstracted into static data structures:

### `/src/data/`
- `projects.json`: Automates the entire Projects grid and generates the deep-dive modals payload (problems, scalable solutions, tag clouds) systematically. 
- `events.json`: Tracks historical event registrations and chapter timelines.
- `team.json`: Holds biological data for seamless ingestion into the Core Team loops.

### `/src/components/`
Our heavily polished, atomized component library. Standouts include:
- `Counter.tsx` — Odometer-style number scrolling.
- `OrbitTeamSection.tsx` — Rotational profile mapping.
- `testimonials-card.tsx` — Expanding genie-style glass panels for in-grid reading.
- `BorderGlow.tsx` — Algorithmic cursor-following hover strokes on UI borders.

---

## 🚀 Getting Started

To deploy or expand this project locally:

First, install the package ecosystem:
```bash
npm install
```

Boot the Next.js development server:
```bash
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to view the portal. The App Router layout fully supports hot-reloading.

---

## 🎨 Design Philosophy

1. **Vibrant & Unapologetic**: We eschew plain corporate UI for "cyber/tech" palettes prioritizing deep charcoal-black (`#050505`) and high-contrast neon emerald greens (`#10b981`).
2. **True Dark Mode Scalability**: Integrated utilizing `next-themes`, the application flips effortlessly between a pristine Zinc-50 bright aesthetic and the primary signature Dark UI.
3. **Information Density with Brevity**: Every layout relies on high information density, dropping complex multi-page routing for dynamic interactive modals, hover-cards, and snap scrollbars.
