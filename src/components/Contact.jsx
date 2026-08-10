import React from 'react';
import BotanicalSprite from './BotanicalSprite';

const Contact = () => {
  return (
    <section id="contact" className="section reveal" style={{
      position: 'relative',
      paddingBottom: '80px',
      overflow: 'hidden'
    }}>
      {/* Background Watercolor Wash */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 50%, rgba(45, 79, 79, 0.16) 0%, transparent 80%)',
        filter: 'blur(30px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Atmospheric Watercolor Lily Pads — painted-on-parchment treatment */}
      <div className="botanical-drift-2" style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-140px',
        width: '520px',
        height: '400px',
        pointerEvents: 'none',
        zIndex: 1
      }}>
        <BotanicalSprite 
          region="lotus1" 
          opacity={0.10}
          extend={true}
          washColor="rgba(38, 67, 67, 0.03)"
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section label */}
        <div className="section-label">Contact</div>
        
        {/* Heading */}
        <h2 className="section-heading">
          Let's build something <em>strange</em>, useful, or beautiful.
        </h2>

        {/* Action Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '40px',
          marginTop: '60px',
          paddingBottom: '80px',
          borderBottom: '1px solid rgba(107, 127, 94, 0.15)',
          textAlign: 'left'
        }}>
          {/* Left: Contact Channels */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <span className="tag-meta" style={{ color: 'var(--ink-light)' }}>
              Direct Channels
            </span>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <a
                href="mailto:dhwanisharma2206@gmail.com"
                className="link-grow"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.05rem',
                  fontWeight: '500',
                  color: 'var(--ink)',
                  width: 'fit-content'
                }}
              >
                dhwanisharma2206@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/dhwani-sharma-5a4507318/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-grow"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.05rem',
                  fontWeight: '500',
                  color: 'var(--ink)',
                  width: 'fit-content'
                }}
              >
                LinkedIn Profile &rarr;
              </a>
              <a
                href="https://github.com/kushagrjoshi777/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-grow"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.05rem',
                  fontWeight: '500',
                  color: 'var(--ink)',
                  width: 'fit-content'
                }}
              >
                GitHub Profile &rarr;
              </a>
            </div>
          </div>

          {/* Right: CV Download Button */}
          <div>
            <a
              href="/resume_placeholder.pdf"
              download
              className="cv-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 28px',
                border: '1px solid rgba(58, 90, 64, 0.6)',
                borderRadius: '2px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--moss)',
                textDecoration: 'none',
                background: 'transparent',
                transition: 'var(--transition-fast)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(58, 90, 64, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              Download CV &darr;
            </a>
          </div>
        </div>

        {/* Minimal Footer */}
        <div style={{
          marginTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          fontSize: '0.8rem',
          color: 'var(--ink-light)',
          fontFamily: 'var(--font-sans)'
        }}>
          <p>
            &copy; 2026 Dhwani Sharma. All rights reserved.
          </p>
          <p style={{ fontStyle: 'italic' }}>
            A quiet integration of code &amp; painted botany.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
