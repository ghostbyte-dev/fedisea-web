"use client";

import { useSoftwareVersions } from "@/hooks/software/useSoftwareVersions";
import { getColor } from "@/lib/colors";
import { StatBar } from "../StatBar";

const SoftwareVersionSection = ({ software }: { software: string }) => {
  const { data, error, isLoading } = useSoftwareVersions(software, 10);

  return (
    <div className="w-full">
      <h2 className="mb-3">Versions</h2>

      {isLoading && <p>Loading</p>}
      {error && <p className="text-red-500">{error.message}</p>}

      <div className="mt-6 w-full space-y-4">
        {data?.pages[0].data.map((item, index) => (
          <StatBar
            key={item.version}
            label={item.version}
            subLabel={`${item.count} Servers`}
            value={`${item.percentage}%`}
            percentage={item.percentage}
            color={getColor(index)}
          />
        ))}

        {/* {otherData && (
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
          )} */}
      </div>

      {/* <div className="mt-12 w-full">
          <div className="w-full rounded-full bg-muted h-4 flex overflow-hidden">
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
        </div> */}
    </div>
  );
};

export default SoftwareVersionSection;
