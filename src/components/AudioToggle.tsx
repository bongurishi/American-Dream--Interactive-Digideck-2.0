import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toggleAudioMute, getIsMuted, playClickSound } from '../lib/audio';

export function AudioToggle() {
  const [isMuted, setIsMuted] = useState(getIsMuted());
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  const handleToggle = () => {
    const muted = toggleAudioMute();
    setIsMuted(muted);
    if (!muted) {
      setTimeout(playClickSound, 50);
    }
  };

  return (
    <div className="fixed top-8 right-8 md:right-12 z-[100] flex flex-col items-end gap-2 isolate">
      <button
        onClick={handleToggle}
        className="group flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 text-white/50 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 pointer-events-auto"
        aria-label={isMuted ? "Unmute sound" : "Mute sound"}
      >
        <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest">{isMuted ? 'Sound Off' : 'Sound On'}</span>
        {isMuted ? (
          <svg className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>
      
      <AnimatePresence>
        {!hasInteracted && !isMuted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] text-white/40 uppercase tracking-widest font-mono pointer-events-none mt-2"
          >
            Click anywhere to enable immersive sound
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
