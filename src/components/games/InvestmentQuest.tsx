import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, MessageCircle, X, Sparkles } from 'lucide-react';
import { useGameProgress } from '@/hooks/useGameProgress';

type SpaceType = 'apartment' | 'villa' | 'office' | 'retail';
type Tier = 'refined' | 'bespoke' | 'atelier';
type Urgency = 'flexible' | 'planned' | 'urgent';

interface State {
  space: SpaceType | null;
  sizeSqft: number;
  tier: Tier | null;
  urgency: Urgency | null;
}

const spaceOptions: { id: SpaceType; label: string; blurb: string }[] = [
  { id: 'apartment', label: 'Apartment', blurb: '2 – 4 BHK residences' },
  { id: 'villa', label: 'Villa / Farmhouse', blurb: 'Standalone homes' },
  { id: 'office', label: 'Office', blurb: 'Studios & workspaces' },
  { id: 'retail', label: 'Hospitality / Retail', blurb: 'Boutique commercial' },
];

const tierOptions: { id: Tier; label: string; blurb: string; multiplier: number }[] = [
  { id: 'refined', label: 'Refined', blurb: 'Considered essentials, curated finishes', multiplier: 1 },
  { id: 'bespoke', label: 'Bespoke', blurb: 'Custom joinery, tailored materials', multiplier: 1.6 },
  { id: 'atelier', label: 'Atelier', blurb: 'Full craft, art-direction, imported detail', multiplier: 2.4 },
];

const urgencyOptions: { id: Urgency; label: string; weeks: string }[] = [
  { id: 'flexible', label: 'Flexible · 6+ months', weeks: '24 – 32 weeks' },
  { id: 'planned', label: 'Planned · 3 – 6 months', weeks: '16 – 22 weeks' },
  { id: 'urgent', label: 'Urgent · under 3 months', weeks: '10 – 14 weeks' },
];

const spaceBase: Record<SpaceType, number> = {
  apartment: 2200,
  villa: 3200,
  office: 1800,
  retail: 2600,
};

interface Props {
  onClose: () => void;
}

const inr = (n: number) => {
  if (n >= 10000000) return `₹ ${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹ ${(n / 100000).toFixed(1)} L`;
  return `₹ ${Math.round(n).toLocaleString('en-IN')}`;
};

