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
              I'm a Computer Science undergraduate at SRM IST (KTR) working across software development, UI/UX design, and interactive technologies. Beyond code, I have a deep fascination with the cosmos—leading me to secure World Rank 6 in the International Space Olympiad 2023. This blend of technical rigor and cosmic curiosity shapes how I view design: structured, expansive, and always exploring.
            </p>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              lineHeight: '1.75',
              color: 'var(--ink)',
              fontWeight: '400'
            }}>
              Whether designing AI-driven urban safety platforms like CitySafe, leading corporate operations for Coding Ninjas 10x SRM, or chairing ECOSOC committees at MUN conferences, I thrive in environments that challenge my problem-solving and leadership skills. When I'm not coding or stargazing, you'll find me immersed in painting and digital art—bringing creative imagination to life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
