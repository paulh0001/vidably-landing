import AnimateIn from "./AnimateIn";

export default function Footer() {
  return (
    <footer className="border-t border-v-gray-200 bg-bg-pure py-8">
      <AnimateIn rootMargin="0px 0px -80px 0px">
        <div className="page-container flex flex-wrap items-center justify-center gap-x-6 gap-y-2 max-md:flex-col">
        <a
          href="mailto:developers@vidably.com"
          className="font-body text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          Contact us
        </a>
        <span className="text-v-gray-300 max-md:hidden" aria-hidden>·</span>
        <a
          href="/privacy"
          className="font-body text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          Privacy
        </a>
      </div>
      </AnimateIn>
    </footer>
  );
}
