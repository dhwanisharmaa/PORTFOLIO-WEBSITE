import React, { useState, useEffect, useRef } from 'react';

/*
 * FloatingBotanicals
 * 
 * Renders 4–6 small, hand-painted watercolor flowers and botanical
 * fragments at sparse, semi-random positions throughout the full
 * page height. Elements fade in gently as the user scrolls them
 * into view — like discovering pressed flowers in a botanical journal.
 *
 * Position: absolute overlay, pointer-events: none, z-index: 1.
 * Above the background/backdrop, below all section content.
 *
 * Does NOT modify any existing component.
 */

// ─── Seeded PRNG (mulberry32) for deterministic, reload-consistent randomization ───
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}


// ═══════════════════════════════════════════════════════════
// ELEMENT TYPE 1 — Single Watercolor Flower
// 5–6 petals as rotated ellipses around a centre, with
// radial gradient, off-centre origin, and watercolor filter.
// ═══════════════════════════════════════════════════════════
function FlowerElement({ uid, rand }) {
  const n = rand() > 0.5 ? 6 : 5;
  const sz = 45 + Math.floor(rand() * 20);
  const gRot = Math.floor(rand() * 360);
  const gradCx = 36 + rand() * 8;
  const gradCy = 36 + rand() * 8;

  const petals = [];
  for (let i = 0; i < n; i++) {
    petals.push({
      rx: 10 + (rand() - 0.5) * 4,
      ry: 15 + (rand() - 0.5) * 4,
      cy: 21 + rand() * 2,
      angle: (360 / n) * i,
    });
  }
  const centreR = 3.5 + rand();

  return (
    <svg viewBox="0 0 80 80" width={sz} height={sz}>
      <defs>
        <filter id={`wcf${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="n" />
          <feColorMatrix type="saturate" values="0.2" in="n" result="m" />
          <feBlend in="SourceGraphic" in2="m" mode="multiply" />
          <feGaussianBlur stdDeviation="0.8" />
        </filter>
        <radialGradient id={`pg${uid}`} cx={`${gradCx}%`} cy={`${gradCy}%`}>
          <stop offset="0%" stopColor="#E0BFC8" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#D4A8B5" stopOpacity="0.3" />
        </radialGradient>
      </defs>
      <g filter={`url(#wcf${uid})`} opacity="0.18" transform={`rotate(${gRot} 40 40)`}>
        {petals.map((p, i) => (
          <ellipse
            key={i}
            cx="40"
            cy={p.cy}
            rx={p.rx}
            ry={p.ry}
            fill={`url(#pg${uid})`}
            transform={`rotate(${p.angle} 40 40)`}
          />
        ))}
        <circle cx="40" cy="40" r={centreR} fill="#C4B898" opacity="0.5" />
      </g>
    </svg>
  );
}


// ═══════════════════════════════════════════════════════════
// ELEMENT TYPE 2 — Small Leaf Sprig
// A single leaf on a short stem snippet.
// ═══════════════════════════════════════════════════════════
function LeafSprigElement({ uid, rand }) {
  const sz = 35 + Math.floor(rand() * 15);
  const leafOpacity = 0.16 + rand() * 0.06;

  return (
    <svg viewBox="0 0 50 70" width={sz} height={Math.floor(sz * 1.4)}>
      <defs>
        <filter id={`wcl${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="n" />
          <feColorMatrix type="saturate" values="0.2" in="n" result="m" />
          <feBlend in="SourceGraphic" in2="m" mode="multiply" />
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
        <radialGradient id={`lg${uid}`} cx="45%" cy="40%">
          <stop offset="0%" stopColor="#B5CCA5" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#7A9E6A" stopOpacity="0.3" />
        </radialGradient>
      </defs>
      <g filter={`url(#wcl${uid})`}>
        {/* Short stem */}
        <path
          d="M 25,65 C 23,55 26,48 25,40"
          fill="none"
          stroke="#B5C4A8"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.15"
        />
        {/* Leaf body */}
        <path
          d="M 25,40 C 31,30 42,14 36,5 C 28,14 17,30 25,40 Z"
          fill={`url(#lg${uid})`}
          opacity={leafOpacity}
        />
        {/* Central vein */}
        <path
          d="M 25,38 Q 29,22 36,7"
          fill="none"
          stroke="#7A9E6A"
          strokeWidth="0.4"
          opacity="0.10"
        />
      </g>
    </svg>
  );
}


// ═══════════════════════════════════════════════════════════
// ELEMENT TYPE 3 — Petal Cluster
// 2–3 individual petals scattered loosely, as if fallen.
// ═══════════════════════════════════════════════════════════
function PetalClusterElement({ uid, rand }) {
  const count = rand() > 0.6 ? 3 : 2;
  const petals = [];
  for (let i = 0; i < count; i++) {
    petals.push({
      cx: 18 + rand() * 24,
      cy: 18 + rand() * 24,
      rx: 8 + rand() * 6,
      ry: 6 + rand() * 5,
      rotation: rand() * 160 - 80,
      color: rand() > 0.5 ? '#D4A8B5' : '#E0BFC8',
      opacity: 0.12 + rand() * 0.06,
    });
  }

  return (
    <svg viewBox="0 0 60 60" width={50} height={50}>
      <defs>
        <filter id={`wcp${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
        </filter>
      </defs>
      <g filter={`url(#wcp${uid})`}>
        {petals.map((p, i) => (
          <ellipse
            key={i}
            cx={p.cx}
            cy={p.cy}
            rx={p.rx}
            ry={p.ry}
            fill={p.color}
            opacity={p.opacity}
            transform={`rotate(${p.rotation} ${p.cx} ${p.cy})`}
          />
        ))}
      </g>
    </svg>
  );
}


// ═══════════════════════════════════════════════════════════
// ELEMENT TYPE 4 — Tiny Bud with Leaves
// A small closed flower bud with 2 tiny leaves and short stem.
// ═══════════════════════════════════════════════════════════
function BudElement({ uid, rand }) {
  // eslint-disable-next-line no-unused-vars
  const _ = rand(); // consume one value for variation seeding
  return (
    <svg viewBox="0 0 50 55" width={42} height={46}>
      <defs>
        <filter id={`wcb${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="n" />
          <feColorMatrix type="saturate" values="0.2" in="n" result="m" />
          <feBlend in="SourceGraphic" in2="m" mode="multiply" />
          <feGaussianBlur stdDeviation="0.7" />
        </filter>
      </defs>
      <g filter={`url(#wcb${uid})`}>
        {/* Short stem */}
        <path d="M 25,55 C 24,48 25,42 25,36" fill="none" stroke="#B5C4A8"
              strokeWidth="0.9" strokeLinecap="round" opacity="0.12" />
        {/* Left leaf */}
        <path d="M 25,38 C 18,34 12,28 14,22 C 18,28 22,34 25,38 Z"
              fill="#A8B89C" opacity="0.15" />
        {/* Right leaf */}
        <path d="M 25,36 C 32,32 38,26 36,20 C 32,26 28,32 25,36 Z"
              fill="#A8B89C" opacity="0.15" />
        {/* Closed bud */}
        <path d="M 25,28 C 22,22 22,14 25,8 C 28,14 28,22 25,28 Z"
              fill="#C9A0A8" opacity="0.18" />
      </g>
    </svg>
  );
}


// ═══════════════════════════════════════════════════════════
// ELEMENT TYPE 5 — Pollen Scatter
// A small group of tiny dots and one micro-leaf.
// Subtlest element type — used nearest to content.
// ═══════════════════════════════════════════════════════════
function PollenElement({ uid, rand }) {
  const dotCount = 5 + Math.floor(rand() * 3);
  const dots = [];
  for (let i = 0; i < dotCount; i++) {
    dots.push({
      cx: 8 + rand() * 28,
      cy: 8 + rand() * 28,
      r: 1.5 + rand(),
      opacity: 0.18 + rand() * 0.12,
      color: rand() > 0.5 ? '#D4C9A8' : '#C4B898',
    });
  }
  const leafX = 30 + rand() * 8;
  const leafY = 20 + rand() * 10;
  const sz = 35 + Math.floor(rand() * 10);

  return (
    <svg viewBox="0 0 45 45" width={sz} height={sz}>
      <defs>
        <filter id={`wcd${uid}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
        </filter>
      </defs>
      <g filter={`url(#wcd${uid})`}>
        {dots.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={d.color} opacity={d.opacity} />
        ))}
        {/* Micro-leaf at edge of scatter */}
        <path
          d={`M ${leafX},${leafY} C ${leafX - 3},${leafY - 10} ${leafX + 5},${leafY - 17} ${leafX + 3},${leafY - 20} C ${leafX + 1},${leafY - 17} ${leafX - 5},${leafY - 10} ${leafX},${leafY} Z`}
          fill="#A8B89C"
          opacity="0.14"
        />
      </g>
    </svg>
  );
}


// ═══════════════════════════════════════════════════════════
// Renderer lookup table
// ═══════════════════════════════════════════════════════════
const RENDERERS = [FlowerElement, LeafSprigElement, PetalClusterElement, BudElement, PollenElement];


// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════

const FloatingBotanicals = () => {
  const [items, setItems] = useState([]);
  const [pageHeight, setPageHeight] = useState(0);
  const itemRefs = useRef([]);

  // ─── Effect 1: Compute deterministic positions on mount ───
  useEffect(() => {
    // Allow layout to settle (images, fonts, GSAP pinning, etc.)
    const timer = setTimeout(() => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const scrollH = document.documentElement.scrollHeight;
      setPageHeight(scrollH);

      // ── Responsive element count ──
      // Roughly 1 per 1.7 viewport heights, capped by breakpoint
      const rawCount = Math.floor(scrollH / (vh * 1.7));
      let count;
      if (vw < 768) count = Math.min(rawCount, 3);
      else if (vw < 1024) count = Math.min(rawCount, 4);
      else count = Math.min(rawCount, 6);
      count = Math.max(2, Math.min(count, 8));

      // ── Section boundary y-coordinates (collision avoidance) ──
      const sectionIds = ['hero', 'about', 'skills', 'projects', 'experience', 'achievements', 'contact'];
      const boundaries = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .map((el) => el.offsetTop);

      // ── Generate positions with seeded PRNG ──
      const baseSpacing = scrollH / count;
      const generated = [];
      let lastType = -1;

      for (let i = 0; i < count; i++) {
        const r = mulberry32(42 + i * 137);

        // Vertical: base grid + jitter ±20%
        let y = baseSpacing * (i + 0.5) + baseSpacing * (r() - 0.5) * 0.4;

        // Collision avoidance: push away from section tops
        for (const boundary of boundaries) {
          if (Math.abs(y - boundary) < 120) {
            y = boundary + 140 + r() * 80;
          }
        }
        y = Math.max(vh * 0.3, Math.min(scrollH - 100, y));

        // Horizontal: edge-biased distribution
        let xPercent;
        const edgeRoll = r();

        if (vw < 768) {
          // Mobile: extreme edges only (0–8% or 92–100%)
          xPercent = r() > 0.5 ? 92 + r() * 6 : 2 + r() * 6;
        } else if (vw < 1024) {
          // Tablet: 80% at edges, 20% at mid-margins
          if (edgeRoll < 0.8) {
            xPercent = r() > 0.5 ? 88 + r() * 10 : 2 + r() * 10;
          } else {
            xPercent = r() > 0.5 ? 62 + r() * 18 : 20 + r() * 18;
          }
        } else {
          // Desktop: 70% at edges (0–15% or 85–100%), 30% mid-margins
          if (edgeRoll < 0.7) {
            xPercent = r() > 0.5 ? 85 + r() * 13 : 2 + r() * 13;
          } else {
            xPercent = r() > 0.5 ? 62 + r() * 18 : 20 + r() * 18;
          }
        }

        // Element type: no two adjacent elements use the same type
        let type;
        do {
          type = Math.floor(r() * 5);
        } while (type === lastType && count > 1);
        lastType = type;

        // Per-element variation
        let scale = 0.7 + r() * 0.6;
        if (vw < 768) scale *= 0.75;
        else if (vw < 1024) scale *= 0.85;

        const rotation = (r() - 0.5) * 90; // -45° to +45°
        const opacity = 0.12 + r() * 0.10;
        const mirror = r() > 0.5;
        const isEdgeBleed = i === 0 || i === count - 1; // 1–2 elements partially off-screen

        generated.push({
          id: i,
          uid: `fb${i}`,
          xPercent,
          y: Math.round(y),
          type,
          scale,
          rotation,
          opacity: +opacity.toFixed(3),
          mirror,
          isEdgeBleed,
          randSeed: 42 + i * 137 + 1000, // separate seed for SVG variation
        });
      }

      setItems(generated);
    }, 300); // Brief delay for layout to settle

    // ResizeObserver: update container height if page height changes
    const ro = new ResizeObserver(() => {
      setPageHeight(document.documentElement.scrollHeight);
    });
    ro.observe(document.body);

    return () => {
      clearTimeout(timer);
      ro.disconnect();
    };
  }, []);

  // ─── Effect 2: IntersectionObserver fade-in after items render ───
  useEffect(() => {
    if (items.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Immediately show all at final state — no animation
      itemRefs.current.forEach((el) => {
        if (el) {
          el.style.opacity = el.dataset.targetOpacity;
          el.style.transform = el.dataset.targetTransform;
          el.style.transition = 'none';
        }
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.style.opacity = el.dataset.targetOpacity;
            el.style.transform = el.dataset.targetTransform;
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -15% 0px' }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (pageHeight === 0) return null;

  return (
    <div
      className="floating-botanicals"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: pageHeight,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {items.map((item, idx) => {
        const sx = item.mirror ? -item.scale : item.scale;
        const finalTransform = `translateY(0px) rotate(${item.rotation.toFixed(1)}deg) scale(${sx.toFixed(3)}, ${item.scale.toFixed(3)})`;
        const initTransform = `translateY(12px) rotate(${item.rotation.toFixed(1)}deg) scale(${sx.toFixed(3)}, ${item.scale.toFixed(3)})`;

        // Edge bleed: shift 1–2 elements partially off-screen
        let left = `${item.xPercent.toFixed(1)}%`;
        if (item.isEdgeBleed) {
          const nudge = item.xPercent > 50 ? 20 : -20;
          left = `calc(${item.xPercent.toFixed(1)}% + ${nudge}px)`;
        }

        const Renderer = RENDERERS[item.type];
        const rand = mulberry32(item.randSeed);

        return (
          <div
            key={item.id}
            ref={(el) => (itemRefs.current[idx] = el)}
            data-target-opacity={item.opacity}
            data-target-transform={finalTransform}
            style={{
              position: 'absolute',
              left,
              top: item.y,
              opacity: 0,
              transform: initTransform,
              transition: 'opacity 1.2s ease-out, transform 1.4s ease-out',
              willChange: 'opacity, transform',
            }}
          >
            <Renderer uid={item.uid} rand={rand} />
          </div>
        );
      })}
    </div>
  );
};

export default FloatingBotanicals;
