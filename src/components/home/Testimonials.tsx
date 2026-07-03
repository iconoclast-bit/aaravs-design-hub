import { motion } from 'framer-motion';
import { useState } from 'react';

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

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="relative bg-charcoal text-cream py-24 md:py-36 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-5">
          <span className="text-[10px] uppercase tracking-[0.4em] text-cream/50">
            (Testimony) — 05
          </span>
          <div className="mt-8 hidden md:flex flex-col gap-3">
            {testimonials.map((it, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`text-left text-xs uppercase tracking-[0.3em] transition-colors ${
                  i === active ? 'text-bronze' : 'text-cream/40 hover:text-cream/70'
                }`}
              >
                <span className="mr-3">0{i + 1}</span>
                {it.author}
              </button>
            ))}
          </div>
        </div>
        <div className="col-span-12 md:col-span-7">
          <motion.blockquote
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-light leading-[1.15] text-balance"
            style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.75rem)' }}
          >
            <span className="text-bronze italic">"</span> {t.quote}
            <span className="text-bronze italic"> "</span>
            <footer className="mt-10 text-xs uppercase tracking-[0.3em] text-cream/60 font-sans not-italic">
              — {t.author} · {t.location}
            </footer>
          </motion.blockquote>

          {/* Mobile pagination */}
          <div className="md:hidden mt-8 flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? 'w-8 bg-bronze' : 'w-4 bg-cream/25'
                }`}
              />
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
