"use client";

import SoftwareDistributionSection from "@/components/homepage/SoftwareDistributionSection";
import { useStats } from "@/hooks/stats/useStats";

export default function Home() {
  //const { data: instance } = useInstance("pixelix.social");
  const { data: stats } = useStats();

  return (
    <div className="">
      {stats && (
        <div>
          <p>Total Instances: {stats.totalInstances}</p>
          <p>Total Accounts: {stats.totalAccounts}</p>
        </div>
      )}

      <SoftwareDistributionSection />
    </div>
  );
}
