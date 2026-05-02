import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playHoverSound } from '../../lib/audio';

const zones = [
  {
    id: 'retail',
    name: 'The Avenue (Luxury Retail)',
    x: 30, y: 40,
    stats: { footfall: '15M+', audience: 'HNW Individuals', fit: 'Haute Couture & Heritage', rev: '$2.4B' },
    desc: 'The only true ultra-luxury shopping destination in the Northeast, featuring Saks Fifth Avenue and global heritage brands.'
  },
  {
    id: 'theme-park',
    name: 'Nickelodeon Universe',
    x: 65, y: 30,
    stats: { footfall: '12M+', audience: 'Families / Gen Z', fit: 'Mass-Market Experiential', rev: 'Media ROI 8x' },
    desc: 'The largest indoor theme park in the Western Hemisphere. Unmatched for family-focused brand activations.'
  },
  {
    id: 'events',
    name: 'The Dream Stage / Atrium',
    x: 50, y: 65,
    stats: { footfall: '40M+', audience: 'Global Tourists', fit: 'Activations & Launches', rev: 'Viral Reach' },
    desc: 'Our central convergence zone. Surrounded by 360° sightlines, perfectly engineered for global product launches.'
  },
  {
    id: 'ski',
    name: 'Big SNOW American Dream',
    x: 75, y: 75,
    stats: { footfall: '3M+', audience: 'Active Lifestyle', fit: 'Athletic & Performance', rev: '$1.2B Halo' },
    desc: 'North America\'s first and only indoor real-snow ski and snowboard center. A highly unique lifestyle targeting metric.'
  }
];

export function OpportunityMap() {
  const [activeZone, setActiveZone] = useState(zones[0]);

  return (
    <section className="h-screen w-full bg-black relative flex items-center border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        <div className="mb-16">
          <span className="uppercase tracking-[0.2em] text-sm font-medium text-white/50 mb-2 block">
            Opportunity Map
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white">
            Architecture of Engagement
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Map Area */}
          <div className="lg:col-span-7 relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 group">
            <img 
              loading="lazy"
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop" 
              alt="Architectural Blueprint" 
              className="w-full h-full object-cover opacity-30 mix-blend-luminosity brightness-50 contrast-125"
              referrerPolicy="no-referrer"
            />
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            {/* Hotspots */}
            {zones.map((zone) => (
              <button
                key={zone.id}
                onMouseEnter={() => {
                  if (activeZone.id !== zone.id) {
                    playHoverSound();
                    setActiveZone(zone);
                  }
                }}
                className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 group/btn"
                style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
              >
                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  activeZone.id === zone.id 
                    ? 'bg-white scale-150 shadow-[0_0_20px_#fff]' 
                    : 'bg-white/40 group-hover/btn:bg-white/80'
                }`} />
                {activeZone.id === zone.id && (
                  <motion.div 
                    layoutId="pulse"
                    className="absolute inset-0 border border-white rounded-full"
                    animate={{ scale: [1, 2.5], opacity: [1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
              </button>
            ))}

            {/* Connecting lines aesthetic */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <path d="M 30% 40% L 65% 30% M 30% 40% L 50% 65% M 50% 65% L 75% 75% M 65% 30% L 75% 75%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Data Panel */}
          <div className="lg:col-span-5 h-[400px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeZone.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="bg-zinc-950/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl relative overflow-hidden"
              >
                {/* Subtle glow behind card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                
                <h3 className="text-2xl font-serif text-white mb-4 pr-12">{activeZone.name}</h3>
                <p className="text-white/60 font-light mb-8 leading-relaxed h-[80px]">
                  {activeZone.desc}
                </p>

                <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-white/40 mb-1">Annual Footfall</div>
                    <div className="text-2xl font-medium text-white">{activeZone.stats.footfall}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-white/40 mb-1">Target Audience</div>
                    <div className="text-sm font-medium text-white mt-1.5">{activeZone.stats.audience}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-white/40 mb-1">Brand Fit</div>
                    <div className="text-sm font-medium text-white mt-1.5">{activeZone.stats.fit}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-white/40 mb-1">Commerce Vol.</div>
                    <div className="text-2xl font-medium text-green-400">{activeZone.stats.rev}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
