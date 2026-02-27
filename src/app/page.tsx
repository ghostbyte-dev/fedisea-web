"use client";

import SoftwareDistributionSection from "@/components/homepage/SoftwareDistributionSection";
import StatsSection from "@/components/homepage/StatsSection";
import TopServersSection from "@/components/homepage/TopServersSection";

export default function Home() {
  return (
    <div className="">
      <StatsSection />
      <SoftwareDistributionSection />
      <TopServersSection />
    </div>
  );
}
