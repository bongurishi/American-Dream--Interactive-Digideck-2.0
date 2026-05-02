import { motion } from 'motion/react';

export function ImpactMetrics() {
  const metrics = [
    { value: "+35%", label: "Brand Engagement", sub: "vs. traditional retail" },
    { value: "+22%", label: "Footfall Increase", sub: "during activated events" },
    { value: "100M+", label: "Annual Impressions", sub: "across digital & physical" }
  ];

  return (
    <section className="py-24 bg-zinc-900 relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {metrics.map((metric, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="flex flex-col items-center text-center pt-8 md:pt-0 first:pt-0"
            >
              <div className="text-5xl md:text-6xl font-serif font-medium text-white mb-4">
                {metric.value}
              </div>
              <div className="text-lg font-medium text-white/90 mb-1">
                {metric.label}
              </div>
              <div className="text-sm text-white/50 font-light">
                {metric.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
