import Image from "next/image";
import SectionHeading from "./SectionHeading";
import AnimateIn from "./AnimateIn";

const steps = [
  {
    number: "1",
    tag: "Agent",
    tagColor: "green",
    title: "Product page intelligence",
    description:
      "Our agent reads your product pages and brand story, then figures out what video content is missing. The source: verified buyers who already own the product.",
    preview: {
      type: "product" as const,
    },
  },
  {
    number: "2",
    tag: "Agent",
    tagColor: "green",
    title: "Precision briefs and creator matching",
    description:
      "Generates targeted video briefs based on what performs best for similar products and categories, then matches and incentivizes the right verified buyers to film them.",
    preview: {
      type: "brief" as const,
    },
  },
  {
    number: "3",
    tag: "Agent",
    tagColor: "green",
    title: "AI video coach",
    description:
      "Guides each creator through filming: showing examples, reviewing submissions, and giving real-time feedback. No experience needed. People find the process surprisingly fun.",
    preview: {
      type: "creator" as const,
    },
  },
];

function ProductPreview() {
  return (
    <div className="flex h-full w-full min-h-0 flex-col overflow-hidden rounded-2xl border border-v-gray-200 bg-v-gray-100">
      {/* Browser chrome */}
      <div className="flex h-4 shrink-0 items-center gap-2 border-b border-v-gray-300 bg-bg-default px-2.5">
        <div className="flex gap-1">
          <div className="h-[5px] w-[5px] rounded-full bg-v-gray-300" />
          <div className="h-[5px] w-[5px] rounded-full bg-v-gray-300" />
          <div className="h-[5px] w-[5px] rounded-full bg-v-gray-300" />
        </div>
        <div className="h-[7px] flex-1 rounded bg-v-gray-300" />
      </div>
      {/* Product listing — ghost PDP: image + skeleton that fills the rest */}
      <div className="flex min-h-0 flex-1 gap-2.5 bg-v-gray-100 p-3">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-[10px]">
          <Image
            src="/images/section-images/product-image.png"
            alt="Product"
            width={80}
            height={80}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-2">
          <div className="h-2 w-3/4 max-w-[80px] rounded-full bg-v-gray-200" />
          <div className="h-1.5 w-1/2 max-w-[56px] rounded-full bg-v-gray-300" />
          <div className="mt-0.5 flex gap-[3px]">
            {[...Array(5)].map((_, i) => (
              <Image
                key={i}
                src="/images/icons/icon-star.svg"
                alt=""
                width={8}
                height={8}
              />
            ))}
          </div>
          <div className="mt-1 flex gap-1.5">
            <div className="h-1.5 w-8 rounded-full bg-v-gray-200" />
            <div className="h-1.5 w-5 rounded-full bg-v-gray-200" />
          </div>
          {/* Skeleton lines that fill the rest of the box (ghost PDP) */}
          <div className="mt-2 flex min-h-0 flex-1 flex-col gap-2">
            <div className="min-h-[0.375rem] flex-1 rounded-full bg-v-gray-200" />
            <div className="h-1.5 w-full rounded-full bg-v-gray-200" />
            <div className="h-1.5 w-[90%] rounded-full bg-v-gray-200" />
            <div className="h-1.5 w-[80%] rounded-full bg-v-gray-200" />
            <div className="h-6 w-full max-w-[72px] rounded bg-v-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BriefPreview() {
  return (
    <div className="flex h-full w-full min-h-0 flex-col overflow-hidden rounded-2xl border border-v-gray-200 bg-bg-pure shadow-card">
      <div className="flex min-h-0 flex-1 flex-col gap-2 p-3">
        <div className="flex shrink-0 gap-2">
          <div className="h-[42px] w-[42px] shrink-0 overflow-hidden rounded border border-v-gray-600">
            <Image
              src="/images/section-images/hoodie-image.png"
              alt="Hoodie"
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="font-body text-[10px] font-semibold leading-[14px] text-text-primary">
              Premium White Hoodie
            </p>
            <p className="font-body text-[9px] font-normal leading-[13px] text-v-gray-700">
              Size: S · Missing: fit + fabric feel
            </p>
          </div>
        </div>
        {/* Agent's Filming Brief list — fills rest of box with larger type */}
        <div className="flex min-h-0 flex-1 flex-col gap-2">
          <p className="shrink-0 font-body text-[9px] font-bold uppercase leading-3 tracking-[0.2px] text-v-orange-400">
            Agent&apos;s Filming Brief
          </p>
          <div className="flex min-h-0 flex-1 flex-col justify-between gap-2">
            {[
              { n: "1", bold: "Show the fit", rest: ": wear it and show how it drapes" },
              { n: "2", bold: "Fabric close-up", rest: ": pinch or stretch the fabric" },
              { n: "3", bold: "Natural light", rest: ": film near a window" },
            ].map((item) => (
              <div key={item.n} className="flex items-start gap-2">
                <div className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                  <Image
                    src="/images/icons/icon-orange-circle.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="h-full w-full"
                  />
                  <span className="absolute font-body text-[9px] font-bold text-v-orange-400">
                    {item.n}
                  </span>
                </div>
                <p className="font-body text-[11px] leading-[15px] text-v-gray-700">
                  <span className="font-bold">{item.bold}</span>
                  <span className="font-normal text-v-gray-600">{item.rest}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CreatorPreview() {
  return (
    <div className="relative h-full w-full min-h-0 overflow-hidden rounded-2xl">
      <Image
        src="/images/section-images/creator-filming.png"
        alt="Creator filming"
        width={286}
        height={150}
        className="h-full w-full object-cover"
      />
      {/* Bottom info bar */}
      <div className="absolute bottom-2 left-2 flex w-[247px] items-center justify-between rounded-[10px] px-3 py-[7px]" style={{ backgroundColor: "rgba(113,113,113,0.3)", borderWidth: 0.5, borderColor: "white" }}>
        <div>
          <p className="font-body text-[10px] leading-[15px] text-white">
            <span className="font-bold">Alexa P. </span>
            <span className="font-normal">· 5&apos;7&quot;</span>
          </p>
          <p className="font-body text-[8px] font-normal leading-3 text-white">
            White Hoodie · Small
          </p>
        </div>
        <Image
          src="/images/icons/icon-verified.svg"
          alt=""
          width={12}
          height={12}
        />
      </div>
    </div>
  );
}

function StepCard({
  step,
}: {
  step: (typeof steps)[0];
}) {
  const tagBg =
    step.tagColor === "green"
      ? "bg-v-green-100 border-v-green-200"
      : "bg-v-blue-100 border-v-blue-300";
  const tagTextColor =
    step.tagColor === "green" ? "text-v-green-500" : "text-v-blue-500";

  return (
    <div className="group flex w-[328px] flex-col overflow-hidden rounded-2xl border border-v-gray-200 bg-bg-pure shadow-card-md transition-shadow duration-200 hover:shadow-card-lg max-md:w-full">
      {/* Preview — soft stage + margin below image, above numbers */}
      <div className="flex w-full shrink-0 flex-col bg-bg-subtle px-4 pt-4 pb-5 max-md:px-4 max-md:pt-4 max-md:pb-5">
        <div className="mx-auto h-[200px] w-full max-w-[266px] [&>div]:h-full [&>div]:w-full [&>div]:rounded-2xl">
          {step.preview.type === "product" && <ProductPreview />}
          {step.preview.type === "brief" && <BriefPreview />}
          {step.preview.type === "creator" && <CreatorPreview />}
        </div>
      </div>

      {/* Step content — clearer hierarchy, refined typography */}
      <div className="flex flex-col px-5 pb-5 pt-5 max-md:px-5 max-md:pb-5 max-md:pt-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bg-subtle border border-v-gray-200">
            <span className="font-body text-lg font-bold leading-none tracking-[-0.5px] text-text-primary">
              {step.number}
            </span>
          </div>
          <div
            className={`flex items-center rounded-full border px-2 py-0.5 ${tagBg}`}
          >
            <span
              className={`font-body text-[10px] font-semibold uppercase leading-none tracking-wider ${tagTextColor}`}
            >
              {step.tag}
            </span>
          </div>
        </div>
        <h3 className="mt-3 font-heading text-lg font-semibold leading-tight tracking-tight text-text-primary">
          {step.title}
        </h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">
          {step.description}
        </p>
      </div>
    </div>
  );
}

export default function CollaborativeSection() {
  return (
    <section className="bg-bg-default py-24 max-sm:py-20 max-sm:gap-8 lg:py-28">
      <AnimateIn>
        <div className="page-container page-grid gap-16 items-center">
        <div className="col-span-5 flex flex-col items-center">
          <SectionHeading
            title="Our AI agents turn any buyer into a video creator."
            subtitle="Our agents handle the full workflow: spotting content gaps on your product pages, writing targeted briefs, matching the right verified buyers, and coaching them through filming."
          />
        </div>
        <div className="col-span-5 flex justify-center gap-6 max-md:flex-col max-md:items-center md:col-start-1 lg:gap-8">
          {steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </div>
      </AnimateIn>
    </section>
  );
}
