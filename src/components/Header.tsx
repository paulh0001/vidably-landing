"use client";

import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y <= 0) {
        setVisible(true);
      } else if (y > lastY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-v-gray-200/80 bg-bg-default/95 backdrop-blur-sm supports-[backdrop-filter]:bg-bg-default/90 transition-transform duration-300 ease-out"
      style={{ transform: visible ? "translateY(0)" : "translateY(-100%)" }}
    >
      <nav className="page-container flex h-14 items-center justify-between md:h-16">
        <div className="flex items-center">
          <span className="font-heading text-xl font-semibold tracking-tight text-text-primary md:text-2xl">
            Vidably
          </span>
        </div>
      </nav>
    </header>
  );
}
