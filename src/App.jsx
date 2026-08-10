import React, { useEffect } from 'react';
import './App.css';
import SharedSvgFilters from './components/SharedSvgFilters';
import BotanicalBackdrop from './components/BotanicalBackdrop';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Contact from './components/Contact';

function App() {
  useEffect(() => {
    // 1. Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 2. IntersectionObserver reveal triggers
    const revealElements = document.querySelectorAll('.reveal');
    
    if (prefersReducedMotion) {
      // Immediately make everything visible
      revealElements.forEach(el => el.classList.add('visible'));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    revealElements.forEach(el => {
      observer.observe(el);
    });

    // 3. Lightweight scroll parallax for floating leaves (Desktop only)
    const isMobile = window.innerWidth <= 768;
    let animationFrameId;

    const handleScrollParallax = () => {
      const scrollY = window.scrollY;
      const leaves = document.querySelectorAll('.leaf-anim-1, .leaf-anim-2');
      
      leaves.forEach((leaf, idx) => {
        // Stagger displacement rate: leaf 1 at 0.08, leaf 2 at 0.05, etc.
        const speed = 0.06 + (idx * 0.02);
        leaf.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };

    const onScroll = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(handleScrollParallax);
    };

    if (!isMobile) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Cleanup
    return () => {
      revealElements.forEach(el => {
        observer.unobserve(el);
      });
      if (!isMobile) {
        window.removeEventListener('scroll', onScroll);
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <>
      {/* Hidden global SVG filters and clip paths */}
      <SharedSvgFilters />

      {/* Global paper-textured and botanical background wrapper */}
      <BotanicalBackdrop />

      {/* Sticky navigation header */}
      <Navigation />

      {/* Narrative Section Flow */}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Contact />
    </>
  );
}

export default App;
