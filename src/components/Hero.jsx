import React, { useState, useRef } from 'react';

/*
 * Five unique asymmetrical leaf silhouettes.
 * Each is a closed path originating from (0,0) — the attachment point on the stem.
 * Shapes vary in width, curvature, and tip sharpness to avoid repetition.
 */
const leafShapes = [
  // Leaf A — small, narrow, slightly curved left
  { path: 'M 0,0 C 3,-10 11,-28 7,-36 C 2,-30 -5,-12 0,0 Z',
    vein: 'M 0,-2 Q 2,-14 7,-33' },
  // Leaf B — medium, rounder body, asymmetric right edge
  { path: 'M 0,0 C 8,-13 19,-36 12,-46 C 4,-38 -5,-13 0,0 Z',
    vein: 'M 0,-2 Q 5,-18 12,-42' },
  // Leaf C — larger, broader, gentle point
  { path: 'M 0,0 C 9,-17 25,-45 17,-56 C 7,-46 -7,-17 0,0 Z',
    vein: 'M 0,-2 Q 6,-22 17,-51' },
  // Leaf D — medium, distinctly asymmetric (wider left)
  { path: 'M 0,0 C 10,-12 17,-35 10,-44 C 2,-36 -4,-12 0,0 Z',
    vein: 'M 0,-2 Q 5,-16 10,-40' },
  // Leaf E — small, tight curl
  { path: 'M 0,0 C 5,-9 13,-25 8,-33 C 3,-26 -3,-9 0,0 Z',
    vein: 'M 0,-2 Q 3,-12 8,-29' },
];

/*
 * HeroLeaf — Renders a single watercolor-style leaf.
 * Multi-layered treatment:
 *   1. Pigment bloom halo (scaled up, very low opacity)
 *   2. Feathered edge stroke (wide, faint)
 *   3. Watercolor fill (muted sage green)
 *   4. Wet-on-wet shadow (darker, offset)
 *   5. Ink outline (fine linework)
 *   6. Central vein (delicate stroke)
 */