const InvestmentQuest = ({ onClose }: Props) => {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<State>({
    space: null,
    sizeSqft: 1400,
    tier: null,
    urgency: null,
  });
  const { markCompleted } = useGameProgress();

  const done = step === 4;

  const range = useMemo(() => {
    if (!state.space || !state.tier || !state.urgency) return null;
    const perSqft = spaceBase[state.space] * tierOptions.find((t) => t.id === state.tier)!.multiplier;
    const urgencyBump = state.urgency === 'urgent' ? 1.12 : state.urgency === 'planned' ? 1.04 : 1;
    const mid = perSqft * state.sizeSqft * urgencyBump;
    const low = mid * 0.85;
    const high = mid * 1.2;
    const weeks = urgencyOptions.find((u) => u.id === state.urgency)!.weeks;
    return { low, high, weeks };
  }, [state]);

  useEffect(() => {
    if (done && range) {
      markCompleted('estimator', { result: `${inr(range.low)} – ${inr(range.high)}` });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const canAdvance =
    (step === 0 && state.space) ||
    (step === 1 && state.sizeSqft > 0) ||
    (step === 2 && state.tier) ||
    (step === 3 && state.urgency);

  const openWhatsapp = () => {
    if (!range || !state.space || !state.tier || !state.urgency) return;
    const msg = `Hi Aarav — I just completed the Investment Quest.\n\n• Space: ${state.space}\n• Size: ${state.sizeSqft} sqft\n• Tier: ${state.tier}\n• Timeline: ${state.urgency}\n• Ballpark: ${inr(range.low)} – ${inr(range.high)}\n\nI'd like to book my complimentary 30-min consult.`;
    window.open(
      `https://wa.me/919599765044?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener',
    );
  };

  const stepTitles = ['Space', 'Size', 'Finish', 'Timeline'];

  return (
    <div className="relative w-full max-w-2xl bg-cream text-charcoal shadow-2xl overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-charcoal/10 transition-colors"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="p-6 md:p-10">
        <div className="flex items-center gap-2 text-bronze">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-[10px] uppercase tracking-[0.4em]">Investment Quest</span>
        </div>

        {!done && (
          <div className="mt-4 flex items-center gap-3">
            {stepTitles.map((t, i) => (
              <div key={t} className="flex items-center gap-3 flex-1">
                <span
                  className={`text-[10px] uppercase tracking-[0.3em] tabular-nums ${
                    i === step ? 'text-bronze' : i < step ? 'text-charcoal/70' : 'text-charcoal/30'
                  }`}
                >
                  0{i + 1} {t}
                </span>
                {i < stepTitles.length - 1 && (
                  <div className="h-px flex-1 bg-charcoal/15 relative overflow-hidden">
                    <motion.div
                      initial={false}
                      animate={{ width: i < step ? '100%' : '0%' }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-y-0 left-0 bg-bronze"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 min-h-[280px]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="s0"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-serif font-light text-2xl md:text-3xl">
                  What are we <span className="italic">designing</span>?
                </h3>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {spaceOptions.map((o) => (
                    <button
                      key={o.id}
                      onClick={() => setState((s) => ({ ...s, space: o.id }))}
                      className={`text-left p-4 border transition-all ${
                        state.space === o.id
                          ? 'border-bronze bg-bronze/5'
                          : 'border-charcoal/15 hover:border-charcoal/40'
                      }`}
                    >
                      <p className="font-serif text-lg">{o.label}</p>
                      <p className="text-xs text-charcoal/55 mt-0.5">{o.blurb}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-serif font-light text-2xl md:text-3xl">
                  How much <span className="italic">space</span>?
                </h3>
                <div className="mt-10">
                  <div className="flex items-baseline gap-3">
                    <motion.span
                      key={state.sizeSqft}
                      initial={{ opacity: 0.4, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="font-serif text-5xl text-bronze tabular-nums"
                    >
                      {state.sizeSqft.toLocaleString('en-IN')}
                    </motion.span>
                    <span className="text-[11px] uppercase tracking-[0.3em] text-charcoal/60">
                      sqft
                    </span>
                  </div>
                  <input
                    type="range"
                    min={400}
                    max={8000}
                    step={100}
                    value={state.sizeSqft}
                    onChange={(e) =>
                      setState((s) => ({ ...s, sizeSqft: Number(e.target.value) }))
                    }
                    className="mt-6 w-full accent-bronze"
                  />
                  <div className="mt-1 flex justify-between text-[10px] uppercase tracking-[0.3em] text-charcoal/45">
                    <span>400</span>
                    <span>8,000</span>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-serif font-light text-2xl md:text-3xl">
                  Which <span className="italic">tier</span> of craft?
                </h3>
                <div className="mt-6 space-y-2">
                  {tierOptions.map((o) => (
                    <button
                      key={o.id}
                      onClick={() => setState((s) => ({ ...s, tier: o.id }))}
                      className={`w-full text-left p-4 border transition-all flex items-baseline justify-between gap-4 ${
                        state.tier === o.id
                          ? 'border-bronze bg-bronze/5'
                          : 'border-charcoal/15 hover:border-charcoal/40'
                      }`}
                    >
                      <div>
                        <p className="font-serif text-lg">{o.label}</p>
                        <p className="text-xs text-charcoal/55 mt-0.5">{o.blurb}</p>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-bronze tabular-nums">
                        ×{o.multiplier.toFixed(1)}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="s3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-serif font-light text-2xl md:text-3xl">
                  On what <span className="italic">timeline</span>?
                </h3>
                <div className="mt-6 space-y-2">
                  {urgencyOptions.map((o) => (
                    <button
                      key={o.id}
                      onClick={() => setState((s) => ({ ...s, urgency: o.id }))}
                      className={`w-full text-left p-4 border transition-all flex items-baseline justify-between gap-4 ${
                        state.urgency === o.id
                          ? 'border-bronze bg-bronze/5'
                          : 'border-charcoal/15 hover:border-charcoal/40'
                      }`}
                    >
                      <p className="font-serif text-lg">{o.label}</p>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-charcoal/50">
                        {o.weeks}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {done && range && (
              <motion.div
                key="done"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="text-center"
              >
                <span className="text-[10px] uppercase tracking-[0.4em] text-bronze">
                  Estimated investment
                </span>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className="mt-3 font-serif font-light text-3xl md:text-5xl leading-tight"
                >
                  <span className="italic">{inr(range.low)}</span>
                  <span className="text-charcoal/40 mx-3">—</span>
                  <span className="italic">{inr(range.high)}</span>
                </motion.div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  className="mx-auto mt-4 h-px w-32 bg-bronze origin-left"
                />
                <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-charcoal/60">
                  Build window · {range.weeks}
                </p>
                <p className="mt-4 max-w-md mx-auto text-xs text-charcoal/55 font-serif italic">
                  A ballpark, not a quote. The real number lives in the details we'll shape
                  together.
                </p>

                <div className="mt-6 border border-bronze/40 bg-charcoal text-cream p-4 text-left">
                  <div className="flex items-center gap-2 text-bronze text-[10px] uppercase tracking-[0.3em]">
                    <Check className="h-3.5 w-3.5" /> Perk unlocked
                  </div>
                  <p className="mt-2 text-sm text-cream/85">
                    Complimentary 30-min consult + priority WhatsApp reply on your follow-up.
                  </p>
                  <button
                    onClick={openWhatsapp}
                    className="mt-4 inline-flex items-center gap-2 bg-bronze text-charcoal px-5 py-3 text-[11px] uppercase tracking-[0.3em] hover:bg-cream transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Claim my consult
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!done && (
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-charcoal/50 hover:text-charcoal disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canAdvance}
              className="inline-flex items-center gap-2 bg-charcoal text-cream px-6 py-3 text-[11px] uppercase tracking-[0.3em] hover:bg-bronze hover:text-charcoal disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {step === 3 ? 'Reveal estimate' : 'Continue'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentQuest;
