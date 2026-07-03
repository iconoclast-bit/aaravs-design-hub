import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { Check, Download, MessageCircle, RotateCw, X } from 'lucide-react';
import { portfolio, galleryProjects } from '@/assets/portfolio';
import { drive } from '@/assets/drive';
import { useGameProgress } from '@/hooks/useGameProgress';

type Axis = 'minimal' | 'warm' | 'bold' | 'classical' | 'monochrome' | 'opulent';

interface MoodCard {
  id: string;
  image: string;
  caption: string;
  tags: Axis[];
}

const cards: MoodCard[] = [
  { id: 'c1', image: drive.d14, caption: 'Arched calm · muted linen',            tags: ['minimal', 'warm'] },
  { id: 'c2', image: drive.d20, caption: 'Chandelier ceremony · ivory tailoring', tags: ['classical', 'opulent'] },
  { id: 'c3', image: drive.d4,  caption: 'Slatted shadow · deep lounge',         tags: ['bold', 'monochrome'] },
  { id: 'c4', image: portfolio.livingArch, caption: 'Sculpted mural · scale & ritual', tags: ['classical', 'opulent'] },
  { id: 'c5', image: portfolio.a5, caption: 'Sunburst geometry · restrained',    tags: ['minimal', 'monochrome'] },
  { id: 'c6', image: drive.d13, caption: 'Layered art · warm ceremony',          tags: ['bold', 'warm'] },
];

const axisLabel: Record<Axis, string> = {
  minimal: 'Modern Minimalist',
  warm: 'Warm Organic',
  bold: 'Bold Statement',
  classical: 'Sculpted Classical',
  monochrome: 'Refined Monochrome',
  opulent: 'Opulent Contemporary',
};

const axisBlurb: Record<Axis, string> = {
  minimal: 'Quiet lines, generous negative space, and a palette that breathes.',
  warm: 'Tactile textiles, earthy stone, and lighting that lingers like late sun.',
  bold: 'Sculptural silhouettes, layered art, and rooms that hold a point of view.',
  classical: 'Arches, mouldings, and ceremony — recomposed for the way you live now.',
  monochrome: 'A single-tone discipline where material and light do all the talking.',
  opulent: 'Deep hardware, brass details, and a sense of considered generosity.',
};

const axisToProjectKeys: Record<Axis, string[]> = {
  minimal: ['a5', 'office1', 'office2'],
  warm: ['livingDining', 'a1'],
  bold: ['livingArch', 'a4'],
  classical: ['livingArch', 'a1', 'a4'],
  monochrome: ['a5', 'office2'],
  opulent: ['livingArch', 'a1', 'livingDining'],
};

interface Props {
  onClose: () => void;
}

