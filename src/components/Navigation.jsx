import React, { useState } from 'react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      left: 0,
      width: '100%',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 clamp(1.5rem, 5vw, 6rem)',
      zIndex: 100,
      background: 'rgba(250, 247, 242, 0.9)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      borderBottom: '1px solid rgba(107, 127, 94, 0.15)',
      transition: 'var(--transition-medium)'
    }}>
      {/* Left Title */}
      <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.875rem',
        fontWeight: '500',
        textDecoration: 'none',
        color: 'var(--forest)',
        letterSpacing: '0.02em'
      }}>
        Dhwani Sharma
      </a>

      {/* Desktop Links */}
      <div className="nav-links-desktop" style={{
        display: 'flex',
        gap: '2.5rem'
      }}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleNavClick(e, item.id)}
            className="link-grow"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: '400',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--ink-light)',
              padding: '4px 0'
            }}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Hamburger Toggle (Mobile Only) */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="nav-hamburger-btn"
        aria-label="Toggle Menu"
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          flexDirection: 'column',
          gap: '6px',
          padding: '4px',
          zIndex: 101
        }}
      >
        <span style={{
          display: 'block',
          width: '22px',
          height: '1.5px',
          background: 'var(--forest)',
          transition: 'var(--transition-medium)',
          transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
        }}></span>
        <span style={{
          display: 'block',
          width: '22px',
          height: '1.5px',
          background: 'var(--forest)',
          transition: 'var(--transition-medium)',
          opacity: isOpen ? 0 : 1
        }}></span>
        <span style={{
          display: 'block',
          width: '22px',
          height: '1.5px',
          background: 'var(--forest)',
          transition: 'var(--transition-medium)',
          transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
        }}></span>
      </button>

      {/* Mobile Menu Panel */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '100%',
        height: '100vh',
        background: 'var(--cream)',
        zIndex: 99,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2.5rem',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        borderLeft: '1px solid rgba(107, 127, 94, 0.1)'
      }}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleNavClick(e, item.id)}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              fontWeight: '400',
              textDecoration: 'none',
              color: 'var(--forest)',
              transition: 'var(--transition-fast)'
            }}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Media Queries inside JS to preserve single-file component build */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .nav-links-desktop {
            display: none !important;
          }
          .nav-hamburger-btn {
            display: flex !important;
          }
        }
      `}} />
    </nav>
  );
};

export default Navigation;
