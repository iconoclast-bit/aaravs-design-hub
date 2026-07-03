import { motion } from 'framer-motion';

const words = ['Bespoke', 'Considered', 'Tactile', 'Enduring', 'Quiet', 'Refined'];

const Testimonials = () => {
  return (
    <section className="relative bg-charcoal text-cream py-24 md:py-36 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-5">
          <span className="text-[10px] uppercase tracking-[0.4em] text-cream/50">
            (Testimony) — 05
          </span>
        </div>
        <div className="col-span-12 md:col-span-7">
          <motion.blockquote
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-light leading-[1.15] text-balance"
            style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.75rem)' }}
          >
            <span className="text-bronze italic">"</span> Aarav's studio delivered a home
            that feels inevitable — as though every joinery detail had always been
            there. The process was unhurried, intelligent, and completely without ego.
            <span className="text-bronze italic"> "</span>
            <footer className="mt-10 text-xs uppercase tracking-[0.3em] text-cream/60 font-sans not-italic">
              — Kavya & Rohan Mehra · Golf Course Road
            </footer>
          </motion.blockquote>
        </div>
      </div>

      {/* Marquee */}
      <div className="mt-24 md:mt-36 border-y border-cream/10 overflow-hidden">
        <div className="marquee flex whitespace-nowrap py-8">
          {[...words, ...words, ...words].map((w, i) => (
            <span
              key={i}
              className="mx-8 font-serif italic text-cream/70"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              {w} <span className="text-bronze not-italic mx-6">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
