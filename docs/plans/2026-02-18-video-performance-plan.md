# Video Performance Optimization — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Eliminate slow video loading, gray placeholder boxes, and duplicate downloads across the Vidably landing page.

**Architecture:** Replace iframe-based video playback with native `<video>` elements, transcode .mov files to .mp4 for smaller sizes and progressive playback, centralize video card data into a single source of truth, and add IntersectionObserver-based lazy loading.

**Tech Stack:** Next.js 16, React 19, ffmpeg (local transcoding), Tailwind CSS 4, TypeScript

---

### Task 1: Transcode .mov files to .mp4

**Files:**
- Modify: `public/images/evidence-cards/*.mov` → generate `.mp4` equivalents

**Step 1: Transcode all used .mov files to .mp4**

Run this script to transcode all 7 video files currently used in the site. The `-movflags +faststart` flag moves the moov atom to the start so browsers can begin playback before the full download completes. Audio is stripped (`-an`) since all videos play muted.

```bash
cd public/images/evidence-cards

for mov in evidence-card-dogtreats.mov evidence-card-inkblot-mug.mov evidence-card-5.mov evidence-card-candles.mov evidence-card-golfshirt-1.mov evidence-card-1.mov evidence-card-2.mov; do
  mp4="${mov%.mov}.mp4"
  echo "Transcoding $mov → $mp4"
  ffmpeg -i "$mov" -c:v libx264 -crf 23 -preset slow -an -movflags +faststart "$mp4"
done
```

**Step 2: Verify the .mp4 files were created and are smaller**

Run:
```bash
ls -lhS public/images/evidence-cards/*.mp4
```

Expected: 7 `.mp4` files, each significantly smaller than their `.mov` counterpart.

**Step 3: Commit**

```bash
git add public/images/evidence-cards/*.mp4
git commit -m "feat: transcode video files from .mov to .mp4 for web performance"
```

---

### Task 2: Generate missing poster thumbnails

**Files:**
- Create: `public/images/evidence-cards/evidence-card-1-poster.jpg`
- Create: `public/images/evidence-cards/evidence-card-2-poster.jpg`

Videos that already have posters: dogtreats, inkblot-mug, 5, candles, golfshirt-1.
Videos that need posters: evidence-card-1, evidence-card-2.

**Step 1: Generate poster images from the first frame of each video**

```bash
cd public/images/evidence-cards

ffmpeg -i evidence-card-1.mov -frames:v 1 -q:v 2 evidence-card-1-poster.jpg
ffmpeg -i evidence-card-2.mov -frames:v 1 -q:v 2 evidence-card-2-poster.jpg
```

**Step 2: Verify the poster images were created**

```bash
ls -lh public/images/evidence-cards/*-poster.jpg
```

Expected: 7 poster `.jpg` files total (5 existing + 2 new).

**Step 3: Commit**

```bash
git add public/images/evidence-cards/evidence-card-1-poster.jpg public/images/evidence-cards/evidence-card-2-poster.jpg
git commit -m "feat: generate poster thumbnails for evidence-card-1 and evidence-card-2"
```

---

### Task 3: Create centralized video card data

**Files:**
- Create: `src/data/evidence-cards.ts`

**Step 1: Create the data file**

Create `src/data/evidence-cards.ts`:

