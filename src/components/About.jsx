import React from 'react';

const About = () => {
  return (
    <section id="about" className="section reveal">
      {/* Background Watercolor Wash */}
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-10%',
        width: '50vw',
        height: '50vw',
        background: 'radial-gradient(circle, rgba(107, 127, 94, 0.05) 0%, transparent 60%)',
        filter: 'blur(30px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '700px', textAlign: 'left' }}>
          {/* Section label */}
          <div className="section-label">About</div>

          {/* Heading with selective italic */}
          <h2 className="section-heading">
            Where technology meets the <em>organic</em> world
          </h2>

          {/* Body Bio Text */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              lineHeight: '1.75',
              color: 'var(--ink)',
              fontWeight: '400'
            }}>
              I'm a Computer Science undergraduate at SRM IST (KTR) working across UI/UX design, computer vision, AI systems, and interactive visualisation. My approach treats interfaces as living environments &mdash; data-dense but intuitive, technically rigorous but visually expressive. 
            </p>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              lineHeight: '1.75',
              color: 'var(--ink)',
              fontWeight: '400'
            }}>
              I've designed AI-powered urban safety platforms, built full-stack event systems, created supply-chain intelligence dashboards, and experimented with real-time computer vision using TouchDesigner and MediaPipe.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
