import { HeroCarousel }             from "@/components/HeroCarousel";
import { ServicesGrid }             from "@/components/ServicesGrid";
import { FeaturedServicesCarousel } from "@/components/FeaturedServicesCarousel";
import { MarketingSection }         from "@/components/sections/MarketingSection";
import { MissionSection }           from "@/components/MissionSection";
import { StatsSection }             from "@/components/StatsSection";
import { SectorsChart }             from "@/components/SectorsChart";
import { CasesSection }             from "@/components/sections/CasesSection";
import { BlogSection }              from "@/components/BlogSection";
import { FaqSection }               from "@/components/FaqSection";
import { getAllPosts }              from "@/lib/blog";

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <HeroCarousel />
      <ServicesGrid />
      <FeaturedServicesCarousel />
      <MarketingSection />
      <MissionSection />
      <StatsSection />
      <SectorsChart />
      <CasesSection />
      <BlogSection posts={posts} />
      <FaqSection />
    </>
  );
}
