"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SoftwareLogo from "@/components/SoftwareLogo";
import { useInstances } from "@/hooks/instance/useInstances";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(inputValue);
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue]);

  const { data, error, isLoading } = useInstances(30, debouncedSearch);

  return (
    <div className="my-container">
      <section className="max-w-2xl mt-20 mb-10">
        <h1 className="text-5xl">Servers 🐠</h1>
        <p>
          Explore the Fediverse programmatically. All endpoints return JSON and
          require no authentication for read access.
        </p>
      </section>

      <div className="mb-8 w-full max-w-md">
        <input
          type="text"
          placeholder="Search for a server..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-300 shadow-sm"
        />
        {/* Loading indicator for the debounce period */}
        {inputValue !== debouncedSearch && (
          <p className="text-xs text-cyan-600 mt-2 ml-2 animate-pulse">
            Loading
          </p>
        )}
      </div>

      <section className="my-20 flex flex-col justify-center">
        {isLoading && <p>Loading</p>}
        {error && <p className="text-red-500">{error.message}</p>}

        <div className="mt-10 w-full gap-6 grid grid-cols-1 md:grid-cols-3">
          {data?.pages
            .flatMap((page) => page.data)
            .map((instance) => (
              <Link
                href={`/servers/${instance.domain}`}
                key={instance.domain}
                className="bg-white rounded-xl shadow-sm border border-cyan-100 flex flex-col"
              >
                <div className="w-full max-h-54 mb-4 overflow-hidden rounded-lg bg-gray-100 flex-shrink-0">
                  {/** biome-ignore lint/performance/noImgElement: nur test */}
                  <img
                    src={instance.thumbnail || "https://placehold.co/600x400"}
                    alt={`${instance.domain} icon`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2">
                    <SoftwareLogo name={instance.software} size={18} />
                    <span className="font-bold text-cyan-900">
                      {instance.domain}
                    </span>
                  </div>

                  <div className="mt-2 text-xs font-mono bg-cyan-50 px-2 py-1 rounded">
                    {instance.totalUsers?.toLocaleString()} users
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
