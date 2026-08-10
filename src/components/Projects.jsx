import React from 'react';

const Projects = () => {
  const projectsList = [
    {
      id: 'citysafe',
      num: '01',
      title: 'CitySafe',
      tags: 'AI / Computer Vision / UI·UX',
      desc: 'An AI-powered urban safety monitoring platform using computer vision to detect hazards, anomalies, and potential threats in real time. Advanced to the penultimate round at TechXcelerate, BITS Pilani Hyderabad.',
      role: 'UI/UX Designer',
      links: [
        { label: 'GitHub →', url: 'https://github.com/kushagrjoshi777/CitySafe-2026' }
      ],
      accent: 'var(--pond)',
      clipClass: 'url(#wobbly-clip-1)'
    },
    {
      id: 'festify',
      num: '02',
      title: 'Festify',
      tags: 'Full-Stack / Offline-First / Analytics',
      desc: 'A next-generation campus event management platform with offline-first architecture, multi-tier pricing, real-time analytics dashboard, and complete event lifecycle management.',
      role: 'Full-Stack Developer',
      links: [],
      accent: 'var(--moss)',
      clipClass: 'url(#wobbly-clip-2)'
    },
    {
      id: 'niyantra',
      num: '03',
      title: 'Niyantra AI',
      tags: 'Data Visualisation / Supply Chain / AI',
      desc: 'A premium data-dense platform providing high-fidelity, real-time risk analysis and interactive visual workflows for tracking international supply chain events.',
      role: 'Designer & Developer',
      links: [
        { label: 'View Project →', url: 'https://niyantra-ai.vercel.app/' }
      ],
      accent: 'var(--olive)',
      clipClass: 'url(#wobbly-clip-1)'
    },
    {
      id: 'musclemap',
      num: '04',
      title: 'Muscle Map',
      tags: 'Health Tech / Visualisation / UI·UX',
      desc: 'A fitness and health tracking application focused on progress visualisation, helping users monitor workouts and health metrics through an intuitive interface.',
      role: 'Co-Developer',
      links: [],
      accent: 'var(--lotus)',
      clipClass: 'url(#wobbly-clip-2)'
    },
    {
      id: 'step',
      num: '05',
      title: 'STEP',
      tags: 'Java / Education / Open Source',
      desc: 'A curated repository of Java programs covering core concepts and advanced implementations, built as a structured learning and reference resource.',
      role: 'Developer',
      links: [],
      accent: 'var(--marigold)',
      clipClass: 'url(#wobbly-clip-1)'
    }
  ];

  return (
    <section id="projects" className="section">
      {/* Background Watercolor Wash */}
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '-10%',
        width: '55vw',
        height: '55vw',
        background: 'radial-gradient(circle, rgba(45, 79, 79, 0.04) 0%, transparent 60%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section label */}
        <div className="section-label">Selected Work</div>
        <h2 className="section-heading">
          Recent engineering <em>creations</em>
        </h2>

        {/* Project Lists */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '120px',
          marginTop: '60px'
        }}>
          {projectsList.map((project, idx) => {
            const isOdd = idx % 2 === 0;
            return (
              <div key={project.id} className="reveal">
                <div
                  className="project-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '80px',
                    alignItems: 'center'
                  }}
                >
                  {/* Left-aligned column: either text or image */}
                  {isOdd ? (
                    /* Project Details */
                    <div style={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '18px',
                      textAlign: 'left'
                    }}>
                      {/* Specimen watermark number */}
                      <div style={{
                        position: 'absolute',
                        top: '-60px',
                        left: '-20px',
                        fontFamily: 'var(--font-display)',
                        fontSize: '6.5rem',
                        fontWeight: '300',
                        color: 'var(--olive)',
                        opacity: 0.14,
                        pointerEvents: 'none',
                        zIndex: 0,
                        lineHeight: 1
                      }}>
                        {project.num}
                      </div>

                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <span className="tag-meta">{project.tags}</span>
                        <h3 style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)',
                          fontWeight: '600',
                          color: 'var(--forest)',
                          marginTop: '8px',
                          marginBottom: '4px'
                        }}>
                          {project.title}
                        </h3>
                        <span style={{
                          fontSize: '0.8rem',
                          fontStyle: 'italic',
                          color: 'var(--ink-light)',
                          fontFamily: 'var(--font-display)'
                        }}>
                          Role: {project.role}
                        </span>
                      </div>

                      <p style={{
                        fontSize: '0.95rem',
                        lineHeight: '1.7',
                        color: 'var(--ink)',
                        fontWeight: '300',
                        zIndex: 1
                      }}>
                        {project.desc}
                      </p>

                      {project.links.length > 0 && (
                        <div style={{ display: 'flex', gap: '20px', marginTop: '8px', zIndex: 1 }}>
                          {project.links.map((link) => (
                            <a
                              key={link.label}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link-grow"
                              style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '0.85rem',
                                fontWeight: '500',
                                color: 'var(--moss)'
                              }}
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Visual Area Frame */
                    <div style={{
                      width: '100%',
                      filter: 'url(#painterly)'
                    }}>
                      <div
                        className="wobbly-frame"
                        style={{
                          clipPath: project.clipClass,
                          WebkitClipPath: project.clipClass,
                          background: `radial-gradient(circle, ${project.accent} 0%, var(--parchment-deep) 100%)`,
                          opacity: 0.95,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <span style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.6rem',
                          color: 'var(--forest)',
                          opacity: 0.15,
                          fontWeight: '500',
                          letterSpacing: '0.05em'
                        }}>
                          {project.title}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Right-aligned column: matching slot */}
                  {isOdd ? (
                    /* Visual Area Frame */
                    <div style={{
                      width: '100%',
                      filter: 'url(#painterly)'
                    }}>
                      <div
                        className="wobbly-frame"
                        style={{
                          clipPath: project.clipClass,
                          WebkitClipPath: project.clipClass,
                          background: `radial-gradient(circle, ${project.accent} 0%, var(--parchment-deep) 100%)`,
                          opacity: 0.95,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <span style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.6rem',
                          color: 'var(--forest)',
                          opacity: 0.15,
                          fontWeight: '500',
                          letterSpacing: '0.05em'
                        }}>
                          {project.title}
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Project Details */
                    <div style={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '18px',
                      textAlign: 'left'
                    }}>
                      {/* Specimen watermark number */}
                      <div style={{
                        position: 'absolute',
                        top: '-60px',
                        left: '-20px',
                        fontFamily: 'var(--font-display)',
                        fontSize: '6.5rem',
                        fontWeight: '300',
                        color: 'var(--olive)',
                        opacity: 0.14,
                        pointerEvents: 'none',
                        zIndex: 0,
                        lineHeight: 1
                      }}>
                        {project.num}
                      </div>

                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <span className="tag-meta">{project.tags}</span>
                        <h3 style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)',
                          fontWeight: '600',
                          color: 'var(--forest)',
                          marginTop: '8px',
                          marginBottom: '4px'
                        }}>
                          {project.title}
                        </h3>
                        <span style={{
                          fontSize: '0.8rem',
                          fontStyle: 'italic',
                          color: 'var(--ink-light)',
                          fontFamily: 'var(--font-display)'
                        }}>
                          Role: {project.role}
                        </span>
                      </div>

                      <p style={{
                        fontSize: '0.95rem',
                        lineHeight: '1.7',
                        color: 'var(--ink)',
                        fontWeight: '300',
                        zIndex: 1
                      }}>
                        {project.desc}
                      </p>

                      {project.links.length > 0 && (
                        <div style={{ display: 'flex', gap: '20px', marginTop: '8px', zIndex: 1 }}>
                          {project.links.map((link) => (
                            <a
                              key={link.label}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link-grow"
                              style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '0.85rem',
                                fontWeight: '500',
                                color: 'var(--moss)'
                              }}
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Alternating Wobbly Separator Line */}
                {idx < projectsList.length - 1 && (
                  <div style={{
                    width: '100%',
                    height: '20px',
                    marginTop: '80px',
                    filter: 'url(#painterly)',
                    opacity: 0.25
                  }}>
                    <svg viewBox="0 0 100 10" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                      <path d="M 0,5 C 25,2 75,8 100,5" fill="none" stroke="var(--olive)" strokeWidth="0.8" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .project-row {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          /* Always text first */
          .project-row > div:nth-child(2) {
            order: -1 !important;
          }
        }
      `}} />
    </section>
  );
};

export default Projects;
