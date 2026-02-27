"use client";

import { useSoftwareDistribution } from "@/hooks/stats/useSoftwareDistribution";
import { useStats } from "@/hooks/stats/useStats";
import { getColor } from "@/lib/colors";
import SoftwareLogo from "../SoftwareLogo";

const SoftwareDistributionSection = () => {
  const { data } = useSoftwareDistribution(10);
  const { data: totalStats } = useStats();

  const otherData = (() => {
    if (!data || !totalStats || totalStats.totalInstances === 0) return null;
    const topCount = data.reduce((acc, item) => acc + item.count, 0);
    const otherCount = totalStats.totalInstances - topCount;
    if (otherCount <= 0) return null;
    return {
      software: "Other",
      count: otherCount,
      percentage:
        Math.round((otherCount / totalStats.totalInstances) * 10000) / 100,
    };
  })();

  return (
    <section className="bg-[#e9f7f9] py-20 flex flex-col justify-center">
      <div className="my-container max-w-3xl flex flex-col items-center">
        <h2 className="mb-3">What powers the Fediverse 🐙</h2>
        <p>Software distribution across all known instances</p>

        <div className="mt-10 w-full space-y-6">
          {data?.map((item, index) => (
            <div key={item.software}>
              <div className="w-full flex justify-between mb-2">
                <div className="flex items-center">
                  <SoftwareLogo name={item.software} size={16} />
                  <span className="font-bold ml-2">{item.software}</span>
                  <span className="ml-2 text-sm text-gray-500">
                    {item.count}
                  </span>
                </div>
                <span className="font-bold" style={{ color: getColor(index) }}>
                  {item.percentage}%
                </span>
              </div>

              <div className="w-full rounded-full bg-[#e4eef1] h-3 relative overflow-hidden">
                <div
                  className="absolute top-0 bottom-0 left-0 rounded-full transition-all duration-700"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: getColor(index),
                  }}
                />
              </div>
            </div>
          ))}

          {otherData && (
            <div key="other">
              <div className="w-full flex justify-between mb-1">
                <div>
                  <span className="font-bold">{otherData.software}</span>
                  <span className="ml-2 text-sm text-gray-500">
                    {otherData.count}
                  </span>
                </div>
                <span className="font-bold" style={{ color: "#7ea2aa" }}>
                  {otherData.percentage}%
                </span>
              </div>

              <div className="w-full rounded-full bg-[#e4eef1] h-3 relative overflow-hidden">
                <div
                  className="absolute top-0 bottom-0 left-0 rounded-full transition-all duration-700"
                  style={{
                    width: `${otherData.percentage}%`,
                    backgroundColor: "#7ea2aa",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 w-full">
          <div className="w-full rounded-full bg-[#e4eef1] h-4 flex overflow-hidden">
            {data?.map((item, index) => (
              <div
                key={`bar-${item.software}`}
                className="h-full transition-all duration-1000 ease-in-out"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: getColor(index),
                }}
                title={`${item.software}: ${item.percentage}%`}
              />
            ))}

            {otherData && (
              <div
                className="h-full transition-all duration-1000 ease-in-out"
                style={{
                  width: `${otherData.percentage}%`,
                  backgroundColor: "#7ea2aa",
                }}
                title={`Other: ${otherData.percentage}%`}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoftwareDistributionSection;
