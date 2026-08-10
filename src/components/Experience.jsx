import React from 'react';

const Experience = () => {
  const experienceList = [
    {
      title: 'Corporate Head',
      org: 'Coding Ninjas 10x SRM',
      period: 'Jun 2026 – Present',
      desc: 'Leading corporate initiatives, managing team operations, and organizing tech community events. Previously served as a Corporate Member from Oct 2025.'
    },
    {
      title: 'Delegate Affairs Head',
      org: 'SRM MUN Society',
      period: 'Jul 2025 – Jun 2026',
      desc: 'Managed communication and coordination with internal and external delegates across all sessions. Oversaw logistics, onboarding, and scheduling for the conference. Previously served as a Delegate Affairs Member from Sep 2024.'
    },
    {
      title: 'UI/UX Development Intern',
      org: 'Cherry+ Network',
      period: 'Mar 2025 – May 2025',
      desc: 'Designed interfaces and built interactive front-end components using Figma and modern web technologies.'
    },
    {
      title: 'Sponsorship Marketing Volunteer',
      org: 'IEEE SRMIST Student Branch',
      period: 'Nov 2024 – Jul 2025',
      desc: 'Handled corporate outreach, sponsorship marketing, and public relations to fund student-led tech events and workshops.'
    }
  ];

  return (
    <section id="experience" className="section">
      <div className="container" style={{ position: 'relative' }}>
        {/* Section label */}
        <div className="section-label">Experience</div>
        <h2 className="section-heading">
          Academic leadership &amp; <em>work</em>
        </h2>

        {/* Timeline Path container */}
        <div className="timeline-container" style={{
          position: 'relative',
          maxWidth: '900px',
          margin: '40px auto 0 auto',
          padding: '40px 0'
        }}>
          {/* Vertical Winding S-curve SVG Path */}
          <div className="timeline-svg-line" style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '60px',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            zIndex: 1
          }}>
            <svg viewBox="0 0 60 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
              <path
                d="M 30,0 C 15,30 45,70 30,100"
                fill="none"
                stroke="var(--olive)"
                strokeWidth="1.5"
                opacity="0.25"
                filter="url(#painterly)"
              />
            </svg>
          </div>

          {/* Timeline Items */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '80px'
          }}>
            {experienceList.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              const nodeSize = 10 + (idx % 3); // Vary node size for imperfection
              return (
                <div
                  key={idx}
                  className="reveal"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    width: '100%',
                    flexDirection: isLeft ? 'row' : 'row-reverse'
                  }}
                >
                  {/* Content block (44% width) */}
                  <div style={{
                    width: '44%',
                    textAlign: isLeft ? 'right' : 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    <span className="tag-meta" style={{ color: 'var(--ink-light)' }}>
                      {item.period}
                    </span>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      fontWeight: '500',
                      color: 'var(--forest)'
                    }}>
                      {item.title}
                    </h3>
                    <h4 style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      color: 'var(--olive)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {item.org}
                    </h4>
                    <p style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      lineHeight: '1.65',
                      color: 'var(--ink)',
                      fontWeight: '300',
                      marginTop: '4px'
                    }}>
                      {item.desc}
                    </p>
                  </div>

                  {/* Absolute Central Node (Pushed over the SVG line) */}
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: `${nodeSize + 6}px`,
                      height: `${nodeSize + 6}px`,
                      borderRadius: '50%',
                      border: '1px solid rgba(196, 146, 155, 0.3)', // lotus ring
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{
                        width: `${nodeSize}px`,
                        height: `${nodeSize}px`,
                        borderRadius: '50%',
                        backgroundColor: 'var(--moss)'
                      }}></div>
                    </div>
                  </div>

                  {/* Spacer block (44% width to center the timeline) */}
                  <div className="timeline-spacer" style={{ width: '44%' }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .timeline-svg-line {
            left: 20px !important;
            transform: none !important;
          }
          .timeline-spacer {
            display: none !important;
          }
          .reveal {
            flex-direction: row-reverse !important; /* Move text to right */
            justify-content: flex-start !important;
            padding-left: 50px !important;
          }
          .reveal > div:first-child {
            width: 100% !important;
            text-align: left !important;
          }
          .reveal > div:nth-child(2) {
            left: 20px !important;
            transform: translateY(-50%) !important;
          }
        }
      `}} />
    </section>
  );
};

export default Experience;
