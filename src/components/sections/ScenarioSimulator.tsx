import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { trackEvent } from '../../lib/analytics';
import { playClickSound, playHoverSound } from '../../lib/audio';

const scenarios = [
  { id: 'takeover', label: 'Fashion Takeover' },
  { id: 'launch', label: 'Product Launch' },
  { id: 'naming', label: 'Naming-Rights Sponsorship' }
];

export function ScenarioSimulator() {
  const [selected, setSelected] = useState('');
  const [status, setStatus] = useState<'idle' | 'simulating' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);

  const runSimulation = (id: string) => {
    setSelected(id);
    setStatus('simulating');
    setProgress(0);
    trackEvent('simulator_started', { scenario: id });
    playClickSound();

    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStatus('complete');
        playClickSound(); // Ta-da sound conceptually
      }
    }, 100);
  };

  const getResult = () => {
    switch (selected) {
      case 'takeover': return { impressions: '100M+', lift: '+35%', zone: 'The Grand Atrium' };
      case 'launch': return { impressions: '45M+', lift: '+42%', zone: 'Performance Plaza' };
      case 'naming': return { impressions: '250M+', lift: 'Brand Halo', zone: 'Entire Complex' };
      default: return { impressions: '0', lift: '0', zone: '0' };
    }
  };

  return (
    <section className="h-screen w-full bg-zinc-950 relative overflow-hidden flex items-center">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      
      <div className="w-full max-w-5xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <span className="uppercase tracking-[0.2em] text-sm font-medium text-white/50 mb-4 block transition-colors">
            Brand Activation Simulator
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Find Your Perfect Presence
          </h2>
          <p className="text-white/50 font-light max-w-xl mx-auto">
            Select your deployment objective. Our predictive model will calculate your estimated omni-channel impact based on real-time footfall and spend data.
          </p>
        </div>

        <div className="bg-black border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
            {scenarios.map((sc) => (
              <button
                key={sc.id}
                onMouseEnter={playHoverSound}
                onClick={() => runSimulation(sc.id)}
                disabled={status === 'simulating'}
                className={`px-6 py-4 rounded-xl border transition-all duration-300 text-sm font-medium ${
                  selected === sc.id && status !== 'idle'
                    ? 'border-white bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                    : 'border-white/10 text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {sc.label}
              </button>
            ))}
          </div>

          {/* Screen Area */}
          <div className="relative h-[280px] bg-zinc-900/50 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center">
            
            <AnimatePresence mode="wait">
              {status === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-white/40 tracking-widest uppercase flex flex-col items-center gap-4 text-xs font-medium"
                >
                  <svg className="w-8 h-8 opacity-40 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Awaiting Configuration...
                </motion.div>
              )}

              {status === 'simulating' && (
                <motion.div
                  key="simulating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full max-w-md px-8"
                >
                  <div className="flex justify-between text-xs font-medium text-white/50 uppercase tracking-widest mb-4">
                    <span>Calculating Audience Metrics</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-[2px] bg-white/10 overflow-hidden">
                    <motion.div 
                      className="h-full bg-white shadow-[0_0_10px_#fff]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="mt-8 text-xs font-medium text-white/40 grid grid-cols-2 gap-4">
                    <div>Analyzing historical footfall trends...</div>
                    <div className="text-right">OK</div>
                    <div>Projecting spatial engagement...</div>
                    <div className="text-right text-white/80">CALC</div>
                  </div>
                </motion.div>
              )}

              {status === 'complete' && (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full flex flex-col items-center justify-center relative p-8"
                >
                  {/* Huge Glow Effect */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0,transparent_60%)]" 
                  />

                  <div className="relative z-10 text-center w-full">
                    <span className="uppercase tracking-[0.3em] text-xs font-medium text-white/50 mb-6 block">
                      Projected Annual Reach
                    </span>
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 1 }}
                      className="text-5xl md:text-7xl font-serif text-white mb-2 tracking-tighter"
                    >
                      {getResult().impressions}
                    </motion.div>
                    <div className="text-sm md:text-base text-green-400/80 font-light tracking-wide mb-10">Annual Impressions (Cross Physical + Digital)</div>
                    
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 1 }}
                      className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8 pb-10 max-w-lg mx-auto"
                    >
                      <div>
                        <div className="text-xs uppercase tracking-widest text-white/40 mb-2">Expected Engagement Lift</div>
                        <div className="text-3xl font-light text-white">{getResult().lift}</div>
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-widest text-white/40 mb-2">Recommended Activation Zone</div>
                        <div className="text-xl font-serif text-white">{getResult().zone}</div>
                      </div>
                    </motion.div>

                    <motion.button
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 1 }}
                      onMouseEnter={playHoverSound}
                      onClick={() => {
                        playClickSound();
                        trackEvent('cta_click', { action: 'claim_placement' });
                        // Conceptually advance the deal
                      }}
                      className="bg-white text-black px-12 py-5 rounded-full text-sm font-medium hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:shadow-[0_0_50px_rgba(255,255,255,0.6)] transition-all duration-300 hover:scale-105"
                    >
                      Claim This Placement
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
