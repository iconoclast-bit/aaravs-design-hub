import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Gamepad2, Lock, Sparkles, X, Check } from 'lucide-react';
import { useGameProgress, type GameId } from '@/hooks/useGameProgress';
import DesignDnaQuiz from './DesignDnaQuiz';
import SpotTheDetail from './SpotTheDetail';
import InvestmentQuest from './InvestmentQuest';
import RoomPlayground from './RoomPlayground';

interface GameMeta {
  id: GameId;
  index: string;
  title: string;
  subtitle: string;
  perk: string;
}

const games: GameMeta[] = [
  {
    id: 'dna',
    index: '01',
    title: 'Design DNA',
    subtitle: 'Swipe six mood cards. Unlock your personal style profile.',
    perk: 'Mood-board poster + WhatsApp shortcut',
  },
  {
    id: 'spot',
    index: '02',
    title: 'Spot the Detail',
    subtitle: 'Hunt hidden craft details across the portfolio.',
    perk: 'Private "unpublished works" gallery',
  },
  {
    id: 'estimator',
    index: '03',
    title: 'Investment Quest',
    subtitle: 'A four-step ballpark for budget & timeline.',
    perk: 'Free 30-min consult booking',
  },
  {
    id: 'roomBuilder',
    index: '04',
    title: 'Room Playground',
    subtitle: 'Swap palettes, lighting, finishes on a live room.',
    perk: 'Personalised design brief to Aarav',
  },
];

type View = 'menu' | GameId;

const HINT_STORAGE = 'dba:games:hint-seen';

const GameLauncher = () => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>('menu');
  const [showHint, setShowHint] = useState(false);
  const { progress } = useGameProgress();

  const unlockedCount = Object.values(progress).filter((r) => r?.perkUnlocked).length;
  const hasPlayed = Object.keys(progress).length > 0;

  // First-visit hint: auto-show bronze whisper after 4s, dismiss after 10s
  // or on any interaction. Persists via localStorage so returning visitors
  // aren't nudged again.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seen = window.localStorage.getItem(HINT_STORAGE);
    if (seen || hasPlayed) return;
    const showTimer = setTimeout(() => setShowHint(true), 4000);
    const hideTimer = setTimeout(() => {
      setShowHint(false);
      window.localStorage.setItem(HINT_STORAGE, '1');
    }, 14000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [hasPlayed]);

  const dismissHint = () => {
    setShowHint(false);
    try {
      window.localStorage.setItem(HINT_STORAGE, '1');
    } catch {
      /* noop */
    }
  };

  const openLauncher = () => {
    dismissHint();
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setTimeout(() => setView('menu'), 400);
  };

  return (
    <>
      {/* Floating trigger cluster */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        {/* First-visit hint bubble */}
        <AnimatePresence>
          {showHint && !open && (
            <motion.button
              initial={{ opacity: 0, y: 12, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onClick={openLauncher}
              className="relative max-w-[260px] bg-cream text-charcoal border border-bronze/40 pl-4 pr-8 py-3 shadow-2xl text-left group"
            >
              <span className="absolute -bottom-1.5 right-8 h-3 w-3 bg-cream border-b border-r border-bronze/40 rotate-45" />
              <span className="text-[9px] uppercase tracking-[0.35em] text-bronze">
                Interactive studio
              </span>
              <p className="mt-1 font-serif italic text-[15px] leading-snug">
                Four experiences. Each unlocks a real perk.
              </p>
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  dismissHint();
                }}
                className="absolute top-1.5 right-1.5 p-1 rounded-full hover:bg-charcoal/10 transition-colors"
                aria-label="Dismiss"
              >
                <X className="h-3 w-3" />
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Trigger button with pulse */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          onClick={openLauncher}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="relative group flex items-center gap-2 rounded-full bg-charcoal text-cream border border-bronze/60 pl-4 pr-5 py-3 text-[11px] uppercase tracking-[0.25em] shadow-2xl hover:bg-bronze hover:text-charcoal transition-colors"
          aria-label="Open interactive experiences"
        >
          {/* Slow bronze halo — only until the user has engaged */}
          {!hasPlayed && (
            <>
              <span className="absolute inset-0 rounded-full border border-bronze/50 animate-ping [animation-duration:2.6s] pointer-events-none" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-bronze opacity-70 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-bronze" />
              </span>
            </>
          )}
          <Gamepad2 className="h-4 w-4 text-bronze group-hover:text-charcoal transition-colors" />
          <span className="hidden sm:inline">Play &amp; Discover</span>
          <span className="sm:hidden">Play</span>
          {unlockedCount > 0 && (
            <span className="ml-1 rounded-full bg-bronze text-charcoal group-hover:bg-charcoal group-hover:text-bronze h-5 min-w-[20px] px-1 flex items-center justify-center text-[10px] tabular-nums">
              {unlockedCount}
            </span>
          )}
        </motion.button>
      </div>

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
              className="relative w-full my-auto flex justify-center"
            >
              {view === 'menu' ? (
                <div className="relative w-full max-w-2xl bg-cream text-charcoal shadow-2xl">
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
                              onClick={() => setView(g.id)}
                              className="group w-full flex items-start md:items-center gap-4 py-5 text-left transition-colors hover:bg-charcoal/[0.03]"
                            >
                              <span className="font-serif italic text-bronze text-xl tabular-nums w-8 shrink-0 pt-0.5 md:pt-0">
                                {g.index}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 flex-wrap">
                                  <h3 className="font-serif text-lg md:text-xl">
                                    {g.title}
                                  </h3>
                                  {unlocked ? (
                                    <span className="inline-flex items-center gap-1 border border-bronze text-bronze px-2 py-0.5 text-[9px] uppercase tracking-[0.3em]">
                                      <Check className="h-3 w-3" /> Perk
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 border border-charcoal/25 text-charcoal/55 px-2 py-0.5 text-[9px] uppercase tracking-[0.3em]">
                                      <Lock className="h-3 w-3" /> Locked
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
                              <span className="hidden md:inline-block text-[11px] uppercase tracking-[0.3em] text-charcoal/50 group-hover:text-charcoal transition-colors">
                                {unlocked ? 'Replay' : 'Play'} →
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ) : view === 'dna' ? (
                <DesignDnaQuiz onClose={close} />
              ) : view === 'spot' ? (
                <SpotTheDetail onClose={close} />
              ) : view === 'estimator' ? (
                <InvestmentQuest onClose={close} />
              ) : view === 'roomBuilder' ? (
                <RoomPlayground onClose={close} />
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GameLauncher;
