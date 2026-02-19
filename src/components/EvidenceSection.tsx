"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import EvidenceCard from "./EvidenceCard";
import SectionHeading from "./SectionHeading";
import AnimateIn from "./AnimateIn";
import { EVIDENCE_SECTION_CARDS } from "@/data/evidence-cards";

// Desktop: scaled down so mockup fits in viewport alongside heading (was 221×495). Mobile: smaller so card fits in viewport (buttons + gaps leave ~264px).
const CARD_W_DESKTOP = 130;
const CARD_GAP = 12; // gap-3
const MOBILE_CARD_WIDTH = 200; // fits inside narrow mobile viewport (section px-4 + buttons + gaps)
const MOBILE_BREAKPOINT = 640;

function BrowserChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-v-gray-200 bg-bg-pure shadow-card-lg">
      {/* Chrome bar */}
      <div className="flex h-[42px] items-center gap-4 border-b border-[#e5e7eb] bg-[#f9fafb] px-5">
        <div className="flex gap-[6px]">
          <div className="h-[10px] w-[10px] rounded-full bg-[#e5e7eb]" />
          <div className="h-[10px] w-[10px] rounded-full bg-[#e5e7eb]" />
          <div className="h-[10px] w-[10px] rounded-full bg-[#e5e7eb]" />
        </div>
        <div className="h-[22px] flex-1 rounded-md bg-[#e5e7eb]" />
        <div className="h-[22px] w-[22px] rounded bg-[#e5e7eb]" />
      </div>
      {children}
    </div>
  );
}

const VIEWPORT_SIDE_PADDING = 16;
const VIEWPORT_EXTRA_VISIBLE = 24;
// Desktop mockup width (computed from desktop card dimensions below)
const SLIDE_WIDTH_DESKTOP = CARD_W_DESKTOP + CARD_GAP;
const VIEWPORT_WIDTH_DESKTOP = SLIDE_WIDTH_DESKTOP * 3;
const VIEWPORT_TOTAL_DESKTOP = VIEWPORT_WIDTH_DESKTOP + VIEWPORT_EXTRA_VISIBLE + VIEWPORT_SIDE_PADDING * 2;
const MOCKUP_MAX_WIDTH = VIEWPORT_TOTAL_DESKTOP + 40 + 40 + 8 + 8 + 32;

// Duplicate slides so the track overflows the viewport and Embla can scroll (otherwise carousel is stuck)
const SLIDES = [...EVIDENCE_SECTION_CARDS, ...EVIDENCE_SECTION_CARDS];

// Reserve space for section px-4 (32) + viewport px-4 (32) only; buttons are absolute on mobile so they don't take layout space
const MOBILE_RESERVE_PX = 64;

