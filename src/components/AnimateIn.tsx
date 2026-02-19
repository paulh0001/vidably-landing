"use client";

import { useEffect, useRef, type ReactNode } from "react";

type AnimateInProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay: "1" | "2" | "3" | "4" for delay-1 … delay-4 */
  delay?: "1" | "2" | "3" | "4";
  /** Root margin for intersection (e.g. "0px 0px -40px 0px" to trigger slightly before in view) */
  rootMargin?: string;
};

export default function AnimateIn({
  children,
  className = "",
  delay,
  rootMargin = "0px 0px -30px 0px",
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  const delayClass = delay ? `delay-${delay}` : "";
  return (
    <div
      ref={ref}
      className={`animate-in ${delayClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
