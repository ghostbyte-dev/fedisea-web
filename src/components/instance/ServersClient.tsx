// app/servers/ServersClient.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ServerCard from "@/components/ServerCard";
import { useInstances } from "@/hooks/instance/useInstances";
import type { InstanceSortField, SortDirection } from "@/lib/types";
import SingleCombobox from "../inputs/SingleCombobox";
import SingleSelect from "../inputs/SingleSelect";

const sortOrderOptions = [
  { label: "Descending", value: "desc" },
  { label: "Ascending", value: "asc" },
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

const softwares = [
  "",
  "mastodon",
  "lemmy",
  "misskey",
  "pixelfed",
  "pleroma",
  "loops",
];

export default function ServersClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize state from URL
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

  const softwareOptions = [
    { label: "All Software", value: "" },
    ...softwares.filter(Boolean).map((s) => ({
      label: s.charAt(0).toUpperCase() + s.slice(1),
      value: s,
    })),
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
    const handler = setTimeout(() => setDebouncedSearch(inputValue), 500);
    return () => clearTimeout(handler);
  }, [inputValue]);

  const { data, error, isLoading } = useInstances({
    page,
    size: 30,
    search: debouncedSearch,
    software,
    sortBy: sortOption,
    direction: sortOrder,
  });

  return (
    <div className="my-container">
      <section className="max-w-2xl mt-20 mb-10">
        <h1 className="text-5xl">Servers</h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Explore Servers of the Fediverse
        </p>
      </section>

      <div className="flex flex-col md:flex-row gap-4 mb-8 w-full max-w-4xl">
        <input
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setPage(0);
          }}
          className="flex-1 px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
        />

        <SingleCombobox
          value={software || undefined}
          onValueChange={(value) => {
            setSoftware(value || "");
            setPage(0);
          }}
          options={softwareOptions}
          placeholder="All Software"
          clearable
        />

        <SingleSelect
          value={sortOption}
          onValueChange={(value) => {
            setSortOption(value as InstanceSortField);
            setPage(0);
          }}
          options={sortOptions}
          placeholder="Sort by"
        />

        <SingleSelect
          value={sortOrder}
          onValueChange={(value) => {
            setSortOrder(value as SortDirection);
            setPage(0);
          }}
          options={sortOrderOptions}
          placeholder="Sort order"
        />
      </div>

      <section className="my-10">
        {error && <p className="font-bold">{error.message}</p>}

        {isLoading && <p className="font-bold text-lg mb-6">Loading Servers</p>}

        {data && !isLoading && (
          <p className="font-bold text-lg mb-6">
            {data.totalItems.toLocaleString()} Server
            {data.totalItems !== 1 && "s"}:
          </p>
        )}

        <div className="w-full gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading && (
            <>
              <ServerCard isLoading />
              <ServerCard isLoading />
              <ServerCard isLoading />
            </>
          )}

          {!isLoading &&
            data?.data.map((instance) => (
              <ServerCard key={instance.domain} instance={instance} />
            ))}
        </div>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="mt-12 flex flex-wrap justify-center items-center gap-2 pb-20">
            {page > 2 && (
              <>
                <button
                  type="button"
                  onClick={() => setPage(0)}
                  className="px-4 py-2 rounded-xl border border-border bg-card hover:bg-accent transition-colors"
                >
                  1
                </button>
                <span className="text-muted-foreground">...</span>
              </>
            )}

            {Array.from({ length: data.totalPages }, (_, i) => i)
              .filter((i) => i >= page - 2 && i <= page + 2)
              .map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-4 py-2 rounded-xl border transition-all ${
                    page === p
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border hover:bg-accent"
                  }`}
                >
                  {p + 1}
                </button>
              ))}

            {page < data.totalPages - 3 && (
              <>
                <span className="text-muted-foreground">...</span>
                <button
                  type="button"
                  onClick={() => setPage(data.totalPages - 1)}
                  className="px-4 py-2 rounded-xl border border-border bg-card hover:bg-accent transition-colors"
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
