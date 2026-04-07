# IUCEE-EWB HITAM Website

Welcome to the official repository for the **IUCEE-EWB HITAM** student chapter website. This platform serves to showcase our journey, promote our multi-disciplinary events, and highlight our core team and testimonials.

The site is engineered for a premium, high-tech, and engaging experience. It features modern design paradigms like **Glassmorphism**, **Neon SVG Animations**, and **Holographic 3D Hover Effects** to establish a strong technical organization aesthetic.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router approach)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for scroll-effects, micro-interactions, and 3D component tilts
- **Icons**: [Lucide React](https://lucide.dev/)

## Project Structure

### Data Sources (`/src/data/`)
All dynamically structured content lives here as easy-to-update JSON files so that non-developer members can manage content.
- `events.json`: Tracks upcoming organizational events and registration data.
- `history.json`: Logged organizational milestones reaching back to the founding.
- `team.json`: Bios, roles, and image refs for the Core Team and executive members.

### Pages (`/src/app/`)
- `/` (Home): Features our Vision & Mission statements baked into interactive UI grids, along with the Core Team and Testimonials.
- `/about`: Details the purpose, the community-oriented engineering initiatives, and authority-focused text sections.
- `/events`: Contains tabs for Upcoming Events (cards) and Our History. Features the standout interactive 'Roadmap to Excellence' S-shaped timeline.

### Components (`/src/components/`)
Highly polished, reusable UI blocks:
- **`SnakeTimeline.tsx`**: A responsive, 1200x1200 SVG S-curve roadmap featuring a glowing neon `#50C878` path, interactive glowing nodes, strict collision-resistant staggering, and glass-frosted milestone cards.
- **`TestimonialCarousel.tsx`**: Immersive testimonial section utilizing holographic tilt hover effects via Framer Motion.
- **`CoreTeamCarousel.tsx`**: A premium Glassmorphism-style carousel to beautifully present team members profiles and masks.
- **`TeamGrid.tsx`**: Standard fallback grid view for full team rosters.
- **`ContactCard.tsx`**: Sleek UI for chapter reach-outs.
- **`Roadmap.tsx`**: A secondary/classic vertical iteration of the history visualizer.
- **`Navbar.tsx` / `Footer.tsx`**: Foundation layout navigation components.

## Getting Started

First, install dependencies:
\`\`\`bash
npm install
\`\`\`

Run the development server locally:
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page will auto-update as you edit the files.

## Design Philosophy

- **Premium Aesthetics**: Eschews generic layouts for vibrant "cyber/tech" color palettes prioritizing deep charcoal-black (#121212) alongside neon emerald greens.
- **Dynamic Interfaces**: Responsive and alive designs that encourage user interaction. Every major element leverages hover micro-animations or particle backgrounds.
- **Zero Placeholder Code**: Relies heavily on high-end Framer motion physics and generated SVGs over large static images.