const HeroLeaf = ({ x, y, rotation, shapeIndex, scale = 1 }) => {
  const { path, vein } = leafShapes[shapeIndex];
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`}>
      {/* 1. Pigment bloom — soft halo bleeding into parchment */}
      <path d={path} fill="#788F76" opacity="0.04" transform="scale(1.35)" />
      {/* 2. Feathered edge — wide faint stroke simulating watercolor spread */}
      <path d={path} fill="none" stroke="#788F76" strokeWidth="2.5" opacity="0.03" />
      {/* 3. Watercolor base fill */}
      <path d={path} fill="#788F76" opacity="0.16" />
      {/* 4. Wet-on-wet shadow — darker green, offset */}
      <path d={path} fill="#6F856E" opacity="0.07" transform="translate(1.5,-1)" />
      {/* 5. Ink outline — fine botanical linework */}
      <path d={path} fill="none" stroke="#6F856E" strokeWidth="0.4" opacity="0.20" />
      {/* 6. Central vein — delicate stroke */}
      <path d={vein} fill="none" stroke="#6F856E" strokeWidth="0.45" opacity="0.22" />
    </g>
  );
};

const Hero = () => {
  const [ripples, setRipples] = useState([]);
  const lastRippleTime = useRef(0);
  const heroRef = useRef(null);

  const handleMouseMove = (e) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const now = Date.now();
    if (now - lastRippleTime.current < 350) return;
    lastRippleTime.current = now;

    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = now;

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 1500);
  };

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      const navHeight = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        background: 'var(--cream)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center'
      }}
    >

      {/* Cursor Ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="cursor-ripple"
          style={{
            position: 'absolute',
            left: ripple.x - 30,
            top: ripple.y - 30,
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: '1px solid var(--olive)',
            pointerEvents: 'none',
            zIndex: 3,
            transform: 'scale(0)',
            opacity: 0.15,
            animation: 'ripple-expand 1.5s cubic-bezier(0.1, 0.8, 0.3, 1) forwards'
          }}
        />
      ))}

      {/*
        ══════════════════════════════════════════════════════
        WATERCOLOR BOTANICAL DECORATION LAYER
        
        Hand-painted watercolor elements: leaf clusters, small
        flowers, foliage fragments, and pollen dots. Positioned
        in the negative space edges of the hero — upper-right
        and lower-left — to give the page the warmth of an
        antique botanical journal.
        
        zIndex 0 (behind stem at 1, behind typography at 2).
        ══════════════════════════════════════════════════════
      */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="none"
             style={{ width: '100%', height: '100%' }}>
          <defs>
            <filter id="wc-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
            </filter>
            <filter id="wc-dot" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
            </filter>
            <radialGradient id="wc-leaf-grad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#B5C4A8" stopOpacity="1" />
              <stop offset="100%" stopColor="#7A9E6A" stopOpacity="0.8" />
            </radialGradient>
          </defs>

          {/* ─── UPPER-RIGHT LEAF CLUSTER ─── */}
          <g filter="url(#wc-soft)">
            {/* Leaf 1 — large, trailing from top-right corner */}
            <g transform="translate(1380, 80) rotate(-25)" opacity="0.20">
              <path d="M 0,0 C 8,-20 28,-55 18,-68 C 6,-56 -8,-20 0,0 Z" fill="#B5C4A8" />
              <path d="M 1,-2 C 9,-21 29,-56 19,-69 C 7,-57 -7,-21 1,-2 Z" fill="#7A9E6A" opacity="0.3" />
              <path d="M 0,-3 Q 5,-28 18,-63" fill="none" stroke="#7A9E6A" strokeWidth="0.4" opacity="0.10" />
            </g>
            {/* Leaf 2 — medium, angled differently */}
            <g transform="translate(1320, 160) rotate(15)" opacity="0.16">
              <path d="M 0,0 C 6,-14 20,-42 13,-52 C 4,-42 -6,-14 0,0 Z" fill="#9DBF8E" />
              <path d="M 1,-1 C 7,-15 21,-43 14,-53 C 5,-43 -5,-15 1,-1 Z" fill="#7A9E6A" opacity="0.25" />
              <path d="M 0,-2 Q 4,-18 13,-48" fill="none" stroke="#7A9E6A" strokeWidth="0.3" opacity="0.09" />
            </g>
            {/* Leaf 3 — smaller, deeply angled */}
            <g transform="translate(1450, 200) rotate(-40)" opacity="0.22">
              <path d="M 0,0 C 5,-11 15,-34 10,-42 C 3,-34 -4,-11 0,0 Z" fill="#7A9E6A" />
              <path d="M 0,-2 Q 3,-14 10,-38" fill="none" stroke="#6F856E" strokeWidth="0.3" opacity="0.12" />
            </g>
            {/* Leaf 4 — medium-large, completing the cluster */}
            <g transform="translate(1280, 280) rotate(30)" opacity="0.18">
              <path d="M 0,0 C 7,-16 22,-48 15,-58 C 5,-48 -7,-16 0,0 Z" fill="#A8B89C" />
              <path d="M 1,-1 C 8,-17 23,-49 16,-59 C 6,-49 -6,-17 1,-1 Z" fill="#7A9E6A" opacity="0.2" />
              <path d="M 0,-2 Q 5,-20 15,-53" fill="none" stroke="#7A9E6A" strokeWidth="0.35" opacity="0.08" />
            </g>
          </g>

          {/* ─── UPPER-RIGHT FLOWER ─── */}
          <g transform="translate(1350, 240)" filter="url(#wc-soft)" opacity="0.15">
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <path key={i} d="M 0,0 C -3,-5 -2,-12 0,-14 C 2,-12 3,-5 0,0 Z"
                    fill="#D4A8B5" transform={`rotate(${angle})`} />
            ))}
            <circle r="2" fill="#C9A0A8" opacity="0.20" />
          </g>

          {/* ─── LOWER-LEFT LEAF CLUSTER (partially cropped) ─── */}
          <g filter="url(#wc-soft)">
            <g transform="translate(-10, 780) rotate(35)" opacity="0.18">
              <path d="M 0,0 C 7,-18 24,-50 16,-62 C 6,-50 -8,-18 0,0 Z" fill="#B5C4A8" />
              <path d="M 0,-2 Q 5,-22 16,-57" fill="none" stroke="#7A9E6A" strokeWidth="0.35" opacity="0.10" />
            </g>
            <g transform="translate(70, 850) rotate(-20)" opacity="0.20">
              <path d="M 0,0 C 6,-15 20,-44 13,-54 C 4,-44 -6,-15 0,0 Z" fill="#A8B89C" />
              <path d="M 1,-1 C 7,-16 21,-45 14,-55 C 5,-45 -5,-16 1,-1 Z" fill="#7A9E6A" opacity="0.2" />
              <path d="M 0,-2 Q 4,-18 13,-50" fill="none" stroke="#7A9E6A" strokeWidth="0.3" opacity="0.09" />
            </g>
            <g transform="translate(120, 910) rotate(50)" opacity="0.14">
              <path d="M 0,0 C 4,-10 14,-30 9,-38 C 3,-30 -4,-10 0,0 Z" fill="#9DBF8E" />
              <path d="M 0,-2 Q 3,-12 9,-34" fill="none" stroke="#7A9E6A" strokeWidth="0.3" opacity="0.11" />
            </g>
          </g>

          {/* ─── LOWER-LEFT FLOWER ─── */}
          <g transform="translate(80, 850)" filter="url(#wc-soft)" opacity="0.14">
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <path key={i} d="M 0,0 C -3,-5 -2,-12 0,-14 C 2,-12 3,-5 0,0 Z"
                    fill="#E0BFC8" transform={`rotate(${angle})`} />
            ))}
            <circle r="1.8" fill="#C9A0A8" opacity="0.18" />
          </g>

          {/* ─── FOLIAGE FRAGMENTS (scattered in negative space edges) ─── */}
          <g transform="translate(1500, 500) rotate(60)" opacity="0.12">
            <path d="M 0,0 C 3,-6 9,-20 6,-25 C 2,-20 -2,-6 0,0 Z" fill="#A8B89C" />
          </g>
          <g transform="translate(100, 400) rotate(-30)" opacity="0.16">
            <path d="M 0,0 C 2,-5 7,-16 5,-20 C 1,-16 -2,-5 0,0 Z" fill="#B5C4A8" />
          </g>
          <g transform="translate(1100, 700) rotate(45)" opacity="0.10">
            <path d="M 0,0 C 4,-8 12,-24 8,-30 C 3,-24 -3,-8 0,0 Z" fill="#9DBF8E" />
          </g>
          <g transform="translate(800, 100) rotate(-15)" opacity="0.14">
            <path d="M 0,0 C 2,-4 6,-14 4,-18 C 1,-14 -2,-4 0,0 Z" fill="#B5C4A8" />
          </g>
          <g transform="translate(1400, 650) rotate(70)" opacity="0.08">
            <path d="M 0,0 C 3,-5 8,-18 5,-22 C 2,-18 -2,-5 0,0 Z" fill="#A8B89C" />
          </g>

          {/* ─── POLLEN / SPORE DOTS ─── */}
          <g filter="url(#wc-dot)">
            <circle cx="1360" cy="120" r="2" fill="#D4C9A8" opacity="0.22" />
            <circle cx="1420" cy="260" r="1.5" fill="#C4B898" opacity="0.18" />
            <circle cx="1300" cy="300" r="2.5" fill="#D4C9A8" opacity="0.25" />
            <circle cx="1480" cy="170" r="1.8" fill="#C4B898" opacity="0.20" />
            <circle cx="1250" cy="220" r="2" fill="#D4C9A8" opacity="0.15" />
            <circle cx="60" cy="800" r="2" fill="#D4C9A8" opacity="0.22" />
            <circle cx="130" cy="880" r="2.5" fill="#C4B898" opacity="0.18" />
            <circle cx="20" cy="860" r="1.5" fill="#D4C9A8" opacity="0.20" />
          </g>
        </svg>
      </div>

      {/*
        ══════════════════════════════════════════════════════
        SINGLE BOTANICAL STEM COMPOSITION
        
        One continuous hand-drawn stem that enters from the
        lower-left, curves around the bottom of "Dhwani" and
        under "Sharma," crosses diagonally through the negative
        space between the name and the intro paragraph, then
        disappears softly toward the upper-right.
        
        5 asymmetrical watercolor leaves alternate along
        the stem, each rotated to follow the stem's direction.
        
        The stem never crosses through text — it weaves between
        the typography elements, guiding the eye from the title
        toward the body copy.
        
        z-index 1 (behind typography at z-index 2).
        ══════════════════════════════════════════════════════
      */}
      <div className="hero-botanical-stem" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}>
        <svg
          viewBox="0 0 1600 1000"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', filter: 'url(#painterly)' }}
        >
          {/* 
            Main stem path.
            
            The curve is designed around the hero typography layout:
              "Dhwani"  ≈ x:128, y:280–400  (left:8%, top:28%, ~8rem)
              "Sharma"  ≈ x:256, y:400–510  (indented 8vw, ~7rem)
              Intro     ≈ x:832, y:600      (left:52%, top:60%)
              CTA       ≈ x:128, y:780      (left:8%, top:78%)
            
            The stem stays LEFT of the name while rising (x < 128),
            curves around the bottom-left of "D" (approaching y≈400),
            passes BELOW "Sharma" baseline (y > 510), crosses through
            the diagonal gap, and exits toward the upper-right.
          */}
          <path
            d="M -50,970
               C -10,890 25,790 45,700
               C 60,620 65,530 75,440
               C 82,390 135,520 250,555
               C 370,580 500,560 620,520
               C 760,465 930,350 1100,235
               C 1260,125 1440,30 1660,-30"
            fill="none"
            stroke="#788F76"
            strokeWidth="1.2"
            opacity="0.22"
            strokeLinecap="round"
          />

          {/* 
            5 Leaves — alternating sides of the stem.
            Each uses a unique asymmetric shape and distinct rotation.
            Positions chosen to avoid all text bounding boxes.
          */}

          {/* Leaf 1 — lower stem, left side, angled outward-left.
              Position (48, 680): left margin, above CTA, no text. */}
          <HeroLeaf x={48} y={680} rotation={-75} shapeIndex={0} scale={0.85} />

          {/* Leaf 2 — near the "D" curve, right side, angled up-right.
              Position (80, 450): left of name (x<128), below D (y>400). */}
          <HeroLeaf x={80} y={450} rotation={45} shapeIndex={1} scale={1.0} />

          {/* Leaf 3 — under Sharma, left side, angled down-left. Largest leaf.
              Position (300, 565): below name baseline (y>510), left of intro. */}
          <HeroLeaf x={300} y={565} rotation={-42} shapeIndex={2} scale={1.15} />

          {/* Leaf 4 — diagonal gap, right side, angled up-right.
              Position (650, 510): right of name (x>536), above intro (y<600). */}
          <HeroLeaf x={650} y={510} rotation={58} shapeIndex={3} scale={0.92} />

          {/* Leaf 5 — upper-right sweep, left side, angled up-left. Smallest.
              Position (1000, 290): open space, no text. */}
          <HeroLeaf x={1000} y={290} rotation={-28} shapeIndex={4} scale={0.75} />

        </svg>
      </div>

      {/* Editorial Typography Canvas (zIndex 2 — visual focus, above stem) */}
      <div className="container" style={{
        position: 'relative',
        height: '100%',
        minHeight: '80vh',
        zIndex: 2
      }}>
        
        {/* Eyebrow index (Top-Left quadrant) */}
        <div className="hero-eyebrow" style={{
          position: 'absolute',
          left: '8%',
          top: '10%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          lineHeight: '2.2'
        }}>
          <span className="tag-meta">Creative Technologist</span>
          <span className="tag-meta">UI/UX Designer</span>
          <span className="tag-meta">Computer Science</span>
        </div>

        {/* Stepped Name Composition with weight contrast */}
        <div className="hero-name-block" style={{
          position: 'absolute',
          left: '8%',
          top: '28%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 9vw, 8rem)',
            fontWeight: '600',
            color: 'var(--forest)',
            lineHeight: '0.9',
            letterSpacing: '0.01em'
          }}>
            Dhwani
          </span>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
            fontWeight: '300',
            color: 'var(--forest)',
            lineHeight: '0.9',
            paddingLeft: '8vw',
            marginTop: '4px'
          }}>
            Sharma
          </span>
        </div>

        {/* Detached introduction paragraph (Lower-Right quadrant) */}
        <div className="hero-intro-block" style={{
          position: 'absolute',
          left: '52%',
          top: '60%',
          maxWidth: '420px'
        }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.05rem',
            lineHeight: '1.75',
            color: 'var(--ink)',
            fontWeight: '300'
          }}>
            I design and build at the intersection of software systems, human-centered design, and creative technology. 
            Currently studying Computer Science at SRM IST (KTR) with a 9.13 GPA &mdash; balancing software engineering, corporate leadership, and a lifelong passion for space exploration and art.
          </p>
        </div>

        {/* CTA links (Lower-Left area) */}
        <div className="hero-cta-block" style={{
          position: 'absolute',
          left: '8%',
          top: '78%',
          display: 'flex',
          gap: '2.5rem'
        }}>
          <a href="#projects" onClick={handleScrollToProjects} className="link-grow" style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            fontWeight: '500',
            color: 'var(--moss)'
          }}>
            View Projects &rarr;
          </a>
          <a href="/Dhwani_Sharma_Resume.pdf" download="Dhwani_Sharma_Resume.pdf" className="link-grow" style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            fontWeight: '500',
            color: 'var(--ink-light)'
          }}>
            Download CV &darr;
          </a>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ripple-expand {
          0% { transform: scale(0); opacity: 0.25; }
          100% { transform: scale(3.5); opacity: 0; }
        }

        @keyframes stem-breathe {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(2px, -3px) rotate(0.4deg); }
          66% { transform: translate(-1px, 2px) rotate(-0.3deg); }
        }

        .hero-botanical-stem {
          animation: stem-breathe 30s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-botanical-stem {
            animation: none !important;
          }
        }

        @media (max-width: 1024px) {
          .hero-name-block span:last-child {
            padding-left: 4vw !important;
          }
          .hero-intro-block {
            left: 48% !important;
            top: 58% !important;
          }
        }

        @media (max-width: 768px) {
          #hero {
            display: block !important;
            padding: 100px 0 60px 0 !important;
            min-height: auto !important;
          }
          #hero > .container {
            position: static !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 2rem !important;
            min-height: auto !important;
          }
          .hero-eyebrow, .hero-name-block, .hero-intro-block, .hero-cta-block {
            position: static !important;
            max-width: 100% !important;
            transform: none !important;
          }
          .hero-name-block span:last-child {
            padding-left: 1.5rem !important;
          }
          .cursor-ripple {
            display: none !important;
          }
          .hero-botanical-stem {
            display: none !important;
          }
        }
      `}} />
    </section>
  );
};

export default Hero;
