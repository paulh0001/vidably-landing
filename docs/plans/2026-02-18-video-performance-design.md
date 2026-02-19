# Video Loading Performance Optimization

## Problem

Videos on the Vidably landing page load slowly, show gray placeholder boxes, and the same video file (`evidence-card-5.mov`) is loaded independently in 4 separate sections via iframes. The current architecture uses an iframe-per-video approach (`/api/video-frame` route) which prevents browser cache sharing and adds overhead.

### Current state

| Section | Videos | Has poster? | Notes |
|---------|--------|-------------|-------|
| Hero (5 cards, Cover Flow) | dogtreats, inkblot-mug, 5, candles, golfshirt-1 | Yes | Only center card plays (iframe) |
| EvidenceSection (3 cards, Embla) | 1, 5, 2 | No | Only center slide plays (iframe) |
| ProofSection (1 card) | 5 | No | Always active (iframe) |
| SignalsSection (1 card) | 5 | No | Active when "Shopper view" tab selected |

- Video files are raw `.mov` format (5-42MB each)
- Each iframe creates a separate document context, defeating browser HTTP cache deduplication
- No lazy loading — all videos begin loading on page load

## Approach: Full Optimization

### 1. Video Asset Pipeline

Transcode all `.mov` → `.mp4` (H.264) using ffmpeg:

```bash
ffmpeg -i input.mov -c:v libx264 -crf 23 -preset slow \
  -c:a aac -b:a 128k -movflags +faststart output.mp4
```

- `-movflags +faststart`: moves moov atom to file start for progressive playback
- Expected file size reduction: 50-80%
- Generate poster thumbnails for videos that don't have them (evidence-card-1, evidence-card-2)
- Result: every video has a matched `.mp4` + `-poster.jpg` pair

### 2. Centralized Video Card Data

Create `src/data/evidence-cards.ts` as the single source of truth:

```ts
export const EVIDENCE_CARDS = {
  dogtreats: {
    videoSrc: "/images/evidence-cards/evidence-card-dogtreats.mp4",
    posterSrc: "/images/evidence-cards/evidence-card-dogtreats-poster.jpg",
    nameLine: "Marcus T. - Verified",
    subLine: "Natural Dog Treats - 12oz",
  },
  // ... all cards
} as const;
```

Each section references the cards it needs by key. Adding/changing a video means updating one file.

### 3. EvidenceCard Refactor

Replace iframe-based video playback with native `<video>` elements:

**Current:** iframe → `/api/video-frame` HTML → `<video>` → postMessage bridge
**New:** Direct `<video>` element with native event handlers

Changes:
- Poster image shown immediately via Next.js `<Image>` (already exists, works well)
- IntersectionObserver: when card enters viewport → set `shouldLoad = true`
- When `shouldLoad && isActive`: render `<video preload="auto" autoplay muted playsInline>`
- `onEnded` fires natively from `<video>` — no postMessage needed
- When card leaves viewport: `pause()`, optionally `preload="none"` to free memory

Benefits:
- Browser HTTP cache naturally deduplicates same video URLs across sections
- No iframe overhead (no separate document, no HTML parsing, no postMessage relay)
- Simpler code: direct event handlers

Hero carousel 3D: Test native `<video>` with `backfaceVisibility: hidden` + `will-change: transform`. Only center card plays; side cards show poster only. Fall back to iframes for Hero center card only if z-index issues arise.

Delete `/api/video-frame` route after migration.

### 4. Section-Specific Updates

- **Hero.tsx**: Use centralized data. Test native `<video>` in Cover Flow.
- **EvidenceSection.tsx**: Use centralized data. Add `posterSrc` to all cards.
- **ProofSection.tsx**: Use centralized data. Add `posterSrc`.
- **SignalsSection.tsx**: Use centralized data. Add `posterSrc`.

No visual changes — everything looks identical, just loads faster.

## Expected Impact

- **File sizes**: 50-80% smaller videos (MP4 vs raw MOV)
- **Gray boxes eliminated**: Poster images load instantly via Next.js Image
- **Duplicate downloads eliminated**: Browser cache serves same video across sections
- **Faster initial load**: Videos below the fold don't load until needed
- **Simpler codebase**: No iframe/postMessage bridge, centralized data
