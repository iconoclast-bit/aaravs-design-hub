import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const words = ['Bespoke', 'Considered', 'Tactile', 'Enduring', 'Quiet', 'Refined'];

const testimonials = [
  {
    quote:
      "Aarav's studio delivered a home that feels inevitable — as though every joinery detail had always been there. The process was unhurried, intelligent, and completely without ego.",
    author: 'Kavya & Rohan Mehra',
    location: 'Golf Course Road, Gurugram',
  },
  {
    quote:
      'From the first mood board to the final styling, the team held an incredibly clear vision. Our penthouse now photographs like a magazine and lives like a sanctuary.',
    author: 'Ishaan Kapoor',
    location: 'Worli Sea Face, Mumbai',
  },
  {
    quote:
      'They treated our office as a brand, not a floor plate. Clients now linger in the lounge and our team genuinely enjoys coming in — the ROI was immediate.',
    author: 'Priya Nair',
    location: 'CEO, Lumen Labs · Bengaluru',
  },
  {
    quote:
      'Detail after detail — brass inlays, hand-tufted rugs, custom joinery — arrived exactly as promised, on time and on budget. A rare experience in this industry.',
    author: 'Anjali & Vikram Sethi',
    location: 'DLF Camellias, Gurugram',
  },
];

const ROTATE_MS = 6500;

const Testimonials = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % testimonials.length),
      ROTATE_MS,
    );
    return () => clearInterval(id);
  }, []);

  const t = testimonials[active];

  return (
    <section className="relative bg-charcoal text-cream py-24 md:py-36 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-5">
          <span className="text-[10px] uppercase tracking-[0.4em] text-cream/50">
            (Testimony) — 05
          </span>
          <div className="mt-6 flex items-center gap-4">
            <span className="font-serif italic text-bronze text-2xl tabular-nums">
              0{active + 1}
            </span>
            <span className="h-px flex-1 max-w-[80px] bg-cream/20" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-cream/40 tabular-nums">
              / 0{testimonials.length}
            </span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-7 relative min-h-[320px] md:min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -24, filter: 'blur(6px)' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif font-light leading-[1.15] text-balance absolute inset-0"
              style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.75rem)' }}
            >
              <span className="text-bronze italic">"</span>
              {/* Word-by-word reveal */}
              {t.quote.split(' ').map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + i * 0.025,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block mr-[0.25em]"
                >
                  {w}
                </motion.span>
              ))}
              <span className="text-bronze italic"> "</span>
              <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-10 text-xs uppercase tracking-[0.3em] text-cream/60 font-sans not-italic"
              >
                — {t.author} · {t.location}
              </motion.footer>
            </motion.blockquote>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="absolute bottom-0 left-0 flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className="relative h-1 w-10 overflow-hidden rounded-full bg-cream/15"
              >
                {i === active && (
                  <motion.span
                    key={active}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: ROTATE_MS / 1000, ease: 'linear' }}
                    className="absolute inset-y-0 left-0 bg-bronze"
                  />
                )}
                {i < active && <span className="absolute inset-0 bg-bronze/50" />}
              </button>
            ))}
          </div>
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
