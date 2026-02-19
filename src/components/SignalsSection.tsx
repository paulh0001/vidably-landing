"use client";

import { useState } from "react";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import EvidenceCard from "./EvidenceCard";
import AnimateIn from "./AnimateIn";

const evidenceRows = [
  { label: "Fit:", value: "true_to_size", score: 0.86 },
  { label: "Opacity:", value: "non_sheer", score: 0.74 },
  { label: "Color accuracy:", value: "matches_photos", score: 0.68 },
  { label: "Texture:", value: "soft_plush", score: 0.82 },
  { label: "Context:", value: "warm_indoor_light", score: 0.61 },
  { label: "Thickness:", value: "medium_heavy", score: 0.78 },
];

function AgentViewCard() {
  return (
    <div className="w-full max-w-[480px] rounded-2xl border border-v-gray-200 bg-bg-pure p-px shadow-card-lg">
      <div className="flex flex-col gap-4 p-5 max-sm:p-4">
        {/* Header row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-1 border-b border-[#e5e7eb] pb-3">
            <h3 className="font-body text-lg font-bold leading-7 text-[#101828]">
              Structured Evidence Record
            </h3>
            <p className="font-body text-xs font-normal leading-4 tracking-[-0.15px] text-[#4a5565]">
              Queryable data with confidence scores
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-[10px] border border-[#6dc348] bg-white px-3 py-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#44bf58]">
              <Image
                src="/images/icons/icon-code-brackets.svg"
                alt=""
                width={14}
                height={14}
              />
            </div>
            <div className="min-w-0">
              <p className="font-body text-xs font-bold leading-4 tracking-[-0.2px] text-[#26af2d]">
                API-Ready
              </p>
              <p className="font-body text-[10px] font-normal leading-3.5 text-[#44bf58]">
                Queryable by agents
              </p>
            </div>
          </div>
        </div>

        {/* Data grid */}
        <div className="rounded-[12px] border border-[#e5e7eb] bg-[#f9fafb] px-4 pt-4 pb-3">
          <div className="flex flex-col gap-3">
            {evidenceRows.map((row) => (
              <div key={row.label} className="flex gap-2">
                <span className="w-[110px] shrink-0 font-body text-xs font-semibold leading-4 text-[#303030]">
                  {row.label}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="font-body text-xs font-normal leading-4 text-black">
                    {row.value}
                    <span className="text-[#99a1af]">({row.score})</span>
                  </span>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e5e7eb]">
                    <div
                      className="h-full rounded-full bg-[#b2b6cd]"
                      style={{ width: `${row.score * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Citations row */}
            <div className="flex items-baseline gap-2 border-t border-[#d1d5dc] pt-3">
              <span className="w-[110px] shrink-0 font-body text-xs font-semibold leading-4 text-[#303030]">
                Citations:
              </span>
              <span className="min-w-0 font-body text-[11px] font-normal leading-4 text-[#364153]">
                [
                <span className="text-black"> &quot;00:07–00:11&quot;, </span>
                <span className="text-black"> &quot;00:18–00:21&quot;, </span>
                <span className="text-black"> &quot;00:34–00:38&quot; </span>
                ]
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TOGGLE_ICON_ACTIVE = "[filter:brightness(0)_invert(1)]";
const TOGGLE_ICON_INACTIVE = "[filter:brightness(0)_saturate(0)_opacity(0.49)]";
const TOGGLE_BTN =
  "flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl px-2.5 transition-all duration-200";
const TOGGLE_BTN_ACTIVE = "hover:opacity-90";
const TOGGLE_BTN_INACTIVE = "hover:bg-black/[0.06]";
const TOGGLE_ICON_WRAP = "inline-flex shrink-0 transition-[filter] duration-200";
const TOGGLE_LABEL =
  "whitespace-nowrap font-body text-xs font-semibold leading-5 tracking-[-0.2px] transition-colors duration-200";

export default function SignalsSection() {
  const [activeView, setActiveView] = useState<"shopper" | "agent">("shopper");

  return (
    <section className="bg-section-alt py-24 max-sm:py-14 lg:py-28">
      <AnimateIn>
        <div className="page-container page-grid w-full gap-16 max-sm:gap-8 md:items-center">
        {/* Left: Heading + subtitle */}
        <div className="col-span-5 flex shrink-0 flex-col gap-6 max-sm:gap-4 md:col-span-2 md:max-w-[320px] md:pt-1">
          <SectionHeading
            title="Built for AEO and the agentic commerce layer."
            subtitle="Shoppers pick up on dozens of signals in product video: how fabric drapes, whether a color reads true in natural light, how a product fits different body types. Our video-native AI structures those implicit signals into queryable data for the agentic commerce stack."
            align="left"
          />
        </div>

        {/* Right: Toggle + content */}
        <div className="col-span-5 flex min-w-0 flex-col items-center gap-6 max-sm:gap-4 md:col-span-3">
          <div className="w-[240px] rounded-2xl border border-v-gray-300 bg-v-gray-200 p-0.5">
            <div className="flex h-[32px] gap-0.5">
              <button
                type="button"
                className={`${TOGGLE_BTN} ${activeView === "shopper" ? `bg-text-primary ${TOGGLE_BTN_ACTIVE}` : TOGGLE_BTN_INACTIVE}`}
                onClick={() => setActiveView("shopper")}
              >
                <span
                  className={`${TOGGLE_ICON_WRAP} ${
                    activeView === "shopper" ? TOGGLE_ICON_ACTIVE : TOGGLE_ICON_INACTIVE
                  }`}
                >
                  <Image src="/images/icons/icon-eye.svg" alt="" width={14} height={14} />
                </span>
                <span
                  className={`${TOGGLE_LABEL} ${
                    activeView === "shopper" ? "text-white" : "text-text-secondary"
                  }`}
                >
                  Shopper view
                </span>
              </button>
              <button
                type="button"
                className={`${TOGGLE_BTN} ${activeView === "agent" ? `bg-text-primary ${TOGGLE_BTN_ACTIVE}` : TOGGLE_BTN_INACTIVE}`}
                onClick={() => setActiveView("agent")}
              >
                <span
                  className={`${TOGGLE_ICON_WRAP} ${
                    activeView === "agent" ? TOGGLE_ICON_ACTIVE : TOGGLE_ICON_INACTIVE
                  }`}
                >
                  <Image src="/images/icons/icon-scan.svg" alt="" width={14} height={14} />
                </span>
                <span
                  className={`${TOGGLE_LABEL} ${
                    activeView === "agent" ? "text-white" : "text-text-secondary"
                  }`}
                >
                  Agent View
                </span>
              </button>
            </div>
          </div>

          {/* Content area — min-h matches EvidenceCard at width=240 (240×16/9≈427) */}
          <div className="flex min-h-[427px] w-full flex-col items-center justify-start">
            {activeView === "shopper" ? (
              <EvidenceCard
                videoSrc="/images/evidence-cards/evidence-card-5.mov"
                width={240}
                subLine="Black Hoodie - Small"
              />
            ) : (
              <AgentViewCard />
            )}
          </div>
        </div>
      </div>
      </AnimateIn>
    </section>
  );
}
