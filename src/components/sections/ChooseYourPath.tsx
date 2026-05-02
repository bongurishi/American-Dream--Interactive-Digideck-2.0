import { motion } from 'motion/react';
import { trackEvent } from '../../lib/analytics';
import { playClickSound, playHoverSound } from '../../lib/audio';

const paths = [
  {
    id: 'retail',
    title: 'Retail Tenant',
    desc: 'Anchor your brand in our highest footfall zones.',
    action: 'mailto:leasing@americandream.com',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2940&auto=format&fit=crop',
    cta: 'Inquire Availability'
  },
  {
    id: 'sponsor',
    title: 'Brand Sponsor',
    desc: 'Take over the destination with high-impact activations.',
    action: 'mailto:sponsorship@americandream.com',
    img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2940&auto=format&fit=crop',
    cta: 'Request Media Deck'
  },
  {
    id: 'event',
    title: 'Event Partner',
    desc: 'Host monumental experiences in our world-class venues.',
    action: 'mailto:events@americandream.com',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2940&auto=format&fit=crop',
    cta: 'Book A Venue'
  }
];

export function ChooseYourPath() {
  return (
    <section className="h-screen w-full bg-black relative flex items-center justify-center border-t border-white/5 z-10 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-20 filter grayscale"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-business-building-exterior-1926-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full">
        <div className="text-center mb-12">
          <span className="uppercase tracking-[0.2em] text-sm font-medium text-white/50 mb-4 block">
            Direct Access
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white">
            Secure Your Blueprint
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paths.map((path, idx) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer bg-zinc-900 border border-white/10"
              onMouseEnter={playHoverSound}
              onClick={() => {
                playClickSound();
                trackEvent('path_selected', { path: path.id });
                window.location.href = path.action;
              }}
            >
              <img
                loading="lazy"
                src={path.img}
                alt={path.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-50 group-hover:opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-3xl font-serif text-white mb-2">{path.title}</h3>
                <p className="text-white/60 font-light mb-6 opacity-80 md:opacity-0 md:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {path.desc}
                </p>
                <div className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">
                  <span className="border-b border-white/30 group-hover:border-white">{path.cta}</span>
                  <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
