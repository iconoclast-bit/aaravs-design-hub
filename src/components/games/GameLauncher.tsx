import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Gamepad2, Lock, Sparkles, X, Check } from 'lucide-react';
import { useGameProgress, type GameId } from '@/hooks/useGameProgress';
import DesignDnaQuiz from './DesignDnaQuiz';

interface GameMeta {
  id: GameId;
  index: string;
  title: string;
  subtitle: string;
  perk: string;
  available: boolean;
}

const games: GameMeta[] = [
  {
    id: 'dna',
    index: '01',
    title: 'Design DNA',
    subtitle: 'Swipe six mood cards. Unlock your personal style profile.',
    perk: 'Mood-board poster + WhatsApp shortcut',
    available: true,
  },
  {
    id: 'spot',
    index: '02',
    title: 'Spot the Detail',
    subtitle: 'Hunt hidden craft details across the portfolio.',
    perk: 'Private "unpublished works" gallery',
    available: false,
  },
  {
    id: 'estimator',
    index: '03',
    title: 'Investment Quest',
    subtitle: 'A four-step ballpark for budget & timeline.',
    perk: 'Free 30-min consult booking',
    available: false,
  },
  {
    id: 'roomBuilder',
    index: '04',
    title: 'Room Playground',
    subtitle: 'Swap palettes, lighting, finishes on a live room.',
    perk: 'Personalised design brief to Aarav',
    available: false,
  },
];

type View = 'menu' | GameId;

const GameLauncher = () => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>('menu');
  const { progress } = useGameProgress();

  const unlockedCount = Object.values(progress).filter((r) => r?.perkUnlocked).length;

  const close = () => {
    setOpen(false);
    setTimeout(() => setView('menu'), 400);
  };

  return (
    <>
      {/* Floating trigger */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-5 right-5 z-50 group flex items-center gap-2 rounded-full bg-charcoal text-cream border border-bronze/50 pl-4 pr-5 py-3 text-[11px] uppercase tracking-[0.25em] shadow-2xl hover:bg-bronze hover:text-charcoal transition-colors"
        aria-label="Open interactive experiences"
      >
        <Gamepad2 className="h-4 w-4 text-bronze group-hover:text-charcoal transition-colors" />
        <span className="hidden sm:inline">Play & Discover</span>
        <span className="sm:hidden">Play</span>
        {unlockedCount > 0 && (
          <span className="ml-1 rounded-full bg-bronze text-charcoal group-hover:bg-charcoal group-hover:text-bronze h-5 min-w-[20px] px-1 flex items-center justify-center text-[10px] tabular-nums">
            {unlockedCount}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm overflow-y-auto"
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl my-auto"
            >
              {view === 'menu' ? (
                <div className="bg-cream text-charcoal shadow-2xl">
                  <button
                    onClick={close}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-charcoal/10 transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="p-8 md:p-12">
                    <div className="flex items-center gap-2 text-bronze">
                      <Sparkles className="h-4 w-4" />
                      <span className="text-[10px] uppercase tracking-[0.4em]">
                        Interactive Studio
                      </span>
                    </div>
                    <h2 className="mt-3 font-serif font-light leading-[1.1] text-3xl md:text-4xl">
                      Four ways to <span className="italic">discover</span> your space.
                    </h2>
                    <p className="mt-3 text-sm text-charcoal/60 max-w-md">
                      Each experience unlocks a real perk — from mood-board posters to
                      private consultations with Aarav.
                    </p>

                    <ul className="mt-8 divide-y divide-charcoal/10 border-y border-charcoal/10">
                      {games.map((g) => {
                        const record = progress[g.id];
                        const unlocked = record?.perkUnlocked;
                        return (
                          <li key={g.id}>
                            <button
                              disabled={!g.available}
                              onClick={() => g.available && setView(g.id)}
                              className={`group w-full flex items-start md:items-center gap-4 py-5 text-left transition-colors ${
                                g.available
                                  ? 'hover:bg-charcoal/[0.03]'
                                  : 'opacity-55 cursor-not-allowed'
                              }`}
                            >
                              <span className="font-serif italic text-bronze text-xl tabular-nums w-8 shrink-0 pt-0.5 md:pt-0">
                                {g.index}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 flex-wrap">
                                  <h3 className="font-serif text-lg md:text-xl">
                                    {g.title}
                                  </h3>
                                  {unlocked && (
                                    <span className="inline-flex items-center gap-1 border border-bronze text-bronze px-2 py-0.5 text-[9px] uppercase tracking-[0.3em]">
                                      <Check className="h-3 w-3" /> Perk
                                    </span>
                                  )}
                                  {!g.available && (
                                    <span className="inline-flex items-center gap-1 border border-charcoal/30 text-charcoal/50 px-2 py-0.5 text-[9px] uppercase tracking-[0.3em]">
                                      <Lock className="h-3 w-3" /> Coming soon
                                    </span>
                                  )}
                                </div>
                                <p className="mt-1 text-sm text-charcoal/60">
                                  {g.subtitle}
                                </p>
                                <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-bronze/80">
                                  Unlocks · {g.perk}
                                </p>
                              </div>
                              {g.available && (
                                <span className="hidden md:inline-block text-[11px] uppercase tracking-[0.3em] text-charcoal/50 group-hover:text-charcoal transition-colors">
                                  {unlocked ? 'Replay' : 'Play'} →
                                </span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ) : view === 'dna' ? (
                <DesignDnaQuiz onClose={close} />
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GameLauncher;
