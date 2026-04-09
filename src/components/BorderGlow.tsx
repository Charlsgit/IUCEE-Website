"use client";

import { useRef, useCallback, ReactNode } from "react";

interface BorderGlowProps {
  children: ReactNode;
  /** Distance (px) from the edge that triggers the glow */
  edgeSensitivity?: number;
  /** RGB values as "r g b" string, e.g. "40 80 80" */
  glowColor?: string;
  /** CSS background color of the card */
  backgroundColor?: string;
  /** Border radius in px */
  borderRadius?: number;
  /** Blur radius of the glow (px) */
  glowRadius?: number;
  /** Multiplier for glow brightness (0–2) */
  glowIntensity?: number;
  /** Half-angle of the cone in degrees */
  coneSpread?: number;
  /** Whether the glow pulses when idle */
  animated?: boolean;
  /** Gradient color stops for the border glow */
  colors?: string[];
  className?: string;
  style?: React.CSSProperties;
}

export default function BorderGlow({
  children,
  edgeSensitivity = 30,
  glowColor = "40 80 80",
  backgroundColor = "#060010",
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = ["#c084fc", "#f472b6", "#38bdf8"],
  className = "",
  style = {},
}: BorderGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Convert hex/named color to a CSS rgba string with given alpha
  const toRgba = (hex: string, alpha: number) => {
    // Strip leading #
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  // Build a conic/radial gradient sitting on the nearest border edge
  const buildGlow = useCallback(
    (mx: number, my: number, w: number, h: number): string => {
      // Distances from each edge
      const dLeft = mx;
      const dRight = w - mx;
      const dTop = my;
      const dBottom = h - my;

      const minDist = Math.min(dLeft, dRight, dTop, dBottom);

      // How close must the mouse be to trigger the glow?
      const proximity = Math.max(0, 1 - minDist / edgeSensitivity);
      if (proximity === 0) return "none";

      // Determine which edge is closest and pick an angle toward center
      let angleDeg: number;
      let originX: string;
      let originY: string;

      if (minDist === dLeft) {
        angleDeg = 90; // glow shoots right (into card)
        originX = "0%";
        originY = `${(my / h) * 100}%`;
      } else if (minDist === dRight) {
        angleDeg = 270;
        originX = "100%";
        originY = `${(my / h) * 100}%`;
      } else if (minDist === dTop) {
        angleDeg = 180;
        originX = `${(mx / w) * 100}%`;
        originY = "0%";
      } else {
        angleDeg = 0;
        originX = `${(mx / w) * 100}%`;
        originY = "100%";
      }

      // Pick color from gradient based on position along the edge
      const colorIndex = Math.floor(
        ((minDist === dLeft || minDist === dRight) ? my / h : mx / w) *
          (colors.length - 1)
      );
      const primaryColor = colors[Math.min(colorIndex, colors.length - 1)];
      const secondaryColor = colors[Math.min(colorIndex + 1, colors.length - 1)];

      const alpha = proximity * glowIntensity;
      const c1 = toRgba(primaryColor, Math.min(alpha, 1));
      const c2 = toRgba(secondaryColor, Math.min(alpha * 0.5, 1));

      // Radial glow from the edge origin
      return `radial-gradient(ellipse ${glowRadius * 4}px ${glowRadius * 2}px at ${originX} ${originY}, ${c1} 0%, ${c2} 50%, transparent 100%)`;
    },
    [edgeSensitivity, glowRadius, glowIntensity, colors]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || !glowRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!glowRef.current) return;
        const glow = buildGlow(mx, my, rect.width, rect.height);
        glowRef.current.style.background = glow === "none" ? "transparent" : glow;
        glowRef.current.style.opacity = glow === "none" ? "0" : "1";
      });
    },
    [buildGlow]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (glowRef.current) {
      glowRef.current.style.background = "transparent";
      glowRef.current.style.opacity = "0";
    }
  }, []);

  // Build a static conic gradient border using the color palette
  const borderGradient = `linear-gradient(${backgroundColor}, ${backgroundColor}) padding-box, linear-gradient(135deg, ${colors.join(", ")}) border-box`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        position: "relative",
        borderRadius: `${borderRadius}px`,
        background: borderGradient,
        border: "1.5px solid transparent",
        overflow: "hidden",
        isolation: "isolate",
        ...style,
      }}
    >
      {/* Animated idle pulse */}
      {animated && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: `${borderRadius}px`,
            background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${toRgba(colors[0], 0.18)} 0%, transparent 70%)`,
            animation: "borderGlowPulse 3s ease-in-out infinite",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}

      {/* Edge glow layer */}
      <div
        ref={glowRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: `${borderRadius}px`,
          opacity: 0,
          transition: "opacity 0.15s ease, background 0.05s linear",
          pointerEvents: "none",
          zIndex: 1,
          filter: `blur(${glowRadius * 0.4}px)`,
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>

      <style>{`
        @keyframes borderGlowPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.03); }
        }
      `}</style>
    </div>
  );
}
