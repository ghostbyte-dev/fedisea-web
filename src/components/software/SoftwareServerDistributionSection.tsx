"use client";

import { useInstances } from "@/hooks/instance/useInstances";
import { useSoftware } from "@/hooks/software/useSoftware";
import { getColor } from "@/lib/colors";
import { formatCompactNumber, formatPercentNumber } from "@/lib/utils";
import { StatBar } from "../StatBar";

const SoftwareServerDistributionSection = ({
  software,
}: {
  software: string;
}) => {
  const { data: servers } = useInstances({
    size: 10,
    sortBy: "users",
    software: software,
  });
  const { data: softwareData } = useSoftware(software);

  const total = softwareData?.totalUsers || 0;

  const processedItems =
    servers?.data?.map((item) => ({
      ...item,
      displayPercentage: total > 0 ? ((item.totalUsers || 0) / total) * 100 : 0,
    })) || [];

  const otherData = (() => {
    if (!processedItems.length || total <= 0) return null;

    const topCount = processedItems.reduce(
      (acc, item) => acc + (item.totalUsers || 0),
      0,
    );
    const otherCount = total - topCount;

    if (otherCount <= 0) return null;

    return {
      name: "Other servers",
      count: otherCount,
      percentage: (otherCount / total) * 100,
    };
  })();

  return (
    <section className="mt-10 flex flex-col justify-center">
      <div className="flex flex-col">
        <div className="card">
          <h2 className="mb-1">Server distribution</h2>
          {/* <p>Software distribution by number of active users per month</p> */}

          <div className="mt-10 w-full space-y-6">
            {processedItems?.map((item, index) => (
              <StatBar
                key={item.domain}
                label={item.domain}
                subLabel={`${formatCompactNumber(item.totalUsers)} users`}
                value={formatPercentNumber(item.displayPercentage)}
                percentage={item.displayPercentage}
                color={getColor(index)}
                /* icon={
                  <SoftwareLogo
                    url={item.iconUrl}
                    name={item.name ?? item.identifier}
                    size={16}
                  />
                } */
                href={`/servers/${item.domain}`}
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
                  key={`bar-${item.domain}`}
                  className="h-full transition-all duration-1000 ease-in-out"
                  style={{
                    width: `${item.displayPercentage}%`,
                    backgroundColor: getColor(index),
                  }}
                  title={`${item.domain}: ${item.displayPercentage.toFixed(1)}%`}
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
      </div>
    </section>
  );
};

export default SoftwareServerDistributionSection;
