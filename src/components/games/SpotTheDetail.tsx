import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, MessageCircle, X, Sparkles } from 'lucide-react';
import { portfolio } from '@/assets/portfolio';
import { drive } from '@/assets/drive';
import { useGameProgress } from '@/hooks/useGameProgress';

interface Hotspot {
  x: number; // percent
  y: number;
  title: string;
  note: string;
}

interface Scene {
  key: string;
  image: string;
  title: string;
  hotspots: Hotspot[];
}

const scenes: Scene[] = [
  {
    key: 'livingArch',
    image: portfolio.livingArch,
    title: 'The Arched Living Room',
    hotspots: [
      { x: 28, y: 32, title: 'Hand-carved arch', note: 'A single limestone slab, sculpted on site over eleven days.' },
      { x: 62, y: 46, title: 'Brass inlay', note: 'A 3mm brass line traces the ceiling cove — catches the western light at dusk.' },
      { x: 46, y: 74, title: 'Bouclé weave', note: 'A custom Italian bouclé, milled to Aarav\'s spec in undyed cream.' },
      { x: 82, y: 60, title: 'Cove reveal', note: 'A concealed 2700K strip washes the wall, never the eye.' },
    ],
  },
  {
    key: 'livingDining',
    image: portfolio.livingDining,
    title: 'Dining & Salon',
    hotspots: [
      { x: 50, y: 28, title: 'Layered pendant', note: 'Three blown-glass domes, tuned to +/- 4cm to break the symmetry.' },
      { x: 22, y: 62, title: 'Rift-cut oak', note: 'A single log, book-matched across all four table leaves.' },
      { x: 76, y: 68, title: 'Fluted plaster', note: 'Hand-troweled venetian, 14 vertical flutes per meter.' },
    ],
  },
  {
    key: 'office1',
    image: drive.d7,
    title: 'The Corner Office',
    hotspots: [
      { x: 34, y: 40, title: 'Walnut joinery', note: 'Mitred at 45° with no visible fastener — a two-day dry-fit.' },
      { x: 68, y: 30, title: 'Task lighting', note: 'A CRI-95 linear, warm-dim from 3000K down to 1800K after 7pm.' },
      { x: 50, y: 78, title: 'Wool-loop rug', note: 'Undyed New Zealand wool, hand-loomed in Bhadohi.' },
    ],
  },
];

interface Props {
  onClose: () => void;
}

const SpotTheDetail = ({ onClose }: Props) => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [found, setFound] = useState<Record<string, Set<number>>>({});
  const [active, setActive] = useState<number | null>(null);
  const { markCompleted } = useGameProgress();

  const scene = scenes[sceneIndex];
  const sceneFound = found[scene.key] || new Set<number>();
  const totalFound = useMemo(
    () => Object.values(found).reduce((n, s) => n + s.size, 0),
    [found],
  );
  const totalHotspots = scenes.reduce((n, s) => n + s.hotspots.length, 0);
  const allDone = totalFound >= totalHotspots;

  const reveal = (i: number) => {
    setActive(i);
    setFound((prev) => {
      const next = { ...prev };
      const set = new Set(next[scene.key] || []);
      set.add(i);
      next[scene.key] = set;
      const newTotal = Object.values(next).reduce((n, s) => n + s.size, 0);
      if (newTotal >= totalHotspots) {
        markCompleted('spot', { result: `${newTotal} details found` });
      }
      return next;
    });
  };

  const nextScene = () => {
    setActive(null);
    setSceneIndex((i) => (i + 1) % scenes.length);
  };
  const prevScene = () => {
    setActive(null);
    setSceneIndex((i) => (i - 1 + scenes.length) % scenes.length);
  };

  const openWhatsapp = () => {
    const msg = `Hi Aarav — I completed the Spot-the-Detail game and I'd love to see the unpublished works gallery.`;
    window.open(
      `https://wa.me/919599765044?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener',
    );
  };

  return (
    <div className="relative w-full max-w-3xl bg-cream text-charcoal shadow-2xl overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-30 p-2 rounded-full bg-cream/90 hover:bg-cream transition-colors"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="p-6 md:p-8 pb-4">
        <div className="flex items-center gap-2 text-bronze">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-[10px] uppercase tracking-[0.4em]">
            Spot the Detail
          </span>
        </div>
        <div className="mt-2 flex items-baseline justify-between gap-4 flex-wrap">
          <h3 className="font-serif italic font-light text-2xl md:text-3xl">
            {scene.title}
          </h3>
          <span className="text-[11px] uppercase tracking-[0.3em] text-charcoal/60 tabular-nums">
            {totalFound} / {totalHotspots} details found
          </span>
        </div>
        <p className="mt-1 text-xs text-charcoal/55">
          Look closely. Tap the glowing bronze marks to reveal Aarav's notes.
        </p>
      </div>

      <div className="relative mx-6 md:mx-8 aspect-[16/10] overflow-hidden bg-charcoal">
        <img
          src={scene.image}
          alt={scene.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {scene.hotspots.map((h, i) => {
          const isFound = sceneFound.has(i);
          const isActive = active === i;
          return (
            <button
              key={i}
              onClick={() => reveal(i)}
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              aria-label={`Reveal detail: ${h.title}`}
            >
              <span className="relative flex h-5 w-5 items-center justify-center">
                {!isFound && (
                  <span className="absolute inline-flex h-full w-full rounded-full bg-bronze/60 animate-ping" />
                )}
                <span
                  className={`relative h-3 w-3 rounded-full border transition-all ${
                    isFound
                      ? 'bg-bronze border-bronze scale-110'
                      : 'bg-cream/90 border-bronze group-hover:scale-125'
                  }`}
                />
              </span>
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute left-1/2 top-6 z-20 -translate-x-1/2 w-[220px] bg-charcoal text-cream p-3 shadow-xl border border-bronze/40"
                  >
                    <p className="text-[10px] uppercase tracking-[0.3em] text-bronze">
                      {h.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-cream/85 font-serif italic">
                      {h.note}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between p-6 md:p-8 pt-4">
        <button
          onClick={prevScene}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-charcoal/60 hover:text-charcoal transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Prev room
        </button>
        <span className="text-[10px] uppercase tracking-[0.3em] text-charcoal/45 tabular-nums">
          Room {sceneIndex + 1} / {scenes.length}
        </span>
        <button
          onClick={nextScene}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-charcoal/60 hover:text-charcoal transition-colors"
        >
          Next room <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <AnimatePresence>
        {allDone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-6 md:mx-8 mb-6 md:mb-8 border border-bronze/40 bg-charcoal text-cream p-5"
          >
            <div className="flex items-center gap-2 text-bronze text-[10px] uppercase tracking-[0.3em]">
              <Check className="h-3.5 w-3.5" /> Perk unlocked
            </div>
            <p className="mt-2 font-serif italic text-lg">
              You have Aarav's eye. Unpublished works gallery is yours.
            </p>
            <button
              onClick={openWhatsapp}
              className="mt-4 inline-flex items-center gap-2 bg-bronze text-charcoal px-5 py-3 text-[11px] uppercase tracking-[0.3em] hover:bg-cream transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Request the private gallery
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpotTheDetail;