const DesignDnaQuiz = ({ onClose }: Props) => {
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState<Record<Axis, number>>({
    minimal: 0, warm: 0, bold: 0, classical: 0, monochrome: 0, opulent: 0,
  });
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const passOpacity = useTransform(x, [-120, -20], [1, 0]);

  const done = index >= cards.length;
  const current = cards[index];
  const { markCompleted } = useGameProgress();

  const decide = (like: boolean) => {
    if (like && current) {
      setScores((s) => {
        const next = { ...s };
        current.tags.forEach((t) => (next[t] = next[t] + 2));
        return next;
      });
    }
    x.set(0);
    setIndex((i) => i + 1);
  };

  const onDragEnd = (_e: unknown, info: PanInfo) => {
    if (info.offset.x > 100) decide(true);
    else if (info.offset.x < -100) decide(false);
    else x.set(0);
  };

  const result = useMemo(() => {
    if (!done) return null;
    const sorted = (Object.entries(scores) as [Axis, number][])
      .sort((a, b) => b[1] - a[1]);
    const [primary, secondary] = sorted;
    const totalPossible = cards.length * 2; // if every card liked contributes 2 per matching tag
    const pct = Math.max(35, Math.round((primary[1] / totalPossible) * 100));
    const primaryAxis = primary[0];
    const secondaryAxis = secondary[1] > 0 ? secondary[0] : primaryAxis;
    const label = axisLabel[primaryAxis];
    const secondaryLabel = axisLabel[secondaryAxis];
    const keys = new Set<string>();
    [primaryAxis, secondaryAxis].forEach((a) =>
      axisToProjectKeys[a].forEach((k) => keys.add(k)),
    );
    const matched = galleryProjects.filter((p) => keys.has(p.key)).slice(0, 3);
    const summary = `${label} · ${pct}% · accented by ${secondaryLabel}`;
    return { primaryAxis, secondaryAxis, label, secondaryLabel, pct, matched, summary };
  }, [done, scores]);

  // Mark completed once when result computes
  useMemo(() => {
    if (result) {
      markCompleted('dna', { result: result.summary });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result?.summary]);

  const downloadPoster = () => {
    if (!result) return;
    const svg = buildPosterSvg(result.label, result.pct, result.secondaryLabel);
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `design-dna-${result.label.toLowerCase().replace(/\s+/g, '-')}.svg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const openWhatsapp = () => {
    if (!result) return;
    const msg = `Hi Aarav — I just took the Design DNA quiz. My style is *${result.label}* (${result.pct}%) accented by *${result.secondaryLabel}*. I'd love to discuss a project.`;
    const url = `https://wa.me/919599765044?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener');
  };

  return (
    <div className="relative w-full max-w-2xl bg-cream text-charcoal overflow-hidden shadow-2xl">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-charcoal/10 transition-colors"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>

      {!done ? (
        <div className="p-6 md:p-10">
          {/* Progress ring / bar */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] uppercase tracking-[0.4em] text-bronze tabular-nums">
              {String(index + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}
            </span>
            <div className="h-px flex-1 bg-charcoal/15 relative overflow-hidden">
              <motion.div
                initial={false}
                animate={{ width: `${(index / cards.length) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-y-0 left-0 bg-bronze"
              />
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-charcoal/50 hidden md:inline">
              Swipe / tap
            </span>
          </div>

          <h3 className="font-serif font-light leading-[1.15] text-2xl md:text-3xl">
            Does this feel like <span className="italic">home</span>?
          </h3>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-charcoal/50">
            Trust your gut — no wrong answers
          </p>

          {/* Card deck */}
          <div className="relative mt-6 h-[360px] md:h-[420px]">
            <AnimatePresence>
              {cards
                .slice(index, index + 3)
                .reverse()
                .map((c, i, arr) => {
                  const depth = arr.length - 1 - i; // 0 = top
                  const isTop = depth === 0;
                  return (
                    <motion.div
                      key={c.id}
                      drag={isTop ? 'x' : false}
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      style={isTop ? { x, rotate } : undefined}
                      onDragEnd={isTop ? onDragEnd : undefined}
                      initial={{ scale: 0.94 - depth * 0.04, y: depth * 12, opacity: 0 }}
                      animate={{ scale: 1 - depth * 0.04, y: depth * 12, opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className={`absolute inset-0 overflow-hidden bg-charcoal shadow-xl ${isTop ? 'cursor-grab active:cursor-grabbing' : ''}`}
                    >
                      <img
                        src={c.image}
                        alt={c.caption}
                        draggable={false}
                        className="h-full w-full object-cover pointer-events-none select-none"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 to-transparent p-5 pt-16">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-bronze">
                          Mood
                        </span>
                        <p className="mt-1 font-serif italic text-cream text-lg md:text-xl">
                          {c.caption}
                        </p>
                      </div>

                      {isTop && (
                        <>
                          <motion.div
                            style={{ opacity: likeOpacity }}
                            className="absolute top-6 left-6 border-2 border-bronze px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-bronze bg-cream/90"
                          >
                            Love
                          </motion.div>
                          <motion.div
                            style={{ opacity: passOpacity }}
                            className="absolute top-6 right-6 border-2 border-cream px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-cream bg-charcoal/70"
                          >
                            Pass
                          </motion.div>
                        </>
                      )}
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>

          {/* Tap controls */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              onClick={() => decide(false)}
              className="h-14 w-14 rounded-full border border-charcoal/25 flex items-center justify-center hover:bg-charcoal hover:text-cream transition-colors"
              aria-label="Pass"
            >
              <X className="h-5 w-5" />
            </button>
            <span className="text-[10px] uppercase tracking-[0.3em] text-charcoal/40">
              Swipe left · pass · right · love
            </span>
            <button
              onClick={() => decide(true)}
              className="h-14 w-14 rounded-full bg-bronze text-charcoal flex items-center justify-center hover:bg-charcoal hover:text-cream transition-colors"
              aria-label="Love"
            >
              <Check className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0">
              <img
                src={result.matched[0]?.src || portfolio.livingArch}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-charcoal/80" />
            </div>

            <div className="relative p-8 md:p-12 text-cream">
              <span className="text-[10px] uppercase tracking-[0.4em] text-bronze">
                Your Design DNA
              </span>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mt-4 font-serif italic font-light leading-[1.05] text-4xl md:text-5xl text-balance"
              >
                {result.label}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-4 flex items-baseline gap-4"
              >
                <span className="font-serif text-3xl text-bronze tabular-nums">
                  {result.pct}%
                </span>
                <span className="text-[11px] uppercase tracking-[0.3em] text-cream/70">
                  accented by {result.secondaryLabel}
                </span>
              </motion.div>
              <p className="mt-5 max-w-md text-sm md:text-base font-light text-cream/80 leading-relaxed">
                {axisBlurb[result.primaryAxis]}
              </p>

              {result.matched.length > 0 && (
                <div className="mt-8">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-cream/60">
                    Projects that match your DNA
                  </span>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {result.matched.map((p) => (
                      <div key={p.key} className="relative aspect-[3/4] overflow-hidden">
                        <img src={p.src} alt={p.title} className="h-full w-full object-cover" />
                        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-charcoal/90 to-transparent">
                          <p className="font-serif italic text-cream text-xs leading-tight">
                            {p.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Perk unlock */}
              <div className="mt-8 border border-bronze/40 bg-charcoal/40 p-4">
                <div className="flex items-center gap-2 text-bronze text-[10px] uppercase tracking-[0.3em]">
                  <Check className="h-3.5 w-3.5" /> Perk unlocked
                </div>
                <p className="mt-2 text-sm text-cream/85">
                  Your personal mood-board poster + a WhatsApp shortcut to Aarav.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={openWhatsapp}
                  className="inline-flex items-center gap-2 bg-bronze text-charcoal px-5 py-3 text-[11px] uppercase tracking-[0.3em] hover:bg-cream transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Discuss with Aarav
                </button>
                <button
                  onClick={downloadPoster}
                  className="inline-flex items-center gap-2 border border-cream/50 px-5 py-3 text-[11px] uppercase tracking-[0.3em] hover:border-cream hover:bg-cream/10 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download poster
                </button>
                <button
                  onClick={() => {
                    setIndex(0);
                    setScores({ minimal: 0, warm: 0, bold: 0, classical: 0, monochrome: 0, opulent: 0 });
                    x.set(0);
                  }}
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-cream/60 hover:text-cream px-2 py-3"
                >
                  <RotateCw className="h-3.5 w-3.5" /> Retake
                </button>
              </div>
            </div>
          </motion.div>
        )
      )}
    </div>
  );
};

function buildPosterSvg(label: string, pct: number, secondary: string): string {
  const w = 900;
  const h = 1200;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <rect width="${w}" height="${h}" fill="#1a1a1a"/>
  <g fill="#f9f6f0" font-family="Georgia, 'Cormorant Garamond', serif">
    <text x="60" y="120" font-size="18" letter-spacing="6" fill="#B08D57">DESIGN BY AARAV — DESIGN DNA</text>
    <line x1="60" y1="150" x2="${w - 60}" y2="150" stroke="#B08D57" stroke-width="1"/>
    <text x="60" y="360" font-size="86" font-style="italic" font-weight="300">${escapeXml(label)}</text>
    <text x="60" y="440" font-size="120" fill="#B08D57" font-weight="300">${pct}%</text>
    <text x="60" y="500" font-size="22" letter-spacing="4" fill="#f9f6f0" opacity="0.7">ACCENTED BY ${escapeXml(secondary.toUpperCase())}</text>
    <text x="60" y="${h - 140}" font-size="18" letter-spacing="4" fill="#B08D57">A SIGNATURE, NOT A STYLE</text>
    <text x="60" y="${h - 100}" font-size="16" letter-spacing="3" opacity="0.6">designbyaarav.com · +91 95997 65044</text>
  </g>
</svg>`;
}

function escapeXml(s: string) {
  return s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c] as string));
}

export default DesignDnaQuiz;
