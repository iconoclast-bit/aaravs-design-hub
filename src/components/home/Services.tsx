import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolio } from '@/assets/portfolio';

const services = [
  {
    number: '01',
    title: 'Residential Interior',
    tag: 'Homes & Apartments',
    image: portfolio.a1,
  },
  {
    number: '02',
    title: 'Commercial Spaces',
    tag: 'Offices & Retail',
    image: portfolio.office1,
  },
  {
    number: '03',
    title: 'Complete Property Build',
    tag: 'Turnkey Construction',
    image: portfolio.a4,
  },
  {
    number: '04',
    title: 'Hospitality',
    tag: 'Hotels & Restaurants',
    image: portfolio.livingDining,
  },
];

const Services = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative bg-charcoal text-cream overflow-hidden">
      {/* Cross-fading backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key={services[active].image}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 0.35, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <img
                src={services[active].image}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-charcoal/60" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 section-padding">
        <div className="container mx-auto">
          <div className="flex items-baseline justify-between mb-16 md:mb-24">
            <span className="text-[10px] uppercase tracking-[0.4em] text-cream/50">
              (Services) — 03
            </span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-cream/50">
              Hover to explore
            </span>
          </div>

          <ul
            onMouseLeave={() => setActive(null)}
            className="border-t border-cream/15"
          >
            {services.map((s, i) => (
              <li
                key={s.number}
                onMouseEnter={() => setActive(i)}
                className="group relative border-b border-cream/15"
              >
                <div className="flex items-center justify-between py-8 md:py-10 cursor-pointer transition-all duration-500">
                  <div className="flex items-center gap-6 md:gap-12">
                    <span className="text-xs md:text-sm text-cream/40 tabular-nums">
                      {s.number}
                    </span>
                    <motion.h3
                      className="font-serif font-light leading-none"
                      style={{ fontSize: 'clamp(1.75rem, 5.5vw, 5rem)' }}
                      animate={{
                        x: active === i ? 24 : 0,
                        color: active === i ? 'hsl(var(--bronze))' : 'hsl(var(--cream))',
                        fontStyle: active === i ? 'italic' : 'normal',
                      }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {s.title}
                    </motion.h3>
                  </div>
                  <motion.span
                    animate={{
                      opacity: active === i ? 1 : 0.4,
                      x: active === i ? -8 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className="hidden md:block text-[10px] uppercase tracking-[0.3em] text-cream/60"
                  >
                    {s.tag} →
                  </motion.span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;
