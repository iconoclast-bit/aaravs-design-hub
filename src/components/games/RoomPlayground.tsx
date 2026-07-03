import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MessageCircle, X, Sparkles } from 'lucide-react';
import { portfolio } from '@/assets/portfolio';
import { drive } from '@/assets/drive';
import { useGameProgress } from '@/hooks/useGameProgress';

type RoomKey = 'living' | 'bedroom' | 'office' | 'foyer';

interface RoomLook {
  id: string;
  image: string;
  palette: string;
  lighting: string;
  finish: string;
  statement: string;
  swatches: string[]; // hex
}

const rooms: Record<RoomKey, { label: string; looks: RoomLook[] }> = {
  living: {
    label: 'Living',
    looks: [
      {
        id: 'l1',
        image: portfolio.livingArch,
        palette: 'Bone & clay',
        lighting: 'Warm cove wash',
        finish: 'Carved limestone arch',
        statement: 'Sculpted mural',
        swatches: ['#EFE7DA', '#B08D57', '#3A322B'],
      },
      {
        id: 'l2',
        image: drive.d13,
        palette: 'Ivory & ochre',
        lighting: 'Layered pendants',
        finish: 'Fluted plaster',
        statement: 'Framed textile art',
        swatches: ['#F6EFE0', '#C9A26A', '#2E2A24'],
      },
      {
        id: 'l3',
        image: drive.d4,
        palette: 'Deep espresso',
        lighting: 'Slatted shadow play',
        finish: 'Ribbed walnut',
        statement: 'Sculptural lounge',
        swatches: ['#211915', '#8A6B4C', '#D9C7B0'],
      },
      {
        id: 'l4',
        image: portfolio.a5,
        palette: 'Cream monochrome',
        lighting: 'Diffused daylight',
        finish: 'Sunburst geometry',
        statement: 'Silent focal wall',
        swatches: ['#F2ECDD', '#D4B896', '#4A4038'],
      },
    ],
  },
  bedroom: {
    label: 'Bedroom',
    looks: [
      {
        id: 'b1',
        image: drive.d19,
        palette: 'Linen & clay',
        lighting: 'Bedside sconces',
        finish: 'Bouclé headboard',
        statement: 'Draped canopy',
        swatches: ['#EDE3D0', '#B08D57', '#3B342C'],
      },
      {
        id: 'b2',
        image: drive.d20,
        palette: 'Ivory ceremony',
        lighting: 'Crystal chandelier',
        finish: 'Tailored panels',
        statement: 'Arched mirror',
        swatches: ['#F5EEDF', '#C9A570', '#2A2620'],
      },
      {
        id: 'b3',
        image: drive.d14,
        palette: 'Warm greige',
        lighting: 'Cove & pinspots',
        finish: 'Muted linen wall',
        statement: 'Arched niche',
        swatches: ['#E4D8C1', '#A98862', '#38312A'],
      },
      {
        id: 'b4',
        image: drive.d5,
        palette: 'Deep charcoal',
        lighting: 'Warm-dim to amber',
        finish: 'Leather headwall',
        statement: 'Brass framing',
        swatches: ['#1E1A16', '#8B6A44', '#D8C5A6'],
      },
    ],
  },
  office: {
    label: 'Office',
    looks: [
      {
        id: 'o1',
        image: drive.d7,
        palette: 'Walnut & bone',
        lighting: 'CRI-95 linear task',
        finish: 'Mitred joinery',
        statement: 'Display shelf',
        swatches: ['#2E251D', '#B48A5B', '#F0E6D3'],
      },
      {
        id: 'o2',
        image: drive.d9,
        palette: 'Neutral studio',
        lighting: 'Skylight wash',
        finish: 'Fluted glass screens',
        statement: 'Standing table',
        swatches: ['#F1EADB', '#C4A176', '#33302B'],
      },
      {
        id: 'o3',
        image: drive.d10,
        palette: 'Espresso focus',
        lighting: 'Directional spots',
        finish: 'Leather-topped desk',
        statement: 'Curated bookshelf',
        swatches: ['#221A14', '#9D7A54', '#E6D6BB'],
      },
      {
        id: 'o4',
        image: drive.d12,
        palette: 'Warm minimal',
        lighting: 'Warm ambient',
        finish: 'Rift-cut oak wall',
        statement: 'Sculpted lounge chair',
        swatches: ['#EFE6D3', '#B78E5A', '#3A322A'],
      },
    ],
  },
  foyer: {
    label: 'Foyer',
    looks: [
      {
        id: 'f1',
        image: drive.d1,
        palette: 'Stone & bronze',
        lighting: 'Sculptural pendant',
        finish: 'Book-matched stone',
        statement: 'Console vignette',
        swatches: ['#E7DCC5', '#B08D57', '#2C2621'],
      },
      {
        id: 'f2',
        image: drive.d3,
        palette: 'Warm ivory',
        lighting: 'Cove reveal',
        finish: 'Grooved plaster',
        statement: 'Framed mirror',
        swatches: ['#F0E7D4', '#C29A67', '#332C25'],
      },
      {
        id: 'f3',
        image: drive.d6,
        palette: 'Deep foyer',
        lighting: 'Downlight drama',
        finish: 'Fluted timber',
        statement: 'Art niche',
        swatches: ['#1D1712', '#8F6D48', '#DAC5A6'],
      },
      {
        id: 'f4',
        image: portfolio.a1,
        palette: 'Refined greige',
        lighting: 'Backlit shelving',
        finish: 'Bronze inlay',
        statement: 'Ceremonial door',
        swatches: ['#E3D6BF', '#A5824F', '#332C25'],
      },
    ],
  },
};

