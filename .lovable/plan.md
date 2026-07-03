# Gamification Plan — Design by Aarav

Four interconnected mini-experiences, all in the studio's editorial tone (serif, bronze accents, slow motion, no confetti). Each one unlocks a real perk to drive genuine leads.

---

## 1. Design Style DNA Quiz (upgrade the existing Style Quiz)

Replace the current quick quiz with a 6-step swipe-based experience.

- Users swipe like / pass on real mood images from the portfolio (palettes, materials, silhouettes).
- Live progress ring in bronze; each swipe animates the card off with a subtle tilt + blur.
- Result: a personal **Design DNA card** — e.g. *"Warm Minimalist · 72% · accented by Sculpted Classical"* with 3 matched projects from the portfolio.
- **Perk unlocked:** downloadable PDF mood-board (1 page, letterpress-style) + WhatsApp CTA pre-filled with their DNA.

## 2. Room Builder Playground

A tactile drag-swap configurator, not a full 3D tool.

- Pick a room type (Living / Bedroom / Office / Foyer).
- Swap between 3–4 curated options for: palette, flooring, lighting, statement piece. All options are real Aarav finishes.
- The hero image cross-fades between pre-rendered composites as choices change (no runtime rendering — 4 layers × ~4 options each, precomposed).
- **Perk unlocked:** "Save my board" packages the config into a WhatsApp message + a shareable PNG of the final board.

## 3. Spot-the-Detail Gallery Game

Turns portfolio browsing into discovery.

- On selected gallery images, 3–5 hidden hotspots reveal craft notes on hover/tap (brass inlay, joinery corner, fabric weave, cove detail).
- Each found detail lights a small bronze marker in a top-corner "detail counter."
- Find all details in a project → the project card flips to reveal a behind-the-scenes note from Aarav.
- **Perk unlocked:** finishing 3 projects unlocks a private link to an "unpublished works" gallery page.

## 4. Budget & Timeline Estimator Quest

A playful 4-step wizard that doubles as qualified lead-gen.

- Steps: Space type → Size (slider) → Finish tier (Refined / Bespoke / Atelier) → Timeline urgency.
- Each step reveals with a serif count-up and a slow bronze underline sweep — feels like a game, not a form.
- Final screen animates a ballpark investment range and estimated build window.
- **Perk unlocked:** a free 30-min consult booking + priority WhatsApp reply badge on the follow-up message.

---

## Cross-cutting rules

- **Tone:** Cormorant Garamond for all game copy, Inter for micro-labels, bronze (#B08D57) for progress, charcoal for surfaces. No emojis, no confetti, no sound.
- **Motion:** Framer Motion — soft blur-fades, slow (0.6–0.9s) easings, restrained micro-haptic feel.
- **Entry point:** A single floating "Play" affordance (replaces the current quiz FAB) opens a launcher modal listing the 4 experiences with completion state.
- **Persistence:** `localStorage` keeps completion + unlocked perks across visits; no auth required.
- **Perks funnel:** every unlock ends in the same WhatsApp + consult flow that already exists — gamification feeds the existing conversion path, doesn't replace it.

## Technical notes

- New folder `src/components/games/` with `GameLauncher.tsx` + one file per experience.
- Shared hook `useGameProgress()` reading/writing a single `localStorage` key `dba:games`.
- Style Quiz component gets refactored — logic reused, UI rebuilt as swipe deck.
- Room Builder needs ~16 pre-composed images per room (asked separately once approved).
- No backend changes; all state client-side. WhatsApp deep-link + mailto for consult booking, matching current pattern.

## Phasing (suggested)

1. **Phase 1 (biggest lift, biggest payoff):** Design Style DNA Quiz upgrade + shared launcher/perk system.
2. **Phase 2:** Spot-the-Detail Gallery Game (fastest to ship, reuses existing images).
3. **Phase 3:** Budget & Timeline Estimator Quest.
4. **Phase 4:** Room Builder Playground (needs image production from you).

Approve to build Phase 1, or tell me to sequence differently / drop any of the four.
