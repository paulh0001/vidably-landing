interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  titleSize?: "h1" | "h2" | "h2-lg" | "cta";
  align?: "left" | "center";
  label?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  titleSize = "h2",
  align = "center",
  label,
}: SectionHeadingProps) {
  const titleClasses = {
    h1: "text-[42px] leading-[1.1] font-bold tracking-tight max-lg:text-[36px] max-md:text-[32px] max-sm:text-[26px]",
    h2: "text-[34px] leading-[1.2] font-semibold tracking-tight max-lg:text-[30px] max-md:text-[26px] max-sm:text-[22px]",
    "h2-lg": "text-[34px] leading-[1.2] font-semibold tracking-tight max-lg:text-[30px] max-md:text-[26px] max-sm:text-[22px]",
    cta: "text-[72px] leading-[1.1] font-bold tracking-tight max-lg:text-[56px] max-md:text-[44px] max-sm:text-[32px]",
  };

  const titleMaxWidth = "max-w-[900px]";
  const alignClasses =
    align === "left"
      ? "max-lg:items-center max-lg:text-center lg:items-start lg:text-left"
      : "items-center text-center";

  return (
    <div className={`flex flex-col gap-5 max-sm:gap-4 ${alignClasses}`}>
      {label && (
        <span
          className={`font-body text-xs font-semibold uppercase tracking-widest text-text-muted ${align === "left" ? "max-lg:text-center lg:text-left" : "text-center"}`}
        >
          {label}
        </span>
      )}
      {titleSize === "h1" ? (
        <h1
          className={`font-heading text-text-primary whitespace-pre-wrap ${titleMaxWidth} ${titleClasses[titleSize]}`}
        >
          {title}
        </h1>
      ) : (
        <h2
          className={`font-heading text-text-primary whitespace-pre-wrap ${titleMaxWidth} ${titleClasses[titleSize]}`}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          className={`max-w-[720px] font-body text-base leading-relaxed text-text-secondary max-md:text-[15px] max-sm:text-sm ${align === "left" ? "max-lg:text-center lg:text-left" : "text-center"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