interface Props {
  onClose: () => void;
}

const RoomPlayground = ({ onClose }: Props) => {
  const [room, setRoom] = useState<RoomKey>('living');
  const [lookIdx, setLookIdx] = useState(0);
  const [saved, setSaved] = useState(false);
  const { markCompleted } = useGameProgress();

  const looks = rooms[room].looks;
  const look = looks[lookIdx];

  const swap = (key: 'palette' | 'lighting' | 'finish' | 'statement') => {
    // Rotate to next look — since composites are pre-designed, any "swap"
    // steps to the next curated combination, cross-fading the hero.
    setLookIdx((i) => (i + 1) % looks.length);
    // Prevent lint unused
    void key;
  };

  const chooseRoom = (r: RoomKey) => {
    setRoom(r);
    setLookIdx(0);
    setSaved(false);
  };

  const saveBoard = () => {
    setSaved(true);
    markCompleted('roomBuilder', {
      result: `${rooms[room].label} · ${look.palette}`,
    });
  };

  const openWhatsapp = () => {
    const msg = `Hi Aarav — here's the board I built:\n\n• Room: ${rooms[room].label}\n• Palette: ${look.palette}\n• Lighting: ${look.lighting}\n• Finish: ${look.finish}\n• Statement: ${look.statement}\n\nCan we turn this into a design brief?`;
    window.open(
      `https://wa.me/919599765044?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener',
    );
  };

  const rows = useMemo(
    () => [
      { key: 'palette' as const, label: 'Palette', value: look.palette },
      { key: 'lighting' as const, label: 'Lighting', value: look.lighting },
      { key: 'finish' as const, label: 'Finish', value: look.finish },
      { key: 'statement' as const, label: 'Statement', value: look.statement },
    ],
    [look],
  );

  return (
    <div className="relative w-full max-w-4xl bg-cream text-charcoal shadow-2xl overflow-hidden">
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
          <span className="text-[10px] uppercase tracking-[0.4em]">Room Playground</span>
        </div>
        <h3 className="mt-2 font-serif italic font-light text-2xl md:text-3xl">
          Compose your <span className="not-italic">room</span>.
        </h3>

        <div className="mt-4 flex flex-wrap gap-2">
          {(Object.keys(rooms) as RoomKey[]).map((r) => (
            <button
              key={r}
              onClick={() => chooseRoom(r)}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.3em] border transition-colors ${
                room === r
                  ? 'border-bronze bg-bronze text-charcoal'
                  : 'border-charcoal/20 text-charcoal/60 hover:border-charcoal'
              }`}
            >
              {rooms[r].label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-[1.4fr,1fr] gap-6 px-6 md:px-8 pb-6 md:pb-8">
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[380px] overflow-hidden bg-charcoal">
          <AnimatePresence mode="wait">
            <motion.img
              key={look.id}
              src={look.image}
              alt={`${rooms[room].label} — ${look.palette}`}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute left-4 bottom-4 flex gap-1.5">
            {look.swatches.map((c) => (
              <span
                key={c}
                className="h-6 w-6 rounded-full border border-cream/60 shadow"
                style={{ background: c }}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <ul className="divide-y divide-charcoal/10 border-y border-charcoal/10">
            {rows.map((r) => (
              <li key={r.key} className="py-3 flex items-baseline justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-bronze">
                    {r.label}
                  </p>
                  <p className="font-serif italic text-base mt-0.5 truncate">
                    {r.value}
                  </p>
                </div>
                <button
                  onClick={() => swap(r.key)}
                  className="shrink-0 text-[10px] uppercase tracking-[0.3em] text-charcoal/60 hover:text-charcoal border border-charcoal/20 hover:border-charcoal px-3 py-1.5 transition-colors"
                >
                  Swap
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-center gap-1.5">
            {looks.map((_, i) => (
              <button
                key={i}
                onClick={() => setLookIdx(i)}
                aria-label={`Look ${i + 1}`}
                className={`h-1.5 transition-all ${
                  i === lookIdx ? 'w-8 bg-bronze' : 'w-4 bg-charcoal/20 hover:bg-charcoal/40'
                }`}
              />
            ))}
          </div>

          {!saved ? (
            <button
              onClick={saveBoard}
              className="mt-6 inline-flex items-center justify-center gap-2 bg-charcoal text-cream px-6 py-3 text-[11px] uppercase tracking-[0.3em] hover:bg-bronze hover:text-charcoal transition-colors"
            >
              Save my board
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 border border-bronze/40 bg-charcoal text-cream p-4"
            >
              <div className="flex items-center gap-2 text-bronze text-[10px] uppercase tracking-[0.3em]">
                <Check className="h-3.5 w-3.5" /> Perk unlocked
              </div>
              <p className="mt-2 text-sm text-cream/85">
                Your board becomes a personalised design brief to Aarav.
              </p>
              <button
                onClick={openWhatsapp}
                className="mt-3 inline-flex items-center gap-2 bg-bronze text-charcoal px-5 py-2.5 text-[11px] uppercase tracking-[0.3em] hover:bg-cream transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Send board to Aarav
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomPlayground;
