import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const svgRef = useRef(null);
  const potRef = useRef(null);
  const potShadowRef = useRef(null);
  const trunkRef = useRef(null);
  
  const branchRefs = useRef([]);
  const leafRefs = useRef([]);
  const textRefs = useRef([]);
  const pollenRefs = useRef([]);

  // 14 Skills branching segments with wobbly curves, branching naturally
  const branches = [
    {
      id: 'python',
      name: 'Python',
      path: 'M 250,500 C 220,495 195,490 175,475',
      angle: -150,
      leafX: 175,
      leafY: 475,
      leafW: 68,
      leafH: 34
    },
    {
      id: 'linux',
      name: 'Linux',
      path: 'M 250,490 C 280,485 305,480 325,475',
      angle: -30,
      leafX: 325,
      leafY: 475,
      leafW: 55,
      leafH: 26
    },
    {
      id: 'git',
      name: 'Git',
      path: 'M 250,460 C 220,450 190,435 160,415',
      angle: -145,
      leafX: 160,
      leafY: 415,
      leafW: 55,
      leafH: 26
    },
    {
      id: 'js',
      name: 'JavaScript',
      path: 'M 250,450 C 280,440 315,425 345,415',
      angle: -35,
      leafX: 345,
      leafY: 415,
      leafW: 75,
      leafH: 35
    },
    {
      id: 'mediapipe',
      name: 'MediaPipe',
      path: 'M 250,410 C 210,400 175,375 145,355',
      angle: -155,
      leafX: 145,
      leafY: 355,
      leafW: 82,
      leafH: 34
    },
    {
      id: 'css',
      name: 'CSS',
      path: 'M 250,400 C 290,390 325,375 355,355',
      angle: -25,
      leafX: 355,
      leafY: 355,
      leafW: 55,
      leafH: 28
    },
    {
      id: 'figma',
      name: 'Figma',
      path: 'M 250,350 C 210,335 180,310 160,285',
      angle: -140,
      leafX: 160,
      leafY: 285,
      leafW: 65,
      leafH: 30
    },
    {
      id: 'html',
      name: 'HTML',
      path: 'M 250,340 C 280,325 315,305 345,285',
      angle: -40,
      leafX: 345,
      leafY: 285,
      leafW: 60,
      leafH: 30
    },
    {
      id: 'touch',
      name: 'TouchDesigner',
      path: 'M 250,260 C 220,252 195,248 175,248',
      angle: -155,
      leafX: 175,
      leafY: 248,
      leafW: 94,
      leafH: 36
    },
    {
      id: 'java',
      name: 'Java',
      path: 'M 250,260 C 280,250 305,235 325,225',
      angle: -50,
      leafX: 325,
      leafY: 225,
      leafW: 60,
      leafH: 30
    },
    {
      id: 'cpp',
      name: 'C++',
      path: 'M 250,220 C 210,190 190,165 170,145',
      angle: -135,
      leafX: 170,
      leafY: 145,
      leafW: 60,
      leafH: 30
    },
    {
      id: 'opencv',
      name: 'OpenCV',
      path: 'M 250,220 C 290,190 310,165 330,145',
      angle: -45,
      leafX: 330,
      leafY: 145,
      leafW: 75,
      leafH: 32
    },
    {
      id: 'vscode',
      name: 'VS Code',
      path: 'M 250,180 C 235,145 225,95 220,45',
      angle: -100,
      leafX: 220,
      leafY: 45,
      leafW: 70,
      leafH: 30
    },
    {
      id: 'uiux',
      name: 'UI/UX',
      path: 'M 250,180 C 265,145 275,95 280,45',
      angle: -80,
      leafX: 280,
      leafY: 45,
      leafW: 60,
      leafH: 28
    }
  ];

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Immediately set all visual elements to their completed states
      gsap.set(potRef.current, { opacity: 1 });
      gsap.set(potShadowRef.current, { opacity: 0.15 });
      gsap.set(trunkRef.current, { strokeDashoffset: 0 });
      
      branchRefs.current.forEach((b) => {
        if (b) gsap.set(b, { strokeDashoffset: 0 });
      });
      leafRefs.current.forEach((l) => {
        if (l) gsap.set(l, { scale: 1, rotation: 0 });
      });
      textRefs.current.forEach((t) => {
        if (t) gsap.set(t, { opacity: 1 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Initialize SVG path lengths
      const trunk = trunkRef.current;
      const trunkLen = trunk.getTotalLength();
      gsap.set(trunk, { strokeDasharray: trunkLen, strokeDashoffset: trunkLen });

      branchRefs.current.forEach((b) => {
        if (b) {
          const len = b.getTotalLength();
          gsap.set(b, { strokeDasharray: len, strokeDashoffset: len });
        }
      });

      // Initialize leaves and texts
      leafRefs.current.forEach((l) => {
        if (l) gsap.set(l, { scale: 0, rotation: -25, transformOrigin: "bottom center" });
      });
      textRefs.current.forEach((t) => {
        if (t) gsap.set(t, { opacity: 0 });
      });

      // Initialize Pot and Shadows
      gsap.set(potRef.current, { opacity: 0 });
      gsap.set(potShadowRef.current, { opacity: 0 });
      
      // Initialize Pollen Particles
      pollenRefs.current.forEach((p) => {
        if (p) gsap.set(p, { opacity: 0.6, y: 0 });
      });

      // Master Pinning & Animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: pinRef.current,
          anticipatePin: 1
        }
      });

      // STAGE 1: Pot and soil fade in
      tl.to(potRef.current, { opacity: 1, duration: 0.6, ease: "power1.out" });
      tl.to(potShadowRef.current, { opacity: 0.15, duration: 0.6, ease: "power1.out" }, "<");

      // STAGE 2: Central Trunk grows
      tl.to(trunk, { strokeDashoffset: 0, duration: 1.8, ease: "power1.inOut" });

      // STAGE 3 & 4: Stems grow -> Leaves bloom -> Texts fade in sequentially
      branches.forEach((b, idx) => {
        const branchEl = branchRefs.current[idx];
        const leafEl = leafRefs.current[idx];
        const textEl = textRefs.current[idx];

        if (branchEl && leafEl && textEl) {
          // Grow Branch (overlapping starts)
          tl.to(branchEl, { strokeDashoffset: 0, duration: 0.8, ease: "power1.inOut" }, "-=0.3");
          
          // Bloom leaf from tip
          tl.to(leafEl, { 
            scale: 1, 
            rotation: 0, 
            duration: 0.5, 
            ease: "power2.out" 
          }, "-=0.1");

          // Skill text fades inside leaf
          tl.to(textEl, { 
            opacity: 1, 
            duration: 0.35, 
            ease: "power1.out" 
          });
        }
      });

      // FINAL STAGE: Subtle plant settling & falling pollen
      tl.to(svgRef.current, { rotation: 0.5, duration: 0.4, ease: "sine.inOut" });
      tl.to(svgRef.current, { rotation: 0, duration: 0.6, ease: "sine.inOut" });

      // Pollen drifts down and fades away
      pollenRefs.current.forEach((p) => {
        if (p) {
          tl.to(p, { 
            y: "+=16", 
            opacity: 0, 
            duration: 0.8, 
            ease: "power1.out" 
          }, "<");
        }
      });

      // Unpin buffer
      tl.to({}, { duration: 0.5 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div 
      id="skills"
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '250vh', // Pin runway
        background: 'var(--parchment)',
        overflow: 'visible'
      }}
    >
      <div 
        ref={pinRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Soft watercolor wash */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '75vh',
          height: '75vh',
          background: 'radial-gradient(circle, rgba(101, 121, 90, 0.07) 0%, transparent 75%)',
          filter: 'blur(45px)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        {/* Sticky Editorial Header */}
        <div className="container" style={{ position: 'absolute', top: '8vh', left: 0, right: 0, zIndex: 5, pointerEvents: 'none' }}>
          <div className="section-label" style={{ margin: 0 }}>Skills</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', margin: '8px 0 0 0' }}>
            Tools, languages, and <em>systems</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--ink-light)', marginTop: '4px', maxWidth: '320px' }}>
            A garden of tools and technologies I work with to design, build, and experiment.
          </p>
        </div>

        {/* Interactive Botanical SVG Specimen */}
        <svg 
          ref={svgRef}
          viewBox="0 0 500 640" 
          style={{
            width: '90%',
            height: '75vh',
            maxWidth: '540px',
            zIndex: 2,
            filter: 'url(#painterly)',
            transform: 'translateY(35px)'
          }}
        >
          <defs>
            {/* Rich multi-layered watercolor leaf gradient */}
            <linearGradient id="leaf-watercolor" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--moss)" stopOpacity="0.8" />
              <stop offset="60%" stopColor="var(--olive)" stopOpacity="0.75" />
              <stop offset="100%" stopColor="var(--lotus)" stopOpacity="0.85" />
            </linearGradient>

            {/* Clay texture gradient for pot */}
            <linearGradient id="pot-clay" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--parchment-deep)" />
              <stop offset="100%" stopColor="#C4B8A6" />
            </linearGradient>

            {/* Shadow under pot */}
            <radialGradient id="pot-shadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--forest)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--forest)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. Ceramic Pot & Shadows */}
          <g ref={potRef}>
            {/* Shadow on parchment */}
            <ellipse ref={potShadowRef} cx="250" cy="592" rx="42" ry="6" fill="url(#pot-shadow)" />

            {/* Ceramic pot body */}
            <path
              d="M 215,530 L 285,530 L 280,555 C 280,580 270,590 250,590 C 230,590 220,580 220,555 Z"
              fill="url(#pot-clay)"
              stroke="var(--olive)"
              strokeWidth="0.8"
              strokeOpacity="0.5"
            />
            {/* soil layers */}
            <ellipse cx="250" cy="530" rx="34" ry="5" fill="var(--moss)" opacity="0.35" />
            
            {/* soil watercolor blooms */}
            <circle cx="232" cy="533" r="2.5" fill="var(--lotus)" opacity="0.4" />
            <circle cx="266" cy="532" r="2.2" fill="var(--marigold)" opacity="0.45" />

            {/* Clay surface glaze spots */}
            <path d="M 222,545 Q 235,565 230,582 Q 222,565 222,545 Z" fill="var(--moss)" opacity="0.08" />
            <path d="M 278,542 Q 268,565 272,580 Q 278,560 278,542 Z" fill="var(--olive)" opacity="0.06" />
          </g>

          {/* 2. Central Trunk Line */}
          <path
            ref={trunkRef}
            d="M 250,530 C 248,460 253,380 250,290 C 247,240 253,210 250,180"
            fill="none"
            stroke="var(--olive)"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* 3. Stems, Leaves & Skills Labels */}
          {branches.map((b, idx) => {
            const angleRad = (b.angle * Math.PI) / 180;
            // Center label placement along the leaf axis (~22px out)
            const textX = b.leafX + Math.cos(angleRad) * 22;
            const textY = b.leafY + Math.sin(angleRad) * 22;

            return (
              <g key={b.id}>
                {/* Branch Stem path */}
                <path
                  ref={el => branchRefs.current[idx] = el}
                  d={b.path}
                  fill="none"
                  stroke="var(--olive)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                {/* Leaf Bloom */}
                <g 
                  ref={el => leafRefs.current[idx] = el}
                  transform={`translate(${b.leafX}, ${b.leafY}) rotate(${b.angle})`}
                  style={{ transformOrigin: '0 0' }}
                >
                  {/* Layered watercolor leaf paths */}
                  {/* Base Moss */}
                  <path d="M 0,0 C -15,-8 -22,-20 0,-34 C 22,-20 15,-8 0,0 Z" fill="var(--moss)" opacity="0.16" />
                  {/* Offset Olive */}
                  <path d="M 0,0 C -13,-9 -20,-22 2,-32 C 20,-22 13,-9 0,0 Z" fill="var(--olive)" opacity="0.12" transform="translate(1, -1)" />
                  {/* Rose faded tint */}
                  <path d="M 0,0 C -17,-7 -25,-18 -2,-36 C 25,-18 17,-7 0,0 Z" fill="var(--rose-faded)" opacity="0.08" transform="translate(-1, 1)" />
                  {/* Stem central vein outline */}
                  <path d="M 0,0 C -15,-8 -22,-20 0,-34 C 22,-20 15,-8 0,0 Z" fill="none" stroke="var(--olive)" strokeWidth="0.4" opacity="0.3" />
                </g>

                {/* Skill horizontal label */}
                <text
                  ref={el => textRefs.current[idx] = el}
                  x={textX}
                  y={textY + 3}
                  textAnchor="middle"
                  fill="var(--forest)"
                  fontFamily="var(--font-sans)"
                  fontSize="9px"
                  fontWeight="600"
                  style={{ letterSpacing: '0.02em' }}
                >
                  {b.name}
                </text>
              </g>
            );
          })}

          {/* 4. Pollen particles (fall on Stage 5) */}
          <circle ref={el => pollenRefs.current[0] = el} cx="230" cy="510" r="2" fill="var(--lotus)" />
          <circle ref={el => pollenRefs.current[1] = el} cx="270" cy="515" r="2.5" fill="var(--marigold)" />
          <circle ref={el => pollenRefs.current[2] = el} cx="210" cy="535" r="1.5" fill="var(--rose-faded)" />
          <circle ref={el => pollenRefs.current[3] = el} cx="285" cy="540" r="2" fill="var(--marigold)" />
        </svg>

        {/* Botanical Specimen label caption */}
        <div style={{
          position: 'absolute',
          bottom: '8vh',
          right: '8vw',
          textAlign: 'right',
          maxWidth: '220px',
          fontFamily: 'var(--font-display)',
          fontSize: '0.85rem',
          color: 'var(--ink-light)',
          fontStyle: 'italic',
          lineHeight: '1.4',
          pointerEvents: 'none'
        }}>
          Fig. 1.2 — Pinned Specimen of technical evolution. Scroll controls cultivation.
        </div>
      </div>
    </div>
  );
};

export default Skills;
