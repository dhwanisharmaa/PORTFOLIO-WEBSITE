import React from 'react';

/*
 * Multi-layered watercolor leaf — 3 translucent SVG layers + vein.
 * Each leaf is a pointed ovoid drawn from the base point at (0,0).
 */
const Leaf = ({ x, y, rotation = 0, scale = 1, mirror = false }) => (
  <g transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${mirror ? -scale : scale}, ${scale})`}>
    {/* Base moss pigment layer */}
    <path d="M 0,0 C 4,-18 16,-48 8,-56 C 0,-48 -10,-18 0,0 Z"
          fill="var(--moss)" opacity="0.14" />
    {/* Offset olive wet-on-wet layer */}
    <path d="M 1,-1 C 5,-19 17,-49 9,-57 C 1,-49 -9,-19 1,-1 Z"
          fill="var(--olive)" opacity="0.09" />
    {/* Central vein stroke */}
    <path d="M 0,-1 Q 3,-22 8,-53"
          fill="none" stroke="var(--olive)" strokeWidth="0.5" opacity="0.18" />
  </g>
);

/*
 * Lotus bloom — seven overlapping petals with golden center.
 * Alternating lotus/rose colors with slight angular irregularity.
 */
const Bloom = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {[0, 51, 103, 154, 206, 257, 309].map((angle, i) => (
      <path key={i}
        d="M 0,0 C -4,-7 -3,-16 0,-20 C 3,-16 4,-7 0,0 Z"
        fill={i % 2 === 0 ? 'var(--lotus)' : 'var(--rose-faded)'}
        opacity={0.10 + (i % 3) * 0.02}
        transform={`rotate(${angle + (i % 2) * 5})`}
      />
    ))}
    <circle r="3" fill="var(--marigold)" opacity="0.15" />
  </g>
);

const BotanicalBackdrop = () => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden'
    }}>

      {/*
        ═══════════════════════════════════════════════════════════════
        STRUCTURAL LEFT-EDGE VINE
        Continuous wobbly path running down the left margin.
        Acts as a thin vertical thread connecting all sections.
        ═══════════════════════════════════════════════════════════════
      */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 'clamp(20px, 8vw, 120px)',
        width: '80px',
        height: '100%',
        zIndex: 1
      }}>
        <svg viewBox="0 0 80 3200" preserveAspectRatio="none"
             style={{ width: '100%', height: '100%', filter: 'url(#painterly)' }}>
          <path
            d="M 40,0
               Q 20,100 45,200
               T 25,400 T 55,600 T 20,800
               T 48,1000 T 28,1200 T 53,1400
               T 22,1600 T 48,1800 T 27,2000
               T 54,2200 T 23,2400 T 48,2600
               T 28,2800 T 53,3000 T 32,3200"
            fill="none" stroke="#B5C4A8" strokeWidth="1.3" opacity="0.18"
            strokeLinecap="round" strokeLinejoin="round"
          />
          <circle cx="35" cy="180" r="5" fill="var(--lotus)" opacity="0.35" />
          <circle cx="45" cy="580" r="7" fill="var(--lotus)" opacity="0.35" />
          <circle cx="26" cy="990" r="4" fill="var(--marigold)" opacity="0.35" />
          <circle cx="51" cy="1420" r="8" fill="var(--lotus)" opacity="0.35" />
          <circle cx="30" cy="1980" r="5" fill="var(--lotus)" opacity="0.35" />
          <circle cx="24" cy="2390" r="6" fill="var(--rose-faded)" opacity="0.35" />
          <circle cx="49" cy="2780" r="5" fill="var(--lotus)" opacity="0.35" />
          <circle cx="34" cy="3120" r="7" fill="var(--marigold)" opacity="0.35" />

          {/* Tiny leaves attached to the vine for organic cohesion */}
          <g transform="translate(50, 600) rotate(35)" opacity="0.20">
            <path d="M 0,0 C 2,-5 8,-16 5,-20 C 2,-16 -2,-5 0,0 Z" fill="#B5C4A8" />
            <path d="M 0,-1 Q 1,-8 5,-18" fill="none" stroke="#7A9E6A" strokeWidth="0.3" opacity="0.12" />
          </g>
          <g transform="translate(48, 1400) rotate(-30)" opacity="0.18">
            <path d="M 0,0 C 3,-6 10,-18 7,-22 C 3,-18 -2,-6 0,0 Z" fill="#A8B89C" />
            <path d="M 0,-1 Q 2,-8 7,-20" fill="none" stroke="#7A9E6A" strokeWidth="0.3" opacity="0.10" />
          </g>
          <g transform="translate(52, 2600) rotate(45)" opacity="0.16">
            <path d="M 0,0 C 2,-5 7,-15 5,-19 C 2,-15 -1,-5 0,0 Z" fill="#B5C4A8" />
            <path d="M 0,-1 Q 1,-6 5,-17" fill="none" stroke="#7A9E6A" strokeWidth="0.3" opacity="0.11" />
          </g>
        </svg>
      </div>

      {/*
        ═══════════════════════════════════════════════════════════════
        THE GREAT VINE — Primary right-side flowing composition.
        
        A single continuous stem enters from the upper-right and flows 
        in S-curves through the full page. Leaf clusters branch at each
        section transition, and lotus blooms mark three key positions.
        
        This is the primary botanical thread that weaves through
        the layout, occupying the right-side negative space and
        guiding the eye from About → Skills → Projects → Experience.
        ═══════════════════════════════════════════════════════════════
      */}
      <div className="botanical-drift-1" style={{
        position: 'absolute',
        top: '80vh',
        right: '-3vw',
        width: '55vw',
        height: '420vh',
        zIndex: 1
      }}>
        <svg viewBox="0 0 700 4200" preserveAspectRatio="none"
             style={{ width: '100%', height: '100%', filter: 'url(#painterly)' }}>

          <defs>
            <filter id="bd-wc-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
            </filter>
          </defs>

          {/* ─── Primary flowing stem ─── */}
          <path
            d="M 680,-40
               C 550,200 200,450 170,700
               C 140,950 420,1100 530,1350
               C 640,1600 200,1850 180,2100
               C 160,2350 450,2550 560,2800
               C 630,2950 280,3200 300,3450
               C 320,3700 550,3900 630,4250"
            fill="none"
            stroke="#B5C4A8"
            strokeWidth="1.8"
            opacity="0.16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* ─── Secondary branches at inflection points ─── */}

          {/* Branch at y≈700 — reaches left toward content */}
          <path d="M 170,700 C 110,650 40,640 -30,660"
                fill="none" stroke="#A8B89C" strokeWidth="0.9" opacity="0.13" strokeLinecap="round" />
          <path d="M 170,700 C 140,760 100,800 60,810"
                fill="none" stroke="#A8B89C" strokeWidth="0.7" opacity="0.10" strokeLinecap="round" />

          {/* Branch at y≈1350 — reaches right off-screen */}
          <path d="M 530,1350 C 580,1300 620,1280 720,1290"
                fill="none" stroke="#A8B89C" strokeWidth="0.9" opacity="0.13" strokeLinecap="round" />

          {/* Branch at y≈2100 — reaches left */}
          <path d="M 180,2100 C 120,2050 50,2040 -20,2060"
                fill="none" stroke="#A8B89C" strokeWidth="0.9" opacity="0.13" strokeLinecap="round" />
          <path d="M 180,2100 C 150,2160 110,2200 70,2210"
                fill="none" stroke="#A8B89C" strokeWidth="0.7" opacity="0.10" strokeLinecap="round" />

          {/* Branch at y≈2800 — reaches right off-screen */}
          <path d="M 560,2800 C 600,2750 640,2730 720,2750"
                fill="none" stroke="#A8B89C" strokeWidth="0.9" opacity="0.13" strokeLinecap="round" />

          {/* Branch at y≈3450 — reaches left */}
          <path d="M 300,3450 C 240,3400 170,3390 100,3420"
                fill="none" stroke="#A8B89C" strokeWidth="0.9" opacity="0.13" strokeLinecap="round" />

          {/* ─── Leaf clusters at branch points ─── */}

          {/* About section (y≈700) — 4 leaves fanning from left branch */}
          <Leaf x={140} y={670} rotation={-40} scale={1.1} />
          <Leaf x={90} y={640} rotation={-65} scale={0.85} mirror />
          <Leaf x={160} y={740} rotation={-15} scale={0.75} />
          <Leaf x={70} y={790} rotation={-50} scale={0.7} />

          {/* Skills section (y≈1350) — 3 leaves from right branch */}
          <Leaf x={560} y={1310} rotation={35} scale={1.0} mirror />
          <Leaf x={600} y={1280} rotation={55} scale={0.8} />
          <Leaf x={540} y={1380} rotation={15} scale={0.7} mirror />

          {/* Projects section (y≈2100) — 3 leaves from left branch */}
          <Leaf x={150} y={2060} rotation={-45} scale={1.05} />
          <Leaf x={100} y={2040} rotation={-70} scale={0.9} mirror />
          <Leaf x={80} y={2190} rotation={-35} scale={0.7} />

          {/* Experience section (y≈2800) — 2 leaves from right branch */}
          <Leaf x={590} y={2760} rotation={30} scale={0.95} mirror />
          <Leaf x={620} y={2730} rotation={50} scale={0.75} />

          {/* Contact section (y≈3450) — 3 leaves from left branch */}
          <Leaf x={270} y={3410} rotation={-35} scale={1.0} />
          <Leaf x={220} y={3390} rotation={-60} scale={0.8} mirror />
          <Leaf x={120} y={3420} rotation={-45} scale={0.65} />

          {/* Solitary leaves along the main stem (between clusters) */}
          <Leaf x={350} y={400} rotation={-10} scale={0.55} />
          <Leaf x={380} y={1750} rotation={25} scale={0.6} mirror />
          <Leaf x={420} y={3150} rotation={-20} scale={0.5} />

          {/* ─── Lotus blooms at three key positions ─── */}
          <Bloom x={130} y={710} scale={1.3} />
          <Bloom x={170} y={2110} scale={1.1} />
          <Bloom x={300} y={3460} scale={1.0} />

          {/* ─── Watercolor flowers along the vine ─── */}
          <g transform="translate(500, 1000)" filter="url(#bd-wc-soft)" opacity="0.14">
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <path key={i} d="M 0,0 C -3,-5 -2,-12 0,-14 C 2,-12 3,-5 0,0 Z"
                    fill="#D4A8B5" transform={`rotate(${angle})`} />
            ))}
            <circle r="2" fill="#C9A0A8" opacity="0.20" />
          </g>
          <g transform="translate(200, 1800)" filter="url(#bd-wc-soft)" opacity="0.12">
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <path key={i} d="M 0,0 C -3,-5 -2,-12 0,-14 C 2,-12 3,-5 0,0 Z"
                    fill="#E0BFC8" transform={`rotate(${angle})`} />
            ))}
            <circle r="2" fill="#C9A0A8" opacity="0.18" />
          </g>
          <g transform="translate(550, 3000)" filter="url(#bd-wc-soft)" opacity="0.16">
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <path key={i} d="M 0,0 C -3,-5 -2,-12 0,-14 C 2,-12 3,-5 0,0 Z"
                    fill="#C9A0A8" transform={`rotate(${angle})`} />
            ))}
            <circle r="2" fill="#C9A0A8" opacity="0.20" />
          </g>

          {/* ─── Pollen dots near flowers and leaf clusters ─── */}
          <circle cx="510" cy="990" r="2" fill="#D4C9A8" opacity="0.22" />
          <circle cx="490" cy="1020" r="1.5" fill="#C4B898" opacity="0.18" />
          <circle cx="120" cy="680" r="2" fill="#D4C9A8" opacity="0.20" />
          <circle cx="155" cy="720" r="1.8" fill="#C4B898" opacity="0.24" />
          <circle cx="540" cy="2990" r="2.5" fill="#D4C9A8" opacity="0.18" />
          <circle cx="565" cy="3020" r="1.5" fill="#C4B898" opacity="0.22" />

        </svg>
      </div>

      {/*
        ═══════════════════════════════════════════════════════════════
        THE TENDRIL — Secondary left-side delicate branch.
        
        A shorter, thinner composition that enters from the left edge
        at the Projects section and flows through Experience → Contact.
        Mirrors the Great Vine's rhythm on the opposite side, preventing 
        the left half of the page from feeling empty.
        ═══════════════════════════════════════════════════════════════
      */}
      <div className="botanical-drift-3" style={{
        position: 'absolute',
        top: '280vh',
        left: '-2vw',
        width: '40vw',
        height: '200vh',
        zIndex: 1
      }}>
        <svg viewBox="0 0 500 2000" preserveAspectRatio="none"
             style={{ width: '100%', height: '100%', filter: 'url(#painterly)' }}>

          {/* Delicate stem — enters from left */}
          <path
            d="M -30,100
               C 80,250 280,400 300,600
               C 320,800 150,1000 120,1200
               C 90,1400 250,1600 350,1800
               L 400,2050"
            fill="none"
            stroke="#B5C4A8"
            strokeWidth="1.2"
            opacity="0.14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Branches */}
          <path d="M 300,600 C 350,560 400,540 520,550"
                fill="none" stroke="#A8B89C" strokeWidth="0.7" opacity="0.12" strokeLinecap="round" />
          <path d="M 120,1200 C 60,1160 20,1150 -40,1170"
                fill="none" stroke="#A8B89C" strokeWidth="0.7" opacity="0.12" strokeLinecap="round" />
          <path d="M 350,1800 C 390,1760 430,1740 520,1760"
                fill="none" stroke="#A8B89C" strokeWidth="0.6" opacity="0.10" strokeLinecap="round" />

          {/* Leaf cluster at y≈600 */}
          <Leaf x={330} y={570} rotation={35} scale={0.9} mirror />
          <Leaf x={380} y={540} rotation={55} scale={0.7} />
          <Leaf x={310} y={640} rotation={15} scale={0.65} mirror />

          {/* Leaf cluster at y≈1200 */}
          <Leaf x={90} y={1170} rotation={-45} scale={0.85} />
          <Leaf x={40} y={1150} rotation={-65} scale={0.7} mirror />

          {/* Leaf cluster at y≈1800 */}
          <Leaf x={380} y={1770} rotation={30} scale={0.8} mirror />
          <Leaf x={410} y={1740} rotation={50} scale={0.6} />

          {/* Solitary leaf */}
          <Leaf x={200} y={900} rotation={-20} scale={0.5} />

          {/* Bloom */}
          <Bloom x={300} y={610} scale={1.0} />

          {/* Watercolor flower in the Tendril */}
          <g transform="translate(250, 1400)" opacity="0.13">
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <path key={i} d="M 0,0 C -3,-5 -2,-12 0,-14 C 2,-12 3,-5 0,0 Z"
                    fill="#D4A8B5" transform={`rotate(${angle})`} />
            ))}
            <circle r="2" fill="#C9A0A8" opacity="0.20" />
          </g>

          {/* Pollen dots */}
          <circle cx="260" cy="1390" r="1.8" fill="#D4C9A8" opacity="0.20" />
          <circle cx="240" cy="1420" r="1.5" fill="#C4B898" opacity="0.18" />

        </svg>
      </div>

    </div>
  );
};

export default BotanicalBackdrop;
