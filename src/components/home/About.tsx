import { motion } from 'framer-motion';
import { portfolio } from '@/assets/portfolio';

const About = () => {
  return (
    <section id="about" className="section-padding bg-background text-foreground">
      <div className="container mx-auto grid grid-cols-12 gap-8 md:gap-12">
        <div className="col-span-12 md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <img
              src={portfolio.a5}
              alt="Sculpted entryway detail — Design by Aarav"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-charcoal/10" />
          </motion.div>
          <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-bronze">
            (Ethos) — 02
          </p>
        </div>
        <div className="col-span-12 md:col-span-7">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-light leading-[1.1] tracking-tight text-balance"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3.75rem)' }}
          >
            We treat every project as a portrait of the people who live within it —
            <span className="italic text-bronze"> considered, tactile, quietly ambitious.</span>
          </motion.h2>

          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-sm md:text-base font-light text-muted-foreground leading-relaxed"
            >
              Founded by Aarav, our studio serves clients across India — blending
              architectural discipline with a collector's eye for materials: Italian
              stone, hand-troweled plaster, solid brass, patinated timber.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm md:text-base font-light text-muted-foreground leading-relaxed"
            >
              From concept sketch to the final door handle, we deliver complete
              turnkey builds under one roof — the calm of a single point of authorship.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
