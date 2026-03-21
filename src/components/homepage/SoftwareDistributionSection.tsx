"use client";

import { useSoftwares } from "@/hooks/software/useSoftwares";
import { useStats } from "@/hooks/stats/useStats";
import { getColor } from "@/lib/colors";
import { formatCompactNumber, formatPercentNumber } from "@/lib/utils";
import SoftwareLogo from "../SoftwareLogo";
import { StatBar } from "../StatBar";

const SoftwareDistributionSection = () => {
  const { data: softwares } = useSoftwares({
    size: 10,
    sortBy: "activeUsersMonth",
  });
  const { data: globalStats } = useStats();

  const total = globalStats?.totalActiveUsersMonth || 0;

  const processedItems =
    softwares?.data?.map((item) => ({
      ...item,
      displayPercentage:
        total > 0 ? ((item.activeUsersMonth || 0) / total) * 100 : 0,
    })) || [];

  const otherData = (() => {
    if (!processedItems.length || total <= 0) return null;

    const topCount = processedItems.reduce(
      (acc, item) => acc + (item.activeUsersMonth || 0),
      0,
    );
    const otherCount = total - topCount;

    if (otherCount <= 0) return null;

    return {
      name: "Other Software",
      count: otherCount,
      percentage: (otherCount / total) * 100,
    };
  })();

  return (
    <section className="bg-[#e9f7f9] py-20 flex flex-col justify-center">
      <div className="my-container max-w-3xl flex flex-col items-center">
        <h2 className="mb-3">What powers the Fediverse</h2>
        <p>Software distribution by number of active users per month</p>

        <div className="mt-10 w-full space-y-6">
          {processedItems?.map((item, index) => (
            <StatBar
              key={item.identifier}
              label={item.name ?? item.identifier}
              subLabel={formatCompactNumber(item.activeUsersMonth)}
              value={formatPercentNumber(item.displayPercentage)}
              percentage={item.displayPercentage}
              color={getColor(index)}
              icon={
                <SoftwareLogo
                  url={item.iconUrl}
                  name={item.name ?? item.identifier}
                  size={16}
                />
              }
              href={`/software/${item.identifier}`}
              className="mb-5"
            />
          ))}

          {otherData && (
            <div key="other">
              <div className="w-full flex justify-between mb-1">
                <div>
                  <span className="font-bold">{otherData.name}</span>
                  <span className="ml-2 text-sm text-gray-500">
                    {formatCompactNumber(otherData.count)}
                  </span>
                </div>
                <span className="font-bold" style={{ color: "#7ea2aa" }}>
                  {otherData.percentage.toFixed(1)}%
                </span>
              </div>

              <div className="w-full rounded-full bg-muted h-3 relative overflow-hidden">
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
          <div className="w-full rounded-full bg-muted h-4 flex overflow-hidden">
            {processedItems?.map((item, index) => (
              <div
                key={`bar-${item.identifier}`}
                className="h-full transition-all duration-1000 ease-in-out"
                style={{
                  width: `${item.displayPercentage}%`,
                  backgroundColor: getColor(index),
                }}
                title={`${item.name}: ${item.displayPercentage.toFixed(1)}%`}
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
