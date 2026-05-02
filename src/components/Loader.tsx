import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
    >
      <div className="text-4xl font-serif tracking-widest text-white mb-8">
        IMSE.
      </div>
      <div className="w-64 h-[1px] bg-white/20 relative overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-white"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-4 text-xs font-mono text-white/50 tracking-widest">
        {Math.round(progress)}%
      </div>
    </motion.div>
  );
}
