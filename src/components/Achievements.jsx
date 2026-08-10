import React from 'react';

const Achievements = () => {
  const honorsList = [
    { text: 'Model United Nations &mdash; Best Delegate (WHO Committee) &amp; ECOSOC Co-Chair' },
    { text: 'NUS Leadership in Business Analytics &mdash; Distinction (Jan 2025)' },
    { text: 'TechXcelerate 2025 &mdash; Penultimate Round, BITS Pilani Hyderabad' },
    { text: 'Google Cloud Agentic AI Day &mdash; Participant' },
    { text: 'Prayatna 2.0 &mdash; OIST ACM Student Chapter' }
  ];

  return (
    <section id="achievements" className="section">
      <div className="container">
        {/* Section label */}
        <div className="section-label">Achievements</div>
        <h2 className="section-heading">
          Milestones &amp; global <em>honors</em>
        </h2>

        {/* Featured Card: Space Olympiad */}
        <div
          className="reveal"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '850px',
            margin: '0 auto 60px auto',
            padding: '48px 40px',
            border: '1px solid rgba(201, 168, 76, 0.25)', // thin marigold border
            borderRadius: '2px',
            background: 'rgba(250, 247, 242, 0.4)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            minHeight: '220px'
          }}
        >
          {/* Watermark 6 SVG (Displacement Map applied for paint effect) */}
          <div style={{
            position: 'absolute',
            right: '40px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 0.35,
            width: '180px',
            height: '180px',
            filter: 'url(#painterly)'
          }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <text
                x="50"
                y="85"
                textAnchor="middle"
                fontFamily="var(--font-display)"
                fontSize="95"
                fontWeight="300"
                fill="var(--marigold)"
              >
                6
              </text>
            </svg>
          </div>

          {/* Details */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'left', maxWidth: '520px' }}>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--marigold)',
              display: 'block',
              marginBottom: '12px'
            }}>
              Astrophysics &amp; Space Science
            </span>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.2rem',
              fontWeight: '600',
              color: 'var(--forest)',
              lineHeight: '1.1',
              marginBottom: '8px'
            }}>
              World Rank 6
            </h3>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'var(--ink)',
              fontWeight: '300',
              lineHeight: '1.6'
            }}>
              Placed 6th globally in the International Space Olympiad, competing in orbital mechanics, stellar astrophysics, and historical space science modules.
            </p>
          </div>
        </div>

        {/* Secondary Achievements List */}
        <div style={{
          maxWidth: '850px',
          margin: '0 auto',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          padding: '0 24px'
        }}>
          {honorsList.map((honor, idx) => {
            const seedSize = 6 + (idx % 2); // Vary circle size for imperfection
            return (
              <div
                key={idx}
                className="reveal"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  transitionDelay: `${idx * 0.1}s`
                }}
              >
                {/* Node Orb Marker */}
                <div style={{
                  width: `${seedSize}px`,
                  height: `${seedSize}px`,
                  borderRadius: '50%',
                  backgroundColor: 'var(--lotus)',
                  opacity: 0.5
                }}></div>

                {/* Text */}
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    color: 'var(--ink)',
                    fontWeight: '300'
                  }}
                  dangerouslySetInnerHTML={{ __html: honor.text }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
