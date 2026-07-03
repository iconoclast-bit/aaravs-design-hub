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
    <section className="relative h-screen w-full overflow-hidden bg-charcoal text-cream">
      {/* Background */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=85"
          alt="Sculptural architectural interior with warm natural light"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal" />
      </motion.div>

      {/* Top eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="absolute top-28 md:top-32 left-0 right-0 z-10 flex justify-center"
      >
        <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream/60">
          Noida · India — Est. 2014
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.h1
          variants={stagger}
          initial="hidden"
          animate="show"
          className="font-serif font-light leading-[0.95] tracking-tight text-cream"
          style={{ fontSize: 'clamp(2.75rem, 8vw, 8rem)' }}
        >
          <span className="block overflow-hidden">
            <motion.span variants={line} className="block italic">Elevating</motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={line} className="block">Spaces.</motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={line} className="block italic text-bronze">Refining</motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={line} className="block">Lifestyles.</motion.span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-10 max-w-md text-sm md:text-base font-light text-cream/70 text-balance"
        >
          A boutique studio crafting bespoke interiors and complete turnkey builds
          across residential, commercial, and hospitality environments.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 1 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={scrollToInquire}
          className="btn-magnetic btn-glow mt-12 bg-transparent text-cream border border-cream/30 hover:border-bronze hover:text-bronze"
        >
          Start Your Project
          <span className="inline-block h-px w-8 bg-current transition-all duration-500 group-hover:w-14" />
        </motion.button>
      </div>

      {/* Bottom row */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex items-center justify-between px-6 md:px-12 text-[10px] md:text-xs uppercase tracking-[0.3em] text-cream/50">
        <span className="hidden md:block">(01) — Architecture of Living</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 mx-auto md:mx-0"
        >
          <span>Scroll</span>
          <ArrowDown className="h-3 w-3" />
        </motion.div>
        <span className="hidden md:block">150+ Projects Delivered</span>
      </div>
    </section>
  );
};

export default Hero;
