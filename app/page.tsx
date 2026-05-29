import { AnnouncementBar }         from "@/components/AnnouncementBar";
import { Nav }                      from "@/components/Nav";
import { HeroCarousel }             from "@/components/HeroCarousel";
import { ServicesGrid }             from "@/components/ServicesGrid";
import { TeamCarousel }             from "@/components/TeamCarousel";
import { TestimonialsCarousel }     from "@/components/TestimonialsCarousel";
import { MissionSection }           from "@/components/MissionSection";
import { StatsSection }             from "@/components/StatsSection";
import { SectorsChart }             from "@/components/SectorsChart";
import { FeaturedServicesCarousel } from "@/components/FeaturedServicesCarousel";
import { BlogSection }              from "@/components/BlogSection";
import { FaqSection }               from "@/components/FaqSection";
import { Footer }                   from "@/components/Footer";
import { WhatsAppFloat }            from "@/components/ui/WhatsAppFloat";
import { MobileBottomNav }          from "@/components/ui/MobileBottomNav";

export default function Home() {
  return (
    <main>
      <AnnouncementBar />
      <Nav />
      <HeroCarousel />
      <ServicesGrid />
      <TeamCarousel />
      <TestimonialsCarousel />
      <MissionSection />
      <StatsSection />
      <SectorsChart />
      <FeaturedServicesCarousel />
      <BlogSection />
      <FaqSection />
      <Footer />
      <WhatsAppFloat />
      <MobileBottomNav />
    </main>
  );
}
