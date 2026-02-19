import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EvidenceSection from "@/components/EvidenceSection";
import ProofSection from "@/components/ProofSection";
import SignalsSection from "@/components/SignalsSection";
import CollaborativeSection from "@/components/CollaborativeSection";
import MeasurementSection from "@/components/MeasurementSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-default text-text-primary">
      <Header />
      <main>
        <Hero />
        <EvidenceSection />
        <ProofSection />
        <SignalsSection />
        <CollaborativeSection />
        <MeasurementSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
