"use client";

import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";

interface EvidenceCardProps {
  imageSrc?: string;
  videoSrc?: string;
  /** Static poster image shown while video loads or when card is inactive. */
  posterSrc?: string;
  isPlaceholder?: boolean;
  width: number;
  height?: number;
  className?: string;
  noShadow?: boolean;
  /** When false, video is paused (e.g. only center card in carousel plays). Omitted = play. */
  isActive?: boolean;
  /** When false, video plays once and then onEnded is called (e.g. Hero mobile auto-advance). Default true. */
  loop?: boolean;
  /** Called when video ends (only when loop is false). */
  onEnded?: () => void;
  /** Top line in info bar, e.g. "Alexa P. - 5.7ft." (first name + last initial + optional detail). */
  nameLine?: string;
  /** Bottom line in info bar, e.g. "White Hoodie - Small". */
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

  // Scale all internal measurements proportionally based on card width
  // Reference: largest card in Figma is 221px wide
  const scale = width / 221;
  const borderRadius = Math.round(9.3 * scale);
  const nameFontSize = Math.max(6, Math.round(10.5 * scale * 10) / 10);
  const subFontSize = Math.max(5, Math.round(8.7 * scale * 10) / 10);
  const chevronSize = Math.max(6, Math.round(9.3 * scale));
  const infoBarPadding = Math.round(9.3 * scale);

  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { rootMargin: "200px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive && isInViewport) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isActive, isInViewport]);

  const handleEnded = useCallback(() => {
    onEnded?.();
  }, [onEnded]);

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

      {/* Native video — only mounted when near viewport, plays on top of poster */}
      {videoSrc && isInViewport && (
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
