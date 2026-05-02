import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { trackEvent } from '../../lib/analytics';
import { playClickSound, playHoverSound } from '../../lib/audio';

const venues = [
  {
    id: 'atrium',
    name: 'The Dream Stage / Atrium',
    capacity: '10,000+',
    feature: '360° Digital Wraps',
    img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2912&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-crowd-of-people-at-a-music-concert-in-stadium-14506-large.mp4',
    desc: 'The architectural heart of the complex. Engineered for maximum visibility, featuring state-of-the-art acoustic cladding and massive LED installations. Perfect for global launches.'
  },
  {
    id: 'nickelodeon',
    name: 'Nickelodeon Universe (Buyout)',
    capacity: '15,000',
    feature: 'Experiential Integration',
    img: 'https://images.unsplash.com/photo-1543168256-418811576931?q=80&w=2940&auto=format&fit=crop',
    desc: 'The largest indoor theme park in the Western Hemisphere, available for full-scale corporate buyouts, massive media productions, and unprecedented VIP activations.'
  },
  {
    id: 'waterpark',
    name: 'DreamWorks Water Park',
    capacity: '5,000+',
    feature: 'Climate-Controlled Oasis',
    img: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=2940&auto=format&fit=crop',
    desc: 'Complete with a giant wave pool, luxury cabanas, and year-round 81-degree weather. An unforgettable backdrop for exclusive, high-impact brand events.'
  }
];

export function VenueModule() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeVenue = venues.find(v => v.id === activeId);

  return (
    <section className="h-screen w-full bg-black relative overflow-hidden flex items-center">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="uppercase tracking-[0.2em] text-sm font-medium text-white/50 mb-4 block">
              Immersive Spaces
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">
              Stage Your Next Moment
            </h2>
          </div>
          <p className="text-white/60 font-light max-w-sm">
            Architecture built as a platform. Select a venue to explore spatial capabilities and integration options.
          </p>
        </div>

        {/* The Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onMouseEnter={playHoverSound}
              onClick={() => {
                playClickSound();
                setActiveId(venue.id);
                trackEvent('venue_opened', { venue: venue.id });
              }}
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6">
                <img 
                  loading="lazy"
                  src={venue.img} 
                  alt={venue.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6">
                  <div className="text-xs uppercase tracking-widest text-green-400 mb-2 font-medium">
                    {venue.capacity} Capacity
                  </div>
                  <h3 className="text-2xl font-serif text-white group-hover:text-white transition-colors">
                    {venue.name}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expandable Modal over the entire screen */}
        <AnimatePresence>
          {activeVenue && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-3xl overflow-y-auto"
            >
              <button 
                onClick={() => {
                  playClickSound();
                  setActiveId(null);
                }}
                className="absolute top-6 right-6 md:top-12 md:right-12 text-white/50 hover:text-white p-4"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-black border border-white/10 rounded-3xl overflow-hidden">
                <div className="relative aspect-square lg:aspect-auto lg:h-[800px]">
                  {activeVenue.videoUrl ? (
                    <video 
                      src={activeVenue.videoUrl} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      loading="lazy"
                      src={activeVenue.img} 
                      alt={activeVenue.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black lg:to-black/30" />
                </div>
                
                <div className="p-8 md:p-16 flex flex-col justify-center h-full">
                  <span className="uppercase tracking-[0.3em] text-xs font-medium text-green-400 mb-4 block">
                    Venue Specifications
                  </span>
                  <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">
                    {activeVenue.name}
                  </h2>
                  <p className="text-xl text-white/60 font-light mb-12 leading-relaxed">
                    {activeVenue.desc}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8 mb-16 border-t border-white/10 pt-12">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-white/40 mb-2">Max Capacity</div>
                      <div className="text-2xl font-light text-white">{activeVenue.capacity}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-white/40 mb-2">Key Feature</div>
                      <div className="text-xl font-light text-white">{activeVenue.feature}</div>
                    </div>
                  </div>

                  <button 
                    onMouseEnter={playHoverSound}
                    onClick={() => {
                      playClickSound();
                      trackEvent('cta_click', { action: 'claim_presence', venue: activeVenue.name });
                      setActiveId(null);
                      // In a real app, this might open a lead form
                    }}
                    className="w-full md:w-auto self-start bg-white text-black px-12 py-5 rounded-full text-sm font-medium hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] transition-all duration-300 hover:scale-105"
                  >
                    Claim Your Presence
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
