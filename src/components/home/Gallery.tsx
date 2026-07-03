import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { galleryProjects } from '@/assets/portfolio';

const projects = galleryProjects.map((p) => ({
  title: p.title,
  category: p.category,
  span: p.span,
  image: p.src,
}));

const Gallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 400, damping: 40 });
  const sy = useSpring(y, { stiffness: 400, damping: 40 });

  const onMove = (e: React.MouseEvent) => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <section
      id="portfolio"
      ref={containerRef}
      onMouseMove={onMove}
      className="relative section-padding bg-background text-foreground"
    >
      <div className="container mx-auto">
        <div className="mb-16 md:mb-24 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <span className="text-[10px] uppercase tracking-[0.4em] text-bronze">
              (Selected Work) — 04
            </span>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2
              className="font-serif font-light leading-[1.05]"
              style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
            >
              Recent <span className="italic">projects</span>,<br />
              from concept to keys.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-auto">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href="/gallery"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden ${p.span} block`}
            >
              <motion.img
                src={p.image}
                alt={p.title}
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/25 transition-colors duration-700" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-cream opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                <span className="text-[10px] uppercase tracking-[0.3em] text-cream/70">
                  {p.category}
                </span>
                <h3 className="mt-2 font-serif italic text-2xl md:text-3xl">{p.title}</h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Custom cursor */}
      <motion.div
        style={{ x: sx, y: sy, opacity: hovered ? 1 : 0 }}
        className="pointer-events-none fixed left-0 top-0 z-50 hidden md:flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-charcoal text-cream text-[10px] uppercase tracking-[0.25em] mix-blend-difference transition-opacity duration-300"
      >
        View
      </motion.div>
    </section>
  );
};

export default Gallery;
