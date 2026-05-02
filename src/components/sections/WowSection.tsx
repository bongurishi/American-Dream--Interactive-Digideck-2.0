import { motion } from 'motion/react';

export function WowSection() {
  return (
    <section className="h-screen w-full relative bg-black flex items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ scale: 1.1, filter: 'blur(5px)' }}
        animate={{ scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          loading="lazy"
          src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2940&auto=format&fit=crop" 
          alt="Concert Crowd" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center px-6"
      >
        <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-serif font-medium tracking-tight text-white mb-6">
          Feel The Scale.
        </h2>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
        >
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-light text-emerald-400">3M</span>
            <span className="text-sm tracking-widest text-white/50 uppercase mt-2">Square Feet</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-light text-blue-400">40M+</span>
            <span className="text-sm tracking-widest text-white/50 uppercase mt-2">Annual Visitors</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-light text-rose-400">22</span>
            <span className="text-sm tracking-widest text-white/50 uppercase mt-2">Miles from NYC</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-light text-purple-400">$5B</span>
            <span className="text-sm tracking-widest text-white/50 uppercase mt-2">Investment</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
