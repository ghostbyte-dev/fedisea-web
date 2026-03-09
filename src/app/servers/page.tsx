"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ServerCard from "@/components/ServerCard";
import { useInstances } from "@/hooks/instance/useInstances";
import type { InstanceSortField, SortDirection } from "@/lib/types";

export default function Servers() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || "",
  );
  const [debouncedSearch, setDebouncedSearch] = useState(inputValue);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 0);
  const [software, setSoftware] = useState(searchParams.get("software") || "");
  const [sortOption, setSortOption] = useState<InstanceSortField>(
    (searchParams.get("sort") as InstanceSortField) || "users",
  );
  const [sortOrder, setSortOrder] = useState<SortDirection>(
    (searchParams.get("order") as SortDirection) || "desc",
  );

  const softwares = [
    "",
    "mastodon",
    "lemmy",
    "misskey",
    "pixelfed",
    "pleroma",
    "loops",
  ];

  const sortOptions = [
    { label: "Users", value: "users" },
    { label: "Monthly Users", value: "activeUsersMonth" },
    { label: "6-Month Users", value: "activeUsersHalfyear" },
    { label: "Posts", value: "localPosts" },
    { label: "Comments", value: "localComments" },
    { label: "Software Version", value: "softwareVersion" },
    { label: "Domain", value: "domain" },
  ];

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearch) params.set("search", debouncedSearch);
    if (software) params.set("software", software);
    if (sortOption !== "users") params.set("sort", sortOption);
    if (sortOrder !== "desc") params.set("order", sortOrder);
    if (page > 0) params.set("page", page.toString());

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(url, { scroll: false });
  }, [
    debouncedSearch,
    software,
    sortOption,
    sortOrder,
    page,
    pathname,
    router,
  ]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(inputValue);
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue]);

  const { data, error, isLoading } = useInstances({
    page,
    size: 30,
    search: debouncedSearch,
    software: software,
    sortBy: sortOption,
    direction: sortOrder,
  });

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
          onChange={(e) => {
            setInputValue(e.target.value);
            setPage(0);
          }}
          className="flex-1 px-4 py-3 rounded-xl border border-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-300 shadow-sm"
        />

        {/* Software Filter Dropdown */}
        <select
          value={software}
          onChange={(e) => {
            setSoftware(e.target.value);
            setPage(0);
          }}
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

        <select
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value as InstanceSortField);
            setPage(0);
          }}
          className="px-4 py-3 rounded-xl border border-cyan-100 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              Sort by: {opt.label}
            </option>
          ))}
        </select>

        {/* Sort Order Dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value as SortDirection);
            setPage(0);
          }}
          className="px-4 py-3 rounded-xl border border-cyan-100 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
        >
          <option value="desc">Descending ↓</option>
          <option value="asc">Ascending ↑</option>
        </select>
      </div>

      <section className="my-20 flex flex-col justify-center">
        {isLoading && <p>Loading</p>}
        {error && <p className="text-red-500">{error.message}</p>}

        {data && (
          <p className="font-bold text-lg">
            {data?.totalItems.toLocaleString()} Result
            {data?.totalItems > 1 && "s"}:
          </p>
        )}

        <div className="mt-10 w-full gap-6 grid grid-cols-1 md:grid-cols-3">
          {data?.data.map((instance) => (
            <ServerCard key={instance.domain} instance={instance} />
          ))}
        </div>

        {/* Pagination Controls */}
        {data && data.totalPages > 1 && (
          <div className="mt-12 flex flex-wrap justify-center items-center gap-2 pb-20">
            {/* First Page Button */}
            {page > 2 && (
              <>
                <button
                  type="button"
                  onClick={() => setPage(0)}
                  className="px-4 py-2 rounded-xl border border-cyan-100 bg-white hover:bg-cyan-50 transition-colors"
                >
                  1
                </button>
                <span className="text-gray-400">...</span>
              </>
            )}

            {/* Dynamic Page Numbers */}
            {Array.from({ length: data.totalPages }, (_, i) => i)
              .filter((i) => i >= page - 2 && i <= page + 2)
              .map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-4 py-2 rounded-xl border transition-all ${
                    page === p
                      ? "bg-cyan-500 text-white border-cyan-500 shadow-md"
                      : "bg-white border-cyan-100 hover:bg-cyan-50 text-gray-700"
                  }`}
                >
                  {p + 1}
                </button>
              ))}

            {/* Last Page Button */}
            {page < data.totalPages - 3 && (
              <>
                <span className="text-gray-400">...</span>
                <button
                  type="button"
                  onClick={() => setPage(data.totalPages - 1)}
                  className="px-4 py-2 rounded-xl border border-cyan-100 bg-white hover:bg-cyan-50 transition-colors"
                >
                  {data.totalPages}
                </button>
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
