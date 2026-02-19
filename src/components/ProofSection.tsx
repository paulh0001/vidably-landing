"use client";

import { useState } from "react";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import EvidenceCard from "./EvidenceCard";
import AnimateIn from "./AnimateIn";

const features = [
  {
    icon: "/images/icons/icon-video.svg",
    title: "Authentic Video",
    description:
      "Real customer video that auto-plays on the product page, muted by default. No actors. No AI-generated content. Just verified buyers with the actual product.",
    color: "#8b5cf6", // purple
    bgHover: "rgba(139, 92, 246, 0.06)",
    borderHover: "rgba(139, 92, 246, 0.35)",
    iconBg: "rgba(139, 92, 246, 0.12)",
  },
  {
    icon: "/images/icons/icon-signals.svg",
    title: "Extracted Signals",
    description:
      "AI watches each video and pulls out the signals shoppers already pick up on: fit, fabric feel, color accuracy. Those impressions become structured data any system can query.",
    color: "#f59e0b", // amber
    bgHover: "rgba(245, 158, 11, 0.06)",
    borderHover: "rgba(245, 158, 11, 0.35)",
    iconBg: "rgba(245, 158, 11, 0.12)",
  },
  {
    icon: "/images/icons/icon-impact.svg",
    title: "Measured Impact",
    description:
      "A/B tested against the control on live traffic. You see the actual conversion lift, not a proxy metric.",
    color: "#22c55e", // green
    bgHover: "rgba(34, 197, 94, 0.06)",
    borderHover: "rgba(34, 197, 94, 0.35)",
    iconBg: "rgba(34, 197, 94, 0.12)",
  },
  {
    icon: "/images/icons/icon-provenance.svg",
    title: "Provenance",
    description:
      "Every video ties back to a verified purchase. Traceable from buyer to creator to measured performance. Authenticity you can verify end to end.",
    color: "#3b82f6", // blue
    bgHover: "rgba(59, 130, 246, 0.06)",
    borderHover: "rgba(59, 130, 246, 0.35)",
    iconBg: "rgba(59, 130, 246, 0.12)",
  },
];

