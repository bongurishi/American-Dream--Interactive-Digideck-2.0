import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { trackEvent } from '../lib/analytics';
import { playHoverSound, playClickSound } from '../lib/audio';

const navItems = [
  { name: '01. Vision', href: '#hero' },
  { name: '02. Pathways', href: '#pathways' },
  { name: '03. Masterplan', href: '#map' },
  { name: '04. Demographics', href: '#simulator' },
  { name: '05. Venues', href: '#venues' },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Simple scroll spy for presentation sections
      const sections = navItems.map(item => item.href.substring(1));
      let current = sections[0];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    trackEvent('nav_click', { destination: href });
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] mix-blend-difference hidden md:block pointer-events-none">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] text-white/70 uppercase tracking-widest font-mono flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Guided Demo Mode
        </div>
      </div>

      {/* Top Left Menu Button & Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="fixed top-8 left-8 z-[100] flex flex-col gap-6 mix-blend-difference"
      >
        <button 
          onMouseEnter={playHoverSound}
          onClick={() => {
            playClickSound();
            setIsMenuOpen(!isMenuOpen)
          }}
          className="group flex flex-col gap-1.5 w-8 hover:opacity-70 transition-opacity"
        >
          <div className={cn("h-0.5 bg-white transition-all duration-300 origin-left", isMenuOpen ? "w-8 rotate-45" : "w-8")} />
          <div className={cn("h-0.5 bg-white transition-all duration-300", isMenuOpen ? "opacity-0" : "w-6")} />
          <div className={cn("h-0.5 bg-white transition-all duration-300 origin-left", isMenuOpen ? "w-8 -rotate-45" : "w-4")} />
        </button>

        <div className="font-serif text-2xl tracking-widest text-white origin-top-left -rotate-90 translate-y-48 opacity-50 whitespace-nowrap">
          AMERICAN DREAM.
        </div>
      </motion.div>

      {/* Presentation Full Screen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 w-full md:w-[400px] bg-black/95 backdrop-blur-3xl z-[90] border-r border-white/10 flex flex-col justify-center px-12"
          >
            <div className="flex flex-col gap-8">
              <span className="text-xs tracking-[0.3em] text-white/40 uppercase mb-4">Select Chapter</span>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onMouseEnter={playHoverSound}
                  onClick={(e) => {
                    playClickSound();
                    scrollTo(e, item.href);
                  }}
                  className="group flex items-center gap-6"
                >
                  <div className={cn(
                    "w-12 h-[1px] transition-all duration-500",
                    activeSection === item.href.substring(1) ? "bg-white" : "bg-white/20 group-hover:bg-white/60 group-hover:w-16"
                  )} />
                  <span className={cn(
                    "text-3xl font-serif transition-colors duration-300",
                    activeSection === item.href.substring(1) ? "text-white" : "text-white/40 group-hover:text-white"
                  )}>
                    {item.name}
                  </span>
                </a>
              ))}
            </div>

            <div className="absolute bottom-12 left-12 flex flex-col gap-4">
              <button 
                onMouseEnter={playHoverSound}
                onClick={() => {
                  playClickSound();
                  setIsMenuOpen(false);
                  trackEvent('cta_click', { section: 'nav', action: 'inquire' });
                  document.querySelector('#simulator')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-black px-8 py-4 rounded-full text-sm font-medium hover:bg-white/90 transition-all hover:scale-105 inline-flex items-center gap-2 w-fit shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Inquire Platform
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Slide Indicator Dots (Right Side) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 mix-blend-difference hidden md:flex">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => scrollTo(e, item.href)}
            className="group p-2"
          >
            <div className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              activeSection === item.href.substring(1) 
                ? "bg-white scale-150" 
                : "bg-white/30 group-hover:bg-white/70"
            )} />
          </a>
        ))}
      </div>
    </>
  );
}