```ts
export interface EvidenceCardData {
  videoSrc: string;
  posterSrc: string;
  nameLine: string;
  subLine: string;
}

/**
 * Single source of truth for all evidence card video data.
 * Each section picks the cards it needs by key.
 * Video URLs point to the transcoded .mp4 files.
 */
export const EVIDENCE_CARDS = {
  dogtreats: {
    videoSrc: "/images/evidence-cards/evidence-card-dogtreats.mp4",
    posterSrc: "/images/evidence-cards/evidence-card-dogtreats-poster.jpg",
    nameLine: "Marcus T. - Verified",
    subLine: "Natural Dog Treats - 12oz",
  },
  inkblotMug: {
    videoSrc: "/images/evidence-cards/evidence-card-inkblot-mug.mp4",
    posterSrc: "/images/evidence-cards/evidence-card-inkblot-mug-poster.jpg",
    nameLine: "Jamie L. - Verified",
    subLine: "Inkblot Mug",
  },
  card5: {
    videoSrc: "/images/evidence-cards/evidence-card-5.mp4",
    posterSrc: "/images/evidence-cards/evidence-card-5-poster.jpg",
    nameLine: "Alexa P. - 5.7ft.",
    subLine: "White Hoodie - Small",
  },
  candles: {
    videoSrc: "/images/evidence-cards/evidence-card-candles.mp4",
    posterSrc: "/images/evidence-cards/evidence-card-candles-poster.jpg",
    nameLine: "Sam K. - Verified",
    subLine: "Soy Candles - Set of 3",
  },
  golfshirt1: {
    videoSrc: "/images/evidence-cards/evidence-card-golfshirt-1.mp4",
    posterSrc: "/images/evidence-cards/evidence-card-golfshirt-1-poster.jpg",
    nameLine: "Jordan M. - 6.0ft.",
    subLine: "Polo Golf Shirt - Medium",
  },
  card1: {
    videoSrc: "/images/evidence-cards/evidence-card-1.mp4",
    posterSrc: "/images/evidence-cards/evidence-card-1-poster.jpg",
    nameLine: "Riley C. - 5.5ft.",
    subLine: "Green Hoodie - Medium",
  },
  card2: {
    videoSrc: "/images/evidence-cards/evidence-card-2.mp4",
    posterSrc: "/images/evidence-cards/evidence-card-2-poster.jpg",
    nameLine: "Morgan D. - 5.9ft.",
    subLine: "White Hoodie - Medium",
  },
} as const satisfies Record<string, EvidenceCardData>;

/** Hero carousel uses these 5 cards. */
export const HERO_CARDS: EvidenceCardData[] = [
  EVIDENCE_CARDS.dogtreats,
  EVIDENCE_CARDS.inkblotMug,
  EVIDENCE_CARDS.card5,
  EVIDENCE_CARDS.candles,
  EVIDENCE_CARDS.golfshirt1,
];

/** EvidenceSection carousel uses these 3 cards. */
export const EVIDENCE_SECTION_CARDS: EvidenceCardData[] = [
  EVIDENCE_CARDS.card1,
  EVIDENCE_CARDS.card5,
  EVIDENCE_CARDS.card2,
];
```

**Step 2: Verify TypeScript compiles**

Run:
```bash
npx tsc --noEmit
```

Expected: No errors.

**Step 3: Commit**

```bash
git add src/data/evidence-cards.ts
git commit -m "feat: centralize evidence card video data into single source of truth"
```

---

### Task 4: Refactor EvidenceCard — replace iframe with native `<video>`

**Files:**
- Modify: `src/components/EvidenceCard.tsx`

This is the core refactor. Replace the iframe-based video playback with a native `<video>` element. Add IntersectionObserver for lazy loading (only mount `<video>` when card is near viewport).

**Step 1: Rewrite EvidenceCard.tsx**

Replace the entire component with this implementation:

