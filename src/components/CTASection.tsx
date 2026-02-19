import SectionHeading from "./SectionHeading";
import EmailCaptureForm from "./EmailCaptureForm";
import AnimateIn from "./AnimateIn";

export default function CTASection() {
  return (
    <section className="relative flex flex-col items-center bg-bg-default py-24 max-sm:py-20 lg:py-32">
      <AnimateIn>
        <div className="page-container page-grid w-full flex flex-col items-center gap-14 max-sm:gap-10">
        <div className="col-span-5 flex flex-col items-center md:col-start-2 md:col-span-3">
          <SectionHeading
            title="Authentic buyer video across your entire catalog."
            titleSize="h1"
            subtitle="Start with one category. We'll scan your product pages, write the briefs, and ship the first evidence set your site and agents can actually use."
          />
        </div>
        <div className="col-span-5 flex items-center justify-center md:col-start-2 md:col-span-3">
          <EmailCaptureForm />
        </div>
      </div>
      </AnimateIn>
    </section>
  );
}
