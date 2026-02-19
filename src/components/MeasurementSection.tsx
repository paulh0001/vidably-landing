import Image from "next/image";
import SectionHeading from "./SectionHeading";
import AnimateIn from "./AnimateIn";

const metrics = [
  { label: "Add to Cart", value: "+12.4%", barWidth: "73%" },
  { label: "Conversion", value: "+25.7%", barWidth: "73%" },
  { label: "Engagement", value: "+15.2%", barWidth: "73%" },
  { label: "Time on Page", value: "+45s", barWidth: "73%" },
];

const impactStats = [
  { label: "Video Plays", value: "1,842" },
  { label: "Avg. Watch Time", value: "68%" },
  { label: "Most Watched", value: "Fabric close-up" },
];

export default function MeasurementSection() {
  return (
    <section className="bg-section-alt py-24 max-sm:py-14 lg:py-28">
      <AnimateIn>
        <div className="page-container page-grid w-full items-center gap-12 lg:gap-16">
        {/* Dashboard Card - left on desktop; below heading on tablet/mobile */}
        <div className="col-span-5 order-2 w-full max-w-[520px] shrink-0 overflow-hidden rounded-3xl border border-v-gray-200 bg-bg-pure shadow-dashboard max-[360px]:rounded-2xl lg:order-none lg:col-span-3">
        {/* Dark header */}
        <div className="bg-text-primary px-4 pb-3 pt-3 max-[360px]:px-4 max-[360px]:pb-6 max-[360px]:pt-4">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex flex-col gap-0.5">
              <p className="font-body text-xs font-medium leading-4 tracking-[-0.15px] text-v-gray-400 max-[360px]:text-xs max-[360px]:leading-4">
                Experiment ID: EXP-2026-0142
              </p>
              <p className="font-body text-base font-bold leading-tight tracking-[-0.45px] text-white max-[360px]:text-sm max-[360px]:leading-5">
                Live Performance Dashboard
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 rounded-lg bg-v-gray-700 px-2.5 py-1.5 max-[360px]:gap-1.5 max-[360px]:px-2.5 max-[360px]:py-1.5">
              <div className="relative">
                <div className="h-2 w-2 rounded-full bg-v-green-400 max-[360px]:h-2 max-[360px]:w-2" />
                <div className="absolute -inset-0.5 rounded-full bg-v-green-400 opacity-35 max-[360px]:-inset-0.5" />
              </div>
              <span className="font-body text-xs font-medium text-v-green-400 max-[360px]:text-[10px]">
                Live
              </span>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-col gap-3 px-4 py-3 max-[360px]:gap-5 max-[360px]:px-4 max-[360px]:py-4">
          {/* Product info */}
          <div className="rounded-xl border border-bg-default bg-v-gray-100 p-3 max-[360px]:p-4 max-[360px]:rounded-[10px]">
            <div className="flex gap-2 max-sm:flex-col max-[360px]:gap-3">
              <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[5px] border border-[#b0b0b0] max-sm:mx-auto max-[360px]:h-[100px] max-[360px]:w-[100px]">
                <Image
                  src="/images/section-images/product-image.png"
                  alt="Premium White Hoodie"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1 max-[360px]:gap-2">
                <div className="flex items-start justify-between max-sm:flex-col max-sm:gap-3 max-[360px]:gap-2">
                  <div className="min-w-0 flex flex-col gap-0.5">
                    <p className="font-body text-[10px] font-semibold uppercase leading-3 tracking-[0.3px] text-v-gray-600 max-[360px]:text-[10px]">
                      Target SKU
                    </p>
                    <p className="font-body text-sm font-bold leading-5 tracking-[0.07px] text-text-primary max-[360px]:text-base max-[360px]:leading-5">
                      Premium White Hoodie
                    </p>
                    <p className="font-body text-xs font-normal leading-4 tracking-[-0.31px] text-v-gray-600 max-[360px]:text-xs max-[360px]:leading-4">
                      Size: Small • Color: White
                    </p>
                  </div>
                  <div className="shrink-0 rounded-lg border border-v-purple-200 bg-v-purple-100 px-2 py-1 max-[360px]:px-2.5 max-[360px]:py-1.5 max-[360px]:rounded-lg">
                    <p className="text-right font-body text-[10px] font-semibold leading-4 tracking-[-0.15px] text-v-purple-600 max-[360px]:text-[10px] max-[360px]:leading-4">
                      14 verified videos
                    </p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>

          {/* Experimental Method */}
          <div className="flex flex-col gap-2 max-[360px]:gap-3">
            <div className="flex items-center gap-1.5">
              <Image
                src="/images/icons/icon-flask.svg"
                alt=""
                width={14}
                height={14}
                className="max-[360px]:h-4 max-[360px]:w-4"
              />
              <p className="font-body text-xs font-bold leading-snug tracking-[-0.44px] text-text-primary max-[360px]:text-sm max-[360px]:leading-5">
                Experimental Method
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1 max-[360px]:gap-2">
              <div className="rounded-lg border border-v-blue-300 bg-v-blue-100 px-3 py-2 max-[360px]:rounded-[10px] max-[360px]:px-3 max-[360px]:py-3">
                <p className="font-body text-[10px] font-semibold leading-4 tracking-[-0.15px] text-v-blue-800 max-[360px]:text-[10px] max-[360px]:leading-4">
                  Traffic Split
                </p>
                <p className="mt-1 font-body text-[10px] font-normal leading-[14px] tracking-[-0.15px] text-v-blue-600 max-[360px]:mt-1 max-[360px]:text-[10px] max-[360px]:leading-[14px]">
                  50/50 holdout with exposure tracking. Control group sees
                  standard product page. Treatment sees evidence cards.
                </p>
              </div>
              <div className="rounded-lg border border-v-blue-300 bg-v-blue-100 px-3 py-2 max-[360px]:rounded-[10px] max-[360px]:px-3 max-[360px]:py-3">
                <p className="font-body text-[10px] font-semibold leading-4 tracking-[-0.15px] text-v-blue-800 max-[360px]:text-[10px] max-[360px]:leading-4">
                  Attribution Window
                </p>
                <p className="mt-1 font-body text-[10px] font-normal leading-[14px] tracking-[-0.15px] text-v-blue-600 max-[360px]:mt-1 max-[360px]:text-[10px] max-[360px]:leading-[14px]">
                  30-day conversion window. Return data tracked for 60 days
                  post-purchase.
                </p>
              </div>
            </div>
          </div>

          {/* Metrics Tracked */}
          <div className="flex flex-col gap-2 max-[360px]:gap-3">
            <div className="flex items-center gap-1.5">
              <Image
                src="/images/icons/icon-chart.svg"
                alt=""
                width={14}
                height={14}
                className="max-[360px]:h-4 max-[360px]:w-4"
              />
              <p className="font-body text-xs font-bold leading-snug tracking-[-0.44px] text-text-primary max-[360px]:text-sm max-[360px]:leading-5">
                Metrics Tracked
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1 max-[360px]:gap-2">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-lg border border-v-gray-200 bg-bg-default px-3 pt-2 pb-2 max-[360px]:rounded-[10px] max-[360px]:px-3 max-[360px]:pt-3 max-[360px]:pb-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-body text-[10px] font-medium leading-4 tracking-[-0.15px] text-v-gray-700 max-[360px]:text-[10px] max-[360px]:leading-4">
                      {metric.label}
                    </p>
                    <Image
                      src="/images/icons/icon-trending-up.svg"
                      alt=""
                      width={12}
                      height={12}
                      className="max-[360px]:h-3 max-[360px]:w-3"
                    />
                  </div>
                  <p className="mt-0.5 font-body text-sm font-bold leading-5 tracking-[0.07px] text-text-primary max-[360px]:mt-1 max-[360px]:text-base max-[360px]:leading-5">
                    {metric.value}
                  </p>
                  <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-v-gray-200 max-[360px]:mt-1">
                    <div
                      className="h-full rounded-full bg-v-green-400"
                      style={{ width: metric.barWidth }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Measured Impact */}
          <div className="rounded-xl border border-v-green-200 bg-bg-default p-3 max-[360px]:rounded-[10px] max-[360px]:p-4">
            <p className="font-body text-xs font-bold leading-snug tracking-[-0.44px] text-text-primary max-[360px]:text-sm max-[360px]:leading-5">
              Measured Impact
            </p>
            <p className="mt-1 font-body text-[10px] font-normal leading-[14px] tracking-[-0.15px] text-text-secondary max-[360px]:mt-2 max-[360px]:text-[10px] max-[360px]:leading-[14px]">
              See which videos shoppers engage with most: plays, watch time, and which content drives the most interaction across your catalog.
            </p>
            <div className="mt-1.5 grid grid-cols-3 gap-0 border-t border-v-gray-200 pt-1.5 max-sm:grid-cols-1 max-sm:gap-3 max-[360px]:mt-2 max-[360px]:gap-2 max-[360px]:pt-2">
              {impactStats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <p className="font-body text-[10px] font-normal leading-4 text-text-secondary max-[360px]:text-[10px] max-[360px]:leading-4">
                    {stat.label}
                  </p>
                  <p className="font-body text-[10px] font-bold leading-4 tracking-[-0.15px] text-text-primary max-[360px]:text-[10px] max-[360px]:leading-4">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        </div>

        {/* Heading - right of dashboard on desktop; above dashboard on tablet/mobile */}
        <div className="col-span-5 order-1 flex flex-1 flex-col items-start justify-center lg:order-none lg:col-span-2 lg:min-w-0">
          <SectionHeading
            title="Live performance data tied to real outcomes."
            subtitle="Video evidence only matters if it converts. Vidably ties every video to SKU-level impact with clean attribution."
            align="left"
          />
        </div>
      </div>
      </AnimateIn>
    </section>
  );
}