```tsx
"use client";

import Image from "next/image";
import { useRef, useEffect, useCallback, useState } from "react";

interface EvidenceCardProps {
  imageSrc?: string;
  videoSrc?: string;
  posterSrc?: string;
  isPlaceholder?: boolean;
  width: number;
  height?: number;
  className?: string;
  noShadow?: boolean;
  isActive?: boolean;
  loop?: boolean;
  onEnded?: () => void;
  nameLine?: string;
  subLine?: string;
}

const DEFAULT_NAME_LINE = "Alexa P. - 5.7ft.";
const DEFAULT_SUB_LINE = "White Hoodie - Small";

export default function EvidenceCard({
  imageSrc,
  videoSrc,
  posterSrc,
  isPlaceholder = false,
  width,
  height: heightProp,
  className = "",
  noShadow = false,
  isActive = true,
  loop = true,
  onEnded,
  nameLine = DEFAULT_NAME_LINE,
  subLine = DEFAULT_SUB_LINE,
}: EvidenceCardProps) {
  const height = heightProp ?? Math.round(width * 16 / 9);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);

  // Scale all internal measurements proportionally based on card width
  const scale = width / 221;
  const borderRadius = Math.round(9.3 * scale);
  const nameFontSize = Math.max(6, Math.round(10.5 * scale * 10) / 10);
  const subFontSize = Math.max(5, Math.round(8.7 * scale * 10) / 10);
  const chevronSize = Math.max(6, Math.round(9.3 * scale));
  const infoBarPadding = Math.round(9.3 * scale);

  // IntersectionObserver: track when card enters/leaves viewport
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { rootMargin: "200px" }, // start loading 200px before visible
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Play/pause video based on isActive + viewport visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive && isInViewport) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isActive, isInViewport]);

  // Handle video ended event
  const handleEnded = useCallback(() => {
    onEnded?.();
  }, [onEnded]);

  const shouldMountVideo = videoSrc && isInViewport;

  return (
    <div
      ref={cardRef}
      className={`relative flex flex-col items-center justify-between ${className}`}
      style={{
        width,
        height,
        borderRadius,
        overflow: "hidden",
        backgroundColor: "var(--color-v-gray-700)",
        ...(noShadow ? {} : { boxShadow: `0px ${Math.round(14.5 * scale)}px ${Math.round(29 * scale)}px 0px rgba(0,0,0,0.25)` }),
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {/* Poster image — always visible as base layer, loads fast, no gray */}
      {posterSrc && (
        <Image
          src={posterSrc}
          alt=""
          fill
          className="object-cover pointer-events-none"
          style={{ borderRadius: 0, zIndex: 0 }}
          priority
        />
      )}

      {/* Native video — only mounted when in viewport, plays on top of poster */}
      {shouldMountVideo && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          loop={loop}
          preload="auto"
          onEnded={loop ? undefined : handleEnded}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ zIndex: 1 }}
        />
      )}

      {/* Fallback for cards without poster or video */}
      {!posterSrc && !videoSrc && isPlaceholder ? (
        <div
          className="absolute bg-v-gray-700"
          style={{ top: -1, left: -1, right: -1, bottom: -1, width: "calc(100% + 2px)", height: "calc(100% + 2px)" }}
        />
      ) : !posterSrc && !videoSrc && imageSrc ? (
        <Image
          src={imageSrc}
          alt="Evidence card showing verified buyer video"
          fill
          className="object-cover pointer-events-none"
          style={{ borderRadius: 0 }}
        />
      ) : null}

      {/* Bottom info bar - frosted glass */}
      <div
        className="relative z-10 mt-auto flex items-start justify-center backdrop-blur-sm"
        style={{
          backgroundColor: "rgba(113,113,113,0.3)",
          borderBottomLeftRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
          padding: infoBarPadding,
          width: "100%",
        }}
      >
        <div className="flex flex-1 flex-col items-start">
          <p
            className="font-body font-bold text-white leading-[1.56]"
            style={{
              fontSize: nameFontSize,
              letterSpacing: "-0.44px",
            }}
          >
            {nameLine}
          </p>
          <p
            className="font-body font-normal text-white leading-[1.6]"
            style={{ fontSize: subFontSize }}
          >
            {subLine}
          </p>
        </div>
        <Image
          src="/images/icons/chevron-icon.svg"
          alt=""
          width={chevronSize}
          height={chevronSize}
          className="mt-0.5 shrink-0"
        />
      </div>
    </div>
  );
}
```

Key changes from the current implementation:
- Removed: `iframeRef`, `frameId` (`useId()`), `sendPlay()`, `postMessage` listener, entire iframe element
- Added: `videoRef`, `cardRef`, `isInViewport` state, IntersectionObserver with 200px rootMargin
- Added: native `<video>` element with `muted playsInline preload="auto"`
- Added: play/pause effect keyed on `isActive` and `isInViewport`
- Added: native `onEnded` handler (no postMessage bridge needed)

**Step 2: Verify TypeScript compiles**

Run:
```bash
npx tsc --noEmit
```

Expected: No errors.

**Step 3: Commit**

```bash
git add src/components/EvidenceCard.tsx
git commit -m "refactor: replace iframe video playback with native <video> elements

Native <video> elements share browser HTTP cache, eliminating duplicate
downloads. IntersectionObserver lazy-loads videos only when near viewport."
```

---

### Task 5: Update Hero.tsx to use centralized data

**Files:**
- Modify: `src/components/Hero.tsx`

**Step 1: Replace inline card data with centralized import**

In `src/components/Hero.tsx`:

1. Add import at the top (after existing imports):
```ts
import { HERO_CARDS, type EvidenceCardData } from "@/data/evidence-cards";
```

2. Remove the entire `CARDS` array (lines 15-46):
```ts
// DELETE: const CARDS = [ ... ] as const;
```

