import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { portfolio } from '@/assets/portfolio';

type Answers = [string?, string?, string?];

const steps = [
  {
    q: "What's your ideal vibe?",
    options: ['Clean & Minimal', 'Warm & Cozy', 'Bold & Luxurious'],
  },
  {
    q: 'Pick a color palette.',
    options: ['Earthy Neutrals', 'Monochromes', 'Rich & Moody'],
  },
  {
    q: 'Space preference?',
    options: ['Open & Airy', 'Intimate & Sectioned'],
  },
];

const resultBackgrounds = [portfolio.livingArch, portfolio.a1, portfolio.livingDining, portfolio.a5];

function computeStyle(a: Answers): string {
  const [vibe, palette, space] = a;
  if (vibe === 'Bold & Luxurious' && palette === 'Rich & Moody') return 'Opulent Contemporary Luxe';
  if (vibe === 'Clean & Minimal' && space === 'Open & Airy') return 'Modern Minimalist Luxury';
  if (vibe === 'Warm & Cozy' && palette === 'Earthy Neutrals') return 'Organic Warm Modern';
  if (palette === 'Monochromes') return 'Refined Monochrome Editorial';
  if (space === 'Intimate & Sectioned') return 'Classical Elegance Revival';
  return 'Considered Contemporary';
}

const StyleQuiz = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>([]);
  const done = step >= steps.length;
  const result = done ? computeStyle(answers) : '';
  const bg = resultBackgrounds[(answers.join('').length) % resultBackgrounds.length];

  const reset = () => { setStep(0); setAnswers([]); };
  const close = () => { setOpen(false); setTimeout(reset, 400); };

  const pick = (opt: string) => {
    const next = [...answers] as Answers;
    next[step] = opt;
    setAnswers(next);
    setTimeout(() => setStep((s) => s + 1), 150);
  };

  const discuss = () => {
    close();
    const msg = `Hi Aarav, I just took the quiz and my design style is ${result}. I'd like to discuss a project!`;
    sessionStorage.setItem('quizPrefillMessage', msg);
    window.dispatchEvent(new CustomEvent('quiz:prefill', { detail: msg }));
    setTimeout(() => {
      document.getElementById('inquire')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      {/* Floating trigger */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-charcoal text-cream border border-bronze/50 pl-4 pr-5 py-3 text-[11px] uppercase tracking-[0.25em] shadow-2xl hover:bg-bronze hover:text-charcoal transition-colors"
        aria-label="Find your design style"
      >
        <Sparkles className="h-4 w-4 text-bronze group-hover:text-charcoal" />
        <span className="hidden sm:inline">Find Your Design Style</span>
        <span className="sm:hidden">Style Quiz</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm"
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl bg-cream text-charcoal overflow-hidden shadow-2xl"
            >
              <button
                onClick={close}
                className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-charcoal/10 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              {!done ? (
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-2 mb-8">
                    {steps.map((_, i) => (
                      <div
                        key={i}
                        className={`h-px flex-1 transition-colors ${i <= step ? 'bg-bronze' : 'bg-charcoal/15'}`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-bronze">
                    Step {step + 1} of {steps.length}
                  </span>
                  <h3 className="mt-4 font-serif font-light leading-[1.15] text-3xl md:text-4xl">
                    {steps[step].q}
                  </h3>
                  <div className="mt-8 grid gap-3">
                    {steps[step].options.map((opt) => (
                      <motion.button
                        key={opt}
                        onClick={() => pick(opt)}
                        whileHover={{ x: 6 }}
                        whileTap={{ scale: 0.99 }}
                        className={`group flex items-center justify-between border border-charcoal/20 px-5 py-4 text-left transition-colors hover:border-charcoal hover:bg-charcoal hover:text-cream ${answers[step] === opt ? 'bg-charcoal text-cream border-charcoal' : ''}`}
                      >
                        <span className="text-sm md:text-base font-light">{opt}</span>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute inset-0">
                    <img src={bg} alt="" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-charcoal/70" />
                  </div>
                  <div className="relative p-10 md:p-14 text-cream">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-bronze">
                      Your Design Style
                    </span>
                    <h3 className="mt-6 font-serif italic font-light leading-[1.1] text-4xl md:text-5xl text-balance">
                      {result}
                    </h3>
                    <p className="mt-6 max-w-md text-sm md:text-base font-light text-cream/80 leading-relaxed">
                      A signature direction shaped by your answers — let's translate it
                      into a space that feels unmistakably yours.
                    </p>
                    <div className="mt-10 flex flex-wrap gap-3">
                      <button
                        onClick={discuss}
                        className="bg-bronze text-charcoal px-6 py-3 text-[11px] uppercase tracking-[0.3em] hover:bg-cream transition-colors"
                      >
                        Discuss this style with Aarav
                      </button>
                      <button
                        onClick={reset}
                        className="border border-cream/40 px-6 py-3 text-[11px] uppercase tracking-[0.3em] hover:border-cream transition-colors"
                      >
                        Retake
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StyleQuiz;
