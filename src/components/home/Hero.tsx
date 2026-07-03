import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };
  const line = {
    hidden: { y: 60, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  const scrollToInquire = () => {
    document.getElementById('inquire')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-charcoal text-cream">
      {/* Abstract textured background — no fake living-room stock */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-charcoal" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(1200px 600px at 20% 30%, hsl(var(--bronze) / 0.35), transparent 60%), radial-gradient(900px 500px at 80% 70%, hsl(var(--champagne) / 0.18), transparent 65%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal" />
      </motion.div>

      {/* Top eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="absolute top-28 md:top-32 left-0 right-0 z-10 flex justify-center px-6"
      >
        <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream/60 text-center">
          Serving clients across India — Est. 2014
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-40 pb-32 text-center">
        <motion.h1
          variants={stagger}
          initial="hidden"
          animate="show"
          className="font-serif font-light leading-[1.1] tracking-tight text-cream text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl space-y-1 md:space-y-2"
        >
          <span className="block overflow-hidden pb-1">
            <motion.span variants={line} className="block italic">Elevating</motion.span>
          </span>
          <span className="block overflow-hidden pb-1">
            <motion.span variants={line} className="block">Spaces.</motion.span>
          </span>
          <span className="block overflow-hidden pb-1">
            <motion.span variants={line} className="block italic text-bronze">Refining</motion.span>
          </span>
          <span className="block overflow-hidden pb-1">
            <motion.span variants={line} className="block">Lifestyles.</motion.span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-10 md:mt-14 max-w-md text-sm md:text-base font-light text-cream/70 text-balance leading-relaxed"
        >
          A boutique studio crafting bespoke interiors and complete turnkey builds
          for residential, commercial and hospitality clients nationwide.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 1 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={scrollToInquire}
          className="btn-magnetic btn-glow mt-10 md:mt-12 bg-transparent text-cream border border-cream/30 hover:border-bronze hover:text-bronze"
        >
          Start Your Project
          <span className="inline-block h-px w-8 bg-current transition-all duration-500 group-hover:w-14" />
        </motion.button>
      </div>

      {/* Bottom row */}
      <div className="absolute bottom-6 left-0 right-0 z-10 flex items-center justify-between px-6 md:px-12 text-[10px] md:text-xs uppercase tracking-[0.3em] text-cream/50">
        <span className="hidden md:block">(01) — Architecture of Living</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 mx-auto md:mx-0"
        >
          <span>Scroll</span>
          <ArrowDown className="h-3 w-3" />
        </motion.div>
        <span className="hidden md:block">150+ Projects Delivered Nationwide</span>
      </div>
    </section>
  );
};

export default Hero;
