import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { trackEvent } from '../lib/analytics';
import { playHoverSound, playClickSound } from '../lib/audio';

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 500px, hide near the bottom where FinalCTA is
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      
      if (scrollY > 500 && scrollY < documentHeight - windowHeight - 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <button 
            onMouseEnter={playHoverSound}
            onClick={() => {
              playClickSound();
              trackEvent('cta_click', { section: 'floating_nav', action: 'activate_here' });
              document.querySelector('#simulator')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative flex items-center gap-3 bg-white text-black px-6 py-4 md:px-8 md:py-5 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] hover:scale-105 transition-all duration-300"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium">Activate Here</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