export default function ProofSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  // Map: left card index → right panel highlight
  // 0 (Authentic Video) → center evidence card
  // 1 (Extracted Signals) → product info (right index 0)
  // 2 (Measured Impact) → impact measured (right index 1)
  // 3 (Provenance) → cites video moments (right index 2)

  const rightHighlight = (rightIndex: number) => {
    const map: Record<number, number> = { 1: 0, 2: 1, 3: 2 };
    return hovered !== null && map[hovered] === rightIndex;
  };

  const centerHighlight = hovered === 0;

  return (
    <section className="bg-bg-default py-24 max-sm:py-14 max-sm:gap-8 lg:py-28">
      <AnimateIn>
        <div className="page-container page-grid gap-12">
        <div className="col-span-5 flex flex-col items-center gap-8">
          <SectionHeading
            title="From buyer video to commerce signal."
            subtitle="Real product usage captured, analyzed, and put to work inside the shopping flow."
          />
        </div>
        <div className="col-span-5 relative flex items-start justify-center gap-8 max-md:flex-col max-md:items-center max-md:gap-10 md:col-start-1 md:col-span-5">
        {/* Left: Feature Cards — on mobile, order after the 3 right boxes */}
        <div className="flex w-[280px] shrink-0 flex-col gap-0 max-md:order-2 max-md:w-full max-md:max-w-[600px]">
          <p className="mb-2 px-1 font-body text-[10px] font-semibold uppercase leading-4 tracking-[1.1px] text-v-gray-400">
            Hover to explore
          </p>
          <div className="flex flex-col gap-3">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="cursor-pointer rounded-xl border px-3 py-4 transition-all duration-300"
                style={{
                  borderColor:
                    hovered === i ? feature.borderHover : "var(--color-v-gray-300)",
                  backgroundColor:
                    hovered === i ? feature.bgHover : "var(--color-bg-default)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex gap-2">
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-300"
                    style={{
                      backgroundColor:
                        hovered === i ? feature.iconBg : "var(--color-v-gray-200)",
                    }}
                  >
                    <Image
                      src={feature.icon}
                      alt=""
                      width={14}
                      height={14}
                    />
                  </div>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <p className="font-body text-xs font-semibold leading-[18px] text-text-primary">
                      {feature.title}
                    </p>
                    <p className="font-body text-[11px] font-normal leading-4 text-text-secondary">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Evidence Card */}
        <div
          className="flex shrink-0 items-start justify-center pt-[16px] transition-all duration-300 max-md:order-first max-md:pt-0"
          style={{
            transform: centerHighlight ? "scale(1.02)" : "scale(1)",
          }}
        >
          <div
            className="rounded-[12px] transition-shadow duration-300"
            style={{
              boxShadow: centerHighlight
                ? `0 0 0 2px ${features[0].color}`
                : "none",
            }}
          >
            <EvidenceCard
              videoSrc="/images/evidence-cards/evidence-card-5.mov"
              width={240}
              subLine="Black Hoodie - Small"
            />
          </div>
        </div>

        {/* Right: Product Details Panel — on mobile, above the 4 hover-to-explore boxes */}
        <div className="flex w-[240px] shrink-0 flex-col gap-4 pt-[16px] max-md:order-1 max-md:w-full max-md:max-w-[600px] max-md:pt-0">
          {/* Product info — highlights on Extracted Signals (amber) */}
          <div
            className="rounded-2xl px-[17px] pt-[17px] pb-5 transition-all duration-300"
            style={{
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: rightHighlight(0) ? features[1].borderHover : "var(--color-v-gray-200)",
              backgroundColor: rightHighlight(0) ? features[1].bgHover : "var(--color-v-gray-100)",
              boxShadow: "none",
              transform: rightHighlight(0) ? "scale(1.03)" : "scale(1)",
            }}
          >
            <p className="font-body text-sm font-semibold leading-[21px] text-text-primary">
              Black Hoodie
            </p>
            <p className="font-body text-xs font-normal leading-[18px] text-text-secondary">
              Size: Small • Color: Black
            </p>
          </div>

          {/* Impact measured — highlights on Measured Impact (green) */}
          <div
            className="rounded-2xl px-[17px] pt-[17px] pb-5 transition-all duration-300"
            style={{
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: rightHighlight(1) ? features[2].borderHover : "var(--color-v-green-200)",
              backgroundColor: rightHighlight(1) ? "rgba(34, 197, 94, 0.1)" : "var(--color-v-green-100)",
              boxShadow: "none",
              transform: rightHighlight(1) ? "scale(1.03)" : "scale(1)",
            }}
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-v-green-400" />
              <p className="font-body text-xs font-semibold leading-[18px] text-v-green-700">
                Impact Measured
              </p>
            </div>
            <p className="font-body text-sm font-bold leading-[21px] text-v-green-600">
              +12% conversion lift
            </p>
            <p className="font-body text-xs font-normal leading-[18px] text-v-green-500">
              measured on live traffic
            </p>
          </div>

          {/* Video moments — highlights on Provenance (blue) */}
          <div
            className="rounded-2xl px-[17px] pt-[17px] pb-5 transition-all duration-300"
            style={{
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: rightHighlight(2) ? features[3].borderHover : "var(--color-v-blue-200)",
              backgroundColor: rightHighlight(2) ? "rgba(59, 130, 246, 0.1)" : "var(--color-v-blue-100)",
              boxShadow: "none",
              transform: rightHighlight(2) ? "scale(1.03)" : "scale(1)",
            }}
          >
            <div className="mb-3 flex items-center gap-2">
              <Image
                src="/images/icons/icon-film-link.svg"
                alt=""
                width={16}
                height={16}
              />
              <p className="font-body text-xs font-semibold leading-[18px] text-v-blue-500">
                Cites video moments
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["00:07–00:11", "00:23–00:28", "00:41–00:45"].map((time) => (
                <span
                  key={time}
                  className="rounded border border-v-blue-300 bg-bg-default px-2 py-[5.5px] font-body text-xs font-normal leading-[18px] text-v-blue-500"
                >
                  {time}
                </span>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
      </AnimateIn>
    </section>
  );
}
