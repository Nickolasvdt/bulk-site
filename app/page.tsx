import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { LogoMarquee } from "@/components/LogoMarquee";
import { Features } from "@/components/Features";
import { Cases } from "@/components/Cases";
import { Pricing } from "@/components/Pricing";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { StickyBar } from "@/components/StickyBar";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function Home() {
  return (
    <main className="bg-bg text-ink">
      <Nav />
      <div className="min-h-screen flex flex-col">
        <Hero />
        <LogoMarquee />
      </div>
      <Features />
      <Cases />
      <Pricing />
      <FinalCTA />
      <Footer />
      <StickyBar />
      <WhatsAppButton />
    </main>
  );
}