3. Update the type references throughout:
- Change `useState<typeof CARDS[number][] | null>(null)` → `useState<EvidenceCardData[] | null>(null)`
- Change `useRef<typeof CARDS[number][] | null>(null)` → `useRef<EvidenceCardData[] | null>(null)`
- Change all references to `CARDS` (the constant) → `HERO_CARDS`:
  - `const shuffled = [...HERO_CARDS];`
  - `const len = cards?.length ?? HERO_CARDS.length;`

No other logic changes. The shuffle, carousel transitions, keyboard/touch handlers, and Cover Flow layout all remain identical.

**Step 2: Verify TypeScript compiles and dev server starts**

Run:
```bash
npx tsc --noEmit
```

Expected: No errors.

**Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "refactor: use centralized evidence card data in Hero carousel"
```

---

### Task 6: Update EvidenceSection.tsx to use centralized data + posters

**Files:**
- Modify: `src/components/EvidenceSection.tsx`

**Step 1: Replace inline card data with centralized import**

In `src/components/EvidenceSection.tsx`:

1. Add import at the top (after existing imports):
```ts
import { EVIDENCE_SECTION_CARDS } from "@/data/evidence-cards";
```

2. Remove the inline `CAROUSEL_CARDS` array (lines 15-19):
```ts
// DELETE: const CAROUSEL_CARDS = [ ... ];
```

3. Replace all references to `CAROUSEL_CARDS` with `EVIDENCE_SECTION_CARDS` throughout the file. There are references in:
   - `SLIDES` (line 48): `const SLIDES = [...EVIDENCE_SECTION_CARDS, ...EVIDENCE_SECTION_CARDS];`
   - `setSelectedIndex` (line 99): `setSelectedIndex(snap % EVIDENCE_SECTION_CARDS.length);`
   - `logicalIndex` (line 108): `const logicalIndex = selectedIndex % EVIDENCE_SECTION_CARDS.length;`
   - Dots mapping (line 231): `{EVIDENCE_SECTION_CARDS.map((_, i) => (`

4. Add `posterSrc` to each `EvidenceCard` usage (line ~204):
```tsx
<EvidenceCard
  videoSrc={card.videoSrc}
  posterSrc={card.posterSrc}  // ADD THIS LINE
  width={CARD_W}
  className="!h-full !w-full"
  noShadow
  isActive={index === centerSlideIndex}
  nameLine={card.nameLine}
  subLine={card.subLine}
/>
```

**Step 2: Verify TypeScript compiles**

Run:
```bash
npx tsc --noEmit
```

Expected: No errors.

**Step 3: Commit**

```bash
git add src/components/EvidenceSection.tsx
git commit -m "refactor: use centralized data + add poster images in EvidenceSection"
```

---

### Task 7: Update ProofSection.tsx to use centralized data + poster

**Files:**
- Modify: `src/components/ProofSection.tsx`

**Step 1: Add centralized import and poster**

In `src/components/ProofSection.tsx`:

1. Add import at the top:
```ts
import { EVIDENCE_CARDS } from "@/data/evidence-cards";
```

2. Update the EvidenceCard usage (around line 143-147). Currently:
```tsx
<EvidenceCard
  videoSrc="/images/evidence-cards/evidence-card-5.mov"
  width={240}
  subLine="Black Hoodie - Small"
/>
```

Replace with:
```tsx
<EvidenceCard
  videoSrc={EVIDENCE_CARDS.card5.videoSrc}
  posterSrc={EVIDENCE_CARDS.card5.posterSrc}
  width={240}
  nameLine={EVIDENCE_CARDS.card5.nameLine}
  subLine={EVIDENCE_CARDS.card5.subLine}
/>
```

Note: The current code uses the default `nameLine` ("Alexa P. - 5.7ft.") and only overrides `subLine` to "Black Hoodie - Small". But the centralized data for card5 has `subLine: "White Hoodie - Small"`. Check with the user whether ProofSection should say "Black Hoodie" or "White Hoodie". For now, use the centralized data values and note this discrepancy. If ProofSection intentionally shows different text, keep the overrides:

```tsx
<EvidenceCard
  videoSrc={EVIDENCE_CARDS.card5.videoSrc}
  posterSrc={EVIDENCE_CARDS.card5.posterSrc}
  width={240}
  subLine="Black Hoodie - Small"
/>
```

**Step 2: Verify TypeScript compiles**

Run:
```bash
npx tsc --noEmit
```

Expected: No errors.

**Step 3: Commit**

```bash
git add src/components/ProofSection.tsx
git commit -m "refactor: use centralized data + add poster image in ProofSection"
```

---

### Task 8: Update SignalsSection.tsx to use centralized data + poster

**Files:**
- Modify: `src/components/SignalsSection.tsx`

**Step 1: Add centralized import and poster**

In `src/components/SignalsSection.tsx`:

1. Add import at the top:
```ts
import { EVIDENCE_CARDS } from "@/data/evidence-cards";
```

2. Update the EvidenceCard usage (around line 171-175). Currently:
```tsx
<EvidenceCard
  videoSrc="/images/evidence-cards/evidence-card-5.mov"
  width={240}
  subLine="Black Hoodie - Small"
/>
```

Replace with (same note as ProofSection — keep `subLine` override if intentional):
```tsx
<EvidenceCard
  videoSrc={EVIDENCE_CARDS.card5.videoSrc}
  posterSrc={EVIDENCE_CARDS.card5.posterSrc}
  width={240}
  subLine="Black Hoodie - Small"
/>
```

**Step 2: Verify TypeScript compiles**

Run:
```bash
npx tsc --noEmit
```

Expected: No errors.

**Step 3: Commit**

```bash
git add src/components/SignalsSection.tsx
git commit -m "refactor: use centralized data + add poster image in SignalsSection"
```

---

### Task 9: Delete the /api/video-frame route

**Files:**
- Delete: `src/app/api/video-frame/route.ts`

Now that no component uses iframes for video playback, the API route is dead code.

**Step 1: Delete the route file**

```bash
rm src/app/api/video-frame/route.ts
```

If the `src/app/api/video-frame/` directory is now empty, remove it too:
```bash
rmdir src/app/api/video-frame
```

If `src/app/api/` is now empty, remove it:
```bash
rmdir src/app/api 2>/dev/null || true
```

**Step 2: Verify no remaining references to /api/video-frame**

Search the codebase:
```bash
grep -r "video-frame" src/
```

Expected: No matches.

**Step 3: Verify TypeScript compiles**

Run:
```bash
npx tsc --noEmit
```

Expected: No errors.

**Step 4: Commit**

```bash
git add -A src/app/api/
git commit -m "chore: delete /api/video-frame route (replaced by native <video>)"
```

---

### Task 10: Build verification and visual check

**Step 1: Run the Next.js production build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 2: Start production server and visually verify**

```bash
npm run start
```

Open `http://localhost:3000` in a browser. Verify:
- [ ] Hero carousel: poster images show instantly, videos play in center card, Cover Flow 3D transitions work, no z-index issues
- [ ] EvidenceSection: poster images show instantly (no gray boxes), center slide video plays
- [ ] ProofSection: poster shows instantly, video plays
- [ ] SignalsSection: poster shows instantly, video plays when "Shopper view" is selected
- [ ] All videos load noticeably faster than before
- [ ] No duplicate network requests for the same video URL (check browser DevTools Network tab)

**Step 3: If Hero 3D has z-index issues with native `<video>`**

If the Cover Flow shows video bleeding through other cards or incorrect stacking, the fallback is to keep iframes specifically for the Hero's center card. This would mean:
- Re-add the iframe approach to EvidenceCard behind a `useIframe` prop
- Only Hero.tsx passes `useIframe={true}`
- All other sections continue using native `<video>`

This is a contingency — try native `<video>` first.

**Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: address any visual issues from video refactor"
```

---

### Task 11: Remove old .mov files (optional cleanup)

**Files:**
- Delete: `public/images/evidence-cards/*.mov` (the 7 used videos)

Only do this AFTER confirming everything works with .mp4 files.

**Step 1: Remove .mov files that have been replaced by .mp4**

```bash
cd public/images/evidence-cards
rm evidence-card-dogtreats.mov evidence-card-inkblot-mug.mov evidence-card-5.mov evidence-card-candles.mov evidence-card-golfshirt-1.mov evidence-card-1.mov evidence-card-2.mov
```

Note: `evidence-card-golfshirt-2.mov`, `evidence-card-mug-1.mov`, and `evidence-card-mug-2.mov` are not used by any component. Consider removing them too to save repo size, but confirm with the user first.

**Step 2: Verify no remaining .mov references in code**

```bash
grep -r "\.mov" src/
```

Expected: No matches.

**Step 3: Commit**

```bash
git add -A public/images/evidence-cards/
git commit -m "chore: remove .mov video files replaced by .mp4 transcodes"
```
