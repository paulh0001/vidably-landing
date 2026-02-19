"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import EvidenceCard from "./EvidenceCard";
import EmailCaptureForm from "./EmailCaptureForm";
import SectionHeading from "./SectionHeading";
import { HERO_CARDS, type EvidenceCardData } from "@/data/evidence-cards";

/** Shorter = each card spends less time in center before next one moves in. */
const CAROUSEL_TRANSITION_MS = 800;

/* Cover Flow: all cards same size, positioned in a 3D row with rotateY + perspective */
const CARD_W = 228;
const CARD_H = Math.round(CARD_W * 16 / 9); /* 9:16 vertical video */


/** Cover Flow slots — tight packing with slight overlap, very subtle dimming. */
const COVER_FLOW_SLOTS = [
  { offsetX: -295, rotateY: 32, translateZ: -80, scale: 0.82, zIndex: 10, opacity: 0.88 },
  { offsetX: -155, rotateY: 15, translateZ: -30, scale: 0.92, zIndex: 20, opacity: 0.95 },
  { offsetX: 0, rotateY: 0, translateZ: 0, scale: 1, zIndex: 30, opacity: 1 },
  { offsetX: 155, rotateY: -15, translateZ: -30, scale: 0.92, zIndex: 20, opacity: 0.95 },
  { offsetX: 295, rotateY: -32, translateZ: -80, scale: 0.82, zIndex: 10, opacity: 0.88 },
] as const;

/** Given a card index and the current center, return which slot (0-4) the card occupies. */
function slotForCard(cardIndex: number, centerIndex: number) {
  return (cardIndex - centerIndex + 2 + 5) % 5;
}

const TRANSITION_CSS = `transform ${CAROUSEL_TRANSITION_MS}ms cubic-bezier(0.33, 1, 0.68, 1), opacity ${CAROUSEL_TRANSITION_MS}ms ease`;

export default function Hero() {
  const [cards, setCards] = useState<EvidenceCardData[] | null>(null);
  const [centerIndex, setCenterIndex] = useState(0);
  const shuffledRef = useRef<EvidenceCardData[] | null>(null);

  useEffect(() => {
    if (!shuffledRef.current) {
      const shuffled = [...HERO_CARDS];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      shuffledRef.current = shuffled;
    }
    setCards(shuffledRef.current);
  }, []);
  const isAnimating = useRef(false);
  const [skipTransition, setSkipTransition] = useState<Set<number>>(new Set());

  const goTo = useCallback((nextIndex: number) => {
    if (nextIndex === centerIndex || isAnimating.current) return;

    const diff = (nextIndex - centerIndex + 5) % 5;
    const effectiveDiff = Math.min(diff, 5 - diff);

    if (effectiveDiff === 1) {
      setSkipTransition(new Set());
    } else {
      setSkipTransition(new Set([0, 1, 2, 3, 4]));
    }

    isAnimating.current = true;
    setCenterIndex(nextIndex);

    const delay = effectiveDiff === 1 ? CAROUSEL_TRANSITION_MS : 50;
    setTimeout(() => {
      setSkipTransition(new Set());
      isAnimating.current = false;
    }, delay);
  }, [centerIndex]);

  const step = useCallback((dir: 1 | -1) => {
    if (isAnimating.current) return;
    setCenterIndex((i) => {
      const len = cards?.length ?? HERO_CARDS.length;
      const next = (i + dir + len) % len;
      setSkipTransition(new Set());
      isAnimating.current = true;
      setTimeout(() => {
        setSkipTransition(new Set());
        isAnimating.current = false;
      }, CAROUSEL_TRANSITION_MS);
      return next;
    });
  }, [cards]);

  const advanceToNext = useCallback(() => step(1), [step]);

  /* Keyboard: left/right arrow keys navigate the carousel */
  const sectionRef = useRef<HTMLElement>(null);
  const isInViewRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { isInViewRef.current = entry.isIntersecting; },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isInViewRef.current) return;
      if (e.key === "ArrowRight") { step(1); e.preventDefault(); }
      if (e.key === "ArrowLeft") { step(-1); e.preventDefault(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  /* Touch swipe: swipe left/right on the carousel */
  const touchStartX = useRef(0);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  }, [step]);

  return (
    <section
      ref={sectionRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative flex flex-col items-center gap-10 bg-gradient-subtle pt-4 pb-16 max-sm:gap-8 max-sm:pt-8 max-sm:pb-12 sm:pt-10 sm:pb-20 md:mb-4"
    >
      <div className="page-container page-grid w-full">
        <div className="col-span-5 flex justify-center md:col-start-2 md:col-span-3 animate-on-load">
          <SectionHeading
            title="Verified buyer videos for every product."
            titleSize="h1"
          />
        </div>
      </div>

      {/* Desktop: iOS Cover Flow — click side cards to navigate */}
      <div
        className="page-container relative hidden min-[920px]:block w-full overflow-visible"
        style={{ height: CARD_H + 20 }}
      >
        <div
          className="relative w-full h-full overflow-visible"
          style={{
            transformStyle: "preserve-3d",
            perspective: 1400,
            perspectiveOrigin: "50% 50%",
          }}
        >
          {cards?.map((card, cardIndex) => {
            const slotIdx = slotForCard(cardIndex, centerIndex);
            const slot = COVER_FLOW_SLOTS[slotIdx];
            const shouldSkip = skipTransition.has(cardIndex);

            const isCenter = slotIdx === 2;

            return (
              <div
                key={cardIndex}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  zIndex: slot.zIndex,
                  transformOrigin: "center center",
                  transform: `translate(-50%, -50%) translateX(${slot.offsetX}px) rotateY(${slot.rotateY}deg) translateZ(${slot.translateZ}px) scale(${slot.scale})`,
                  opacity: slot.opacity,
                  transition: shouldSkip ? "none" : TRANSITION_CSS,
                  cursor: isCenter ? "default" : "pointer",
                }}
                onClick={isCenter ? undefined : () => goTo(cardIndex)}
              >
                <EvidenceCard
                  videoSrc={card.videoSrc}
                  posterSrc={card.posterSrc}
                  width={CARD_W}
                  className="!w-full !h-full"
                  isActive={isCenter}
                  loop={false}
                  onEnded={isCenter ? advanceToNext : undefined}
                  nameLine={card.nameLine}
                  subLine={card.subLine}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile / tablet: single card, auto-advances when video ends */}
      <div className="page-container flex w-full flex-col items-center justify-center min-[920px]:hidden">
        {cards && (
          <EvidenceCard
            videoSrc={cards[centerIndex].videoSrc}
            posterSrc={cards[centerIndex].posterSrc}
            width={320}
            loop={false}
            onEnded={advanceToNext}
            nameLine={cards[centerIndex].nameLine}
            subLine={cards[centerIndex].subLine}
          />
        )}
      </div>

      {/* Email capture */}
      <div className="page-container flex w-full items-center justify-center animate-on-load-delay">
        <EmailCaptureForm />
      </div>
    </section>
  );
}
