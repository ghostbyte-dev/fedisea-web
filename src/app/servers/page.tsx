"use client";

import { useEffect, useState } from "react";
import ServerCard from "@/components/ServerCard";
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
              <ServerCard key={instance.domain} instance={instance} />
            ))}
        </div>
      </section>
    </div>
  );
}
