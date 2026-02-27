"use client";

import { useEffect, useState } from "react";
import ServerCard from "@/components/ServerCard";
import { useInstances } from "@/hooks/instance/useInstances";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [software, setSoftware] = useState("");

  const softwares = ["", "mastodon", "lemmy", "misskey", "pixelfed", "pleroma"];

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(inputValue);
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue]);

  const { data, error, isLoading } = useInstances(
    30,
    debouncedSearch,
    software,
  );

  return (
    <div className="my-container">
      <section className="max-w-2xl mt-20 mb-10">
        <h1 className="text-5xl">Servers 🐠</h1>
        <p>
          Explore the Fediverse programmatically. All endpoints return JSON and
          require no authentication for read access.
        </p>
      </section>

      <div className="flex flex-col md:flex-row gap-4 mb-8 w-full max-w-2xl">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border border-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-300 shadow-sm"
        />

        {/* Software Filter Dropdown */}
        <select
          value={software}
          onChange={(e) => setSoftware(e.target.value)}
          className="px-4 py-3 rounded-xl border border-cyan-100 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-300 capitalize"
        >
          <option value="">All Software</option>
          {softwares
            .filter((s) => s !== "")
            .map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
        </select>
      </div>

      <section className="my-20 flex flex-col justify-center">
        {isLoading && <p>Loading</p>}
        {error && <p className="text-red-500">{error.message}</p>}

        <div className="mt-10 w-full gap-6 grid grid-cols-1 md:grid-cols-3">
          {data?.pages
            .flatMap((page) => page.data)
            .map((instance) => (
              <ServerCard key={instance.domain} instance={instance} />
            ))}
        </div>
      </section>
    </div>
  );
}
