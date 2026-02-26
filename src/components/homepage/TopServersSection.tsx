"use client";

import Link from "next/link";
import { useInstances } from "@/hooks/instance/useInstances";

const TopServersSection = () => {
  // We request 6 instances
  const { data, error, isLoading } = useInstances(30);

  return (
    <section className="bg-[#e9f7f9] py-20 flex flex-col justify-center">
      <div className="container flex flex-col items-center">
        <h2 className="mb-3">Top Servers 🐙</h2>
        <p>Servers with the most users across the Fediverse</p>

        {isLoading && <p>Searching the stars...</p>}
        {error && <p className="text-red-500">{error.message}</p>}

        <div className="mt-10 w-full gap-6 grid grid-cols-1 md:grid-cols-3">
          {data?.pages
            .flatMap((page) => page.data)
            .map((instance) => (
              <Link
                href={`/servers/${instance.domain}`}
                key={instance.domain}
                className="bg-white rounded-xl shadow-sm border border-cyan-100 flex flex-col items-center"
              >
                <div className="w-full max-h-54 mb-4 overflow-hidden rounded-lg bg-gray-100 flex-shrink-0">
                  {/** biome-ignore lint/performance/noImgElement: nur test */}
                  <img
                    src={instance.thumbnail || 'https://placehold.co/600x400'}
                    alt={`${instance.domain} icon`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">

                  <span className="font-bold text-cyan-900">
                    {instance.domain}
                  </span>
                  <span className="text-sm text-gray-500">
                    {instance.software}
                  </span>
                  <div className="mt-2 text-xs font-mono bg-cyan-50 px-2 py-1 rounded">
                    {instance.totalUsers?.toLocaleString()} users
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TopServersSection;
