"use client";

import HeroSection from "@/components/homepage/HeroSection";
import SoftwareDistributionSection from "@/components/homepage/SoftwareDistributionSection";
import StatsSection from "@/components/homepage/StatsSection";
import TopServersSection from "@/components/homepage/TopServersSection";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <StatsSection />
      <SoftwareDistributionSection />
      <TopServersSection />
    </div>
  );
}
