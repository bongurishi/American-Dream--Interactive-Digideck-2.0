import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { playHoverSound, playClickSound } from '../../lib/audio';

const VENUES = [
  { id: 'atrium', name: 'The Dream Stage / Atrium', originalImg: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2912&auto=format&fit=crop' },
  { id: 'waterpark', name: 'DreamWorks Water Park', originalImg: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=2940&auto=format&fit=crop' }
];

function getBrandStyle(brandName: string) {
  const name = brandName.toLowerCase();
  if (name.includes('nike')) return { color: 'bg-orange-600/50', blend: 'mix-blend-multiply', accent: 'bg-orange-500' };
  if (name.includes('zara')) return { color: 'bg-zinc-800/80', blend: 'mix-blend-multiply', accent: 'bg-zinc-300' };
  if (name.includes('apple')) return { color: 'bg-slate-300/40', blend: 'mix-blend-overlay', accent: 'bg-slate-300' };
  if (name.includes('spotify')) return { color: 'bg-green-500/40', blend: 'mix-blend-color', accent: 'bg-green-500' };
  
  const styles = [
    { color: 'bg-emerald-500/40', blend: 'mix-blend-color', accent: 'bg-emerald-500' },
    { color: 'bg-blue-600/50', blend: 'mix-blend-overlay', accent: 'bg-blue-500' },
    { color: 'bg-rose-600/50', blend: 'mix-blend-multiply', accent: 'bg-rose-500' },
    { color: 'bg-purple-600/50', blend: 'mix-blend-overlay', accent: 'bg-purple-500' },
    { color: 'bg-amber-500/40', blend: 'mix-blend-color', accent: 'bg-amber-500' }
  ];
  return styles[brandName.length % styles.length];
}

export function TakeoverModule() {
  const [activeVenue, setActiveVenue] = useState(VENUES[0]);
  const [brandInput, setBrandInput] = useState("");
  const [activeBrandName, setActiveBrandName] = useState("");
  const [activeBrandStyle, setActiveBrandStyle] = useState<{color: string; blend: string; accent: string} | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateTakeover = () => {
    if (!brandInput.trim()) return;
    
    setActiveBrandName(brandInput);
    setActiveBrandStyle(getBrandStyle(brandInput));
    setIsSimulating(true);
    playClickSound();
    
    // Simulate digital rollout
    setTimeout(() => {
      setIsSimulating(false);
    }, 2000);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeVenue.id + (activeBrandName ? '-takeover' : '-clean')}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src={activeVenue.originalImg} 
            alt={activeVenue.name} 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          {activeBrandStyle && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className={cn("absolute inset-0 w-full h-full z-10", activeBrandStyle.color, activeBrandStyle.blend)}
            />
          )}
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-20" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-20">
        
        {/* Left Col: Explainer & Selectors */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-white/50" />
              <span className="uppercase tracking-[0.2em] text-xs font-medium text-white/50">
                The "I Need To Be Here" Moment
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-4">
              Envision Your Absolute <span className="italic opacity-80 mt-2 block">Dominance.</span>
            </h2>
            <p className="text-white/60 font-light leading-relaxed mb-6">
              When a sponsor visualizes their brand architecturally injected into a 40-million-visitor ecosystem, passive reading becomes <strong className="text-white font-medium">active ownership</strong>. It shifts the pitch from "Here is our space" to "Look at what you own."
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* Venue Selector */}
            <div>
              <p className="text-sm font-mono text-white/40 mb-3 uppercase tracking-wider">1. Select Target Canvas</p>
              <div className="flex gap-4">
                {VENUES.map(v => (
                  <button
                    key={v.id}
                    onClick={() => { setActiveVenue(v); setActiveBrandName(""); setActiveBrandStyle(null); setBrandInput(""); playClickSound(); }}
                    onMouseEnter={playHoverSound}
                    className={cn(
                      "px-5 py-3 rounded-md text-sm transition-all border",
                      activeVenue.id === v.id ? "bg-white text-black border-white" : "border-white/20 text-white/60 hover:bg-white/10"
                    )}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Takeover Selector */}
            <div>
              <p className="text-sm font-mono text-white/40 mb-3 uppercase tracking-wider">2. Configure Brand Concept</p>
              <div className="flex flex-col gap-4">
                <input 
                  type="text" 
                  value={brandInput}
                  onChange={e => setBrandInput(e.target.value)}
                  placeholder="Enter Brand Name: NIKE / ZARA / Apple"
                  className="w-full bg-white/5 border border-white/10 rounded-md px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
                  onKeyDown={e => {
                    if (e.key === 'Enter') simulateTakeover();
                  }}
                />
                <button
                  onClick={simulateTakeover}
                  onMouseEnter={playHoverSound}
                  disabled={!brandInput.trim() || isSimulating}
                  className="flex items-center justify-between px-5 py-4 rounded-md text-left transition-all border group overflow-hidden relative border-white/30 hover:border-white bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                >
                  <span className="font-medium tracking-wide z-10">Deploy Takeover</span>
                  <span className="text-xs font-mono opacity-50 z-10 group-hover:opacity-100 transition-opacity">Execute &rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Data & ROI Simulation */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <AnimatePresence mode="popLayout">
            {activeBrandStyle && !isSimulating && (
              <motion.div
                initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-black/60 backdrop-blur-xl border border-white/10 p-8 rounded-2xl relative overflow-hidden"
              >
                <div className={cn("absolute top-0 left-0 w-full h-1", activeBrandStyle.accent)} />
                <h2 className="text-4xl md:text-5xl font-serif mb-2 text-white leading-tight uppercase font-bold tracking-tight">
                  {activeBrandName.toUpperCase()} OWNS {activeVenue.name.replace('The ', '').replace('DreamWorks ', '').toUpperCase()}
                </h2>
                <h3 className="text-xl font-mono text-white/50 mb-6 uppercase tracking-wider">{activeBrandName.toUpperCase()} Global Launch — American Dream</h3>
                
                <div className="mb-8 p-5 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-white text-lg font-medium mb-1 leading-snug">
                    "Your brand dominates the highest-footfall zone in North America."
                  </p>
                  <p className="text-white/60">
                    "This is not a placement. This is a market statement."
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-xs font-mono text-white/40 mb-1">Projected Weekend Footfall</p>
                    <p className="text-4xl font-light">125,000<span className={cn("text-lg ml-1", activeBrandStyle.accent.replace('bg-', 'text-'))}>+</span></p>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-white/40 mb-1">Earned Media Value (Est)</p>
                    <p className="text-4xl font-light">$4.2M</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-white/40 mb-1">On-Site Dwell Time</p>
                    <p className="text-4xl font-light">3.2<span className="text-lg text-white/60 ml-1">hrs</span></p>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-white/40 mb-1">Social Amplification</p>
                    <p className="text-4xl font-light">18.5M<span className="text-lg text-white/60 ml-1">imp</span></p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    onMouseEnter={playHoverSound}
                    onClick={() => {
                      playClickSound();
                      window.location.href = "mailto:sponsorship@americandream.com";
                    }}
                    className="w-full py-4 text-center text-sm font-medium tracking-widest uppercase bg-white text-black hover:bg-gray-200 transition-colors rounded"
                  >
                    Secure This Presence
                  </button>
                  <button 
                    onMouseEnter={playHoverSound}
                    onClick={() => {
                      playClickSound();
                      window.location.href = "mailto:sponsorship@americandream.com";
                    }}
                    className="w-full py-4 text-center text-sm font-medium tracking-widest uppercase bg-transparent text-white border border-white/20 hover:bg-white/10 transition-colors rounded"
                  >
                    Start the Conversation
                  </button>
                </div>
              </motion.div>
            )}

            {isSimulating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-64 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-md"
              >
                <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin mb-4" />
                <div className="font-mono text-sm tracking-widest text-white/50 animate-pulse text-center leading-relaxed">
                  <p>SIMULATING BRAND DOMINATION...</p>
                  <p>MAPPING GLOBAL IMPACT...</p>
                </div>
              </motion.div>
            )}
            
            {!activeBrandStyle && !isSimulating && (
              <div className="h-64 flex flex-col gap-4 items-center justify-center border border-white/5 border-dashed rounded-2xl">
                <p className="font-mono text-sm tracking-widest text-white/20 text-center px-6">AWAITING DEPLOYMENT COMMAND</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