function useMobileViewport(breakpoint: number = MOBILE_BREAKPOINT) {
  const [width, setWidth] = useState(0);
  // When width is 0 we haven't measured yet; assume mobile so first paint doesn't use desktop size and overflow
  const isMobile = width === 0 || width < breakpoint;
  useEffect(() => {
    const check = () => setWidth(window.innerWidth);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return { isMobile, viewportWidth: width };
}

function ProductPageMockup() {
  const { isMobile, viewportWidth } = useMobileViewport();
  // On mobile: cap card width so slide fits in (viewport - reserve). When unknown (0) use safe default.
  const mobileCardW =
    viewportWidth > 0
      ? Math.min(MOBILE_CARD_WIDTH, Math.max(160, viewportWidth - MOBILE_RESERVE_PX))
      : Math.min(MOBILE_CARD_WIDTH, Math.max(160, 375 - MOBILE_RESERVE_PX)); // 375 = typical mobile
  const CARD_W = isMobile ? mobileCardW : CARD_W_DESKTOP;
  const CARD_H = Math.round(CARD_W * 16 / 9);
  const SLIDE_WIDTH = CARD_W + CARD_GAP;
  const VIEWPORT_WIDTH = isMobile ? undefined : SLIDE_WIDTH * 3; // undefined = 100% on mobile
  const VIEWPORT_TOTAL_WIDTH = isMobile ? undefined : VIEWPORT_WIDTH! + VIEWPORT_EXTRA_VISIBLE + VIEWPORT_SIDE_PADDING * 2;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    startIndex: 1,
    duration: 28,
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(1); // logical 0–2 for dots
  const [centerSlideIndex, setCenterSlideIndex] = useState(1); // which of the 6 slides is in the center (for isActive)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  // Use Embla’s selectedScrollSnap() as single source of truth for which slide is “center” (more consistent than slidesInView)
  useEffect(() => {
    if (!emblaApi) return;
    const updateCenterIndex = () => {
      const snap = emblaApi.selectedScrollSnap();
      setCenterSlideIndex(snap);
      setSelectedIndex(snap % EVIDENCE_SECTION_CARDS.length);
    };
    updateCenterIndex();
    emblaApi.on("select", updateCenterIndex);
    return () => {
      emblaApi.off("select", updateCenterIndex);
    };
  }, [emblaApi]);

  const logicalIndex = selectedIndex % EVIDENCE_SECTION_CARDS.length;

  const goToSlide = (index: number) => scrollTo(index);

  return (
    <BrowserChrome>
      {/* Product section */}
      <div className="flex gap-8 p-8 pb-6 max-md:flex-col max-md:p-5">
        {/* Left: Product gallery */}
        <div className="flex w-[45%] flex-col gap-3 max-md:w-full">
          <div className="relative aspect-[917/689] overflow-hidden rounded-lg">
            <Image
              src="/images/section-images/pdp-hero.png"
              alt="Premium White Hoodie — product photo"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-[52px] w-[52px] shrink-0 rounded-md bg-[#f3f4f6]"
              />
            ))}
          </div>
        </div>

        {/* Right: Product info */}
        <div className="flex flex-1 flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#d1d5dc]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              <span className="font-body text-sm font-semibold text-white">
                Add to Cart
              </span>
            </div>
            <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-lg border border-[#e5e7eb]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </div>
          </div>
          <p className="font-body text-sm leading-6 text-[#4b5563]">
            Premium cotton blend hoodie with a relaxed fit. Features adjustable drawstring hood, kangaroo pocket, and ribbed cuffs.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-8 border-t border-[#e5e7eb] max-md:mx-5" />

      {/* Evidence carousel — all 3 cards visible, selected one centered. On mobile, buttons are absolute so they don't take layout space. */}
      <div className="relative flex max-w-full items-center justify-center gap-2 overflow-x-hidden px-4 py-8 max-sm:gap-0 max-sm:py-5">
        <button
          type="button"
          onClick={scrollPrev}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#9ca3af] transition-colors hover:bg-v-gray-100 hover:text-[#6b7280] max-sm:absolute max-sm:left-1 max-sm:top-1/2 max-sm:z-10 max-sm:-translate-y-1/2"
          aria-label="Previous card"
        >
          <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        {/* Embla viewport: loop carousel; full width on mobile, fixed on desktop */}
        <div
          className="min-h-0 min-w-0 max-w-full flex-1 overflow-hidden px-4 max-sm:flex-none sm:max-w-none sm:w-auto"
          style={
            isMobile
              ? { minHeight: CARD_H }
              : { width: VIEWPORT_TOTAL_WIDTH, minHeight: CARD_H }
          }
        >
          <div
            className="overflow-hidden"
            ref={emblaRef}
            style={{
              width: isMobile ? SLIDE_WIDTH : VIEWPORT_WIDTH,
              margin: "0 auto",
            }}
          >
            <div
              className="flex touch-pan-y"
              style={{ backfaceVisibility: "hidden" }}
            >
              {SLIDES.map((card, index) => (
                <div
                  key={index}
                  className="embla__slide shrink-0 overflow-hidden"
                  style={{
                    flex: `0 0 ${SLIDE_WIDTH}px`,
                    minWidth: 0,
                    height: CARD_H,
                    paddingLeft: CARD_GAP / 2,
                    paddingRight: CARD_GAP / 2,
                    opacity: index === centerSlideIndex ? 1 : 0.92,
                    transition: "opacity 0.2s ease-out",
                  }}
                >
                  <EvidenceCard
                    videoSrc={card.videoSrc}
                    posterSrc={card.posterSrc}
                    width={CARD_W}
                    className="!h-full !w-full"
                    noShadow
                    isActive={index === centerSlideIndex}
                    nameLine={card.nameLine}
                    subLine={card.subLine}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={scrollNext}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#9ca3af] transition-colors hover:bg-v-gray-100 hover:text-[#6b7280] max-sm:absolute max-sm:right-1 max-sm:left-auto max-sm:top-1/2 max-sm:z-10 max-sm:-translate-y-1/2"
          aria-label="Next card"
        >
          <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      {/* Carousel dots */}
      <div className="flex justify-center gap-2 pb-8">
        {EVIDENCE_SECTION_CARDS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goToSlide(i)}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === logicalIndex ? "bg-[#3b82f6]" : "bg-[#e5e7eb] hover:bg-[#d1d5dc]"
            }`}
            aria-label={`Go to card ${i + 1}`}
          />
        ))}
      </div>

     
    </BrowserChrome>
  );
}

/** Single evidence section block (heading + mockup). Use this or the default export. */
export function EvidenceSectionBlock() {
  return (
    <section className="overflow-x-hidden bg-section-alt py-24 max-sm:py-14 max-sm:gap-8 lg:py-28">
      <AnimateIn>
        <div className="page-container page-grid items-center gap-16 max-md:gap-12">
        {/* On mobile: heading first. On desktop: mockup left, heading right */}
        <div className="col-span-5 order-2 w-full min-w-0 md:order-1 md:col-span-3" style={{ maxWidth: MOCKUP_MAX_WIDTH }}>
          <ProductPageMockup />
        </div>
        <div className="col-span-5 order-1 flex flex-col md:order-2 md:col-span-2 md:min-w-0 md:items-start">
          <SectionHeading
            title="Proof that lives on your product page."
            titleSize="h2-lg"
            subtitle="Shoppers see real people, real fit, real use - without leaving your site."
            align="left"
          />
        </div>
      </div>
      </AnimateIn>
    </section>
  );
}

export default function EvidenceSection() {
  return <EvidenceSectionBlock />;
}
