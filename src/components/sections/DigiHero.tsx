import { motion } from 'motion/react';
import { trackEvent } from '../../lib/analytics';
import { playHoverSound, playClickSound } from '../../lib/audio';

export function DigiHero({ onNext }: { onNext?: () => void }) {
  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Video / Cinematic Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black z-10" />
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-60"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-business-building-exterior-1926-large.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-20">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex items-center gap-4"
        >
          <div className="w-8 h-[1px] bg-white/50" />
          <span className="uppercase tracking-[0.3em] text-xs font-medium text-white/70">
            Welcome to American Dream
          </span>
          <div className="w-8 h-[1px] bg-white/50" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-[7rem] font-serif tracking-tight leading-[1.05] text-white mb-16"
        >
          25M Visitors Annually.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
            Where Global Brands<br/>
            Become Cultural Landmarks.
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button
            onMouseEnter={playHoverSound}
            onClick={() => {
              playClickSound();
              trackEvent('hero_cta_click', { action: 'Enter' });
              if(onNext) onNext();
            }}
            className="px-10 py-5 rounded-full text-sm font-medium transition-all duration-500 hover:scale-105 border bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.6)]"
          >
            Enter The Experience
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
      >
        <div className="w-[1px] h-16 bg-white/20 overflow-hidden relative">
          <motion.div 
            animate={{ y: [0, 64] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
}
