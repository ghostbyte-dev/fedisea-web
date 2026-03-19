"use client";

import { useInstances } from "@/hooks/instance/useInstances";
import ServerCard from "../ServerCard";

const TopServersSection = () => {
  const { data, error, isLoading } = useInstances({ size: 9 });

  return (
    <section className="bg-[#e9f7f9] py-20 flex flex-col justify-center">
      <div className="my-container flex flex-col items-center">
        <h2 className="mb-3">Top Servers</h2>
        <p>Servers with the most users across the Fediverse</p>

        {isLoading && <p>Searching the stars...</p>}
        {error && <p className="text-red-500">{error.message}</p>}

        <div className="mt-10 w-full gap-6 grid grid-cols-1 md:grid-cols-3">
          {data?.data.map((instance) => (
            <ServerCard key={instance.domain} instance={instance} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopServersSection;
