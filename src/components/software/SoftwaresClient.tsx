// app/software/SoftwareClient.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SoftwareCard from "@/components/SoftwareCard";
import { useSoftwares } from "@/hooks/software/useSoftwares";
import type { SoftwareSortField, SortDirection } from "@/lib/types";
import SingleSelect from "../inputs/SingleSelect";

const sortOrderOptions = [
  { label: "Descending", value: "desc" },
  { label: "Ascending", value: "asc" },
];

const sortOptions = [
  { label: "Users", value: "totalUsers" },
  { label: "Servers", value: "instances" },
  { label: "Monthly Users", value: "activeUsersMonth" },
  { label: "6-Month Users", value: "activeUsersHalfyear" },
  { label: "Posts", value: "localPosts" },
  { label: "Comments", value: "localComments" },
  { label: "Name", value: "identifier" },
];

export default function SoftwaresClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || "",
  );
  const [debouncedSearch, setDebouncedSearch] = useState(inputValue);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 0);
  const [sortOption, setSortOption] = useState<SoftwareSortField>(
    (searchParams.get("sort") as SoftwareSortField) || "totalUsers",
  );
  const [sortOrder, setSortOrder] = useState<SortDirection>(
    (searchParams.get("order") as SortDirection) || "desc",
  );

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearch) params.set("search", debouncedSearch);
    if (sortOption !== "totalUsers") params.set("sort", sortOption);
    if (sortOrder !== "desc") params.set("order", sortOrder);
    if (page > 0) params.set("page", page.toString());

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(url, { scroll: false });
  }, [debouncedSearch, sortOption, page, sortOrder, pathname, router]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(inputValue);
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue]);

  const { data, error, isLoading } = useSoftwares({
    page,
    size: 30,
    search: debouncedSearch,
    sortBy: sortOption,
    direction: sortOrder,
  });

  return (
    <div className="my-container">
      <section className="max-w-2xl mt-20 mb-10">
        <h1 className="text-5xl">Software</h1>
        <p className="mt-4">Explore Software in the Fediverse</p>
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

        <SingleSelect
          value={sortOption}
          onValueChange={(value) => {
            setSortOption(value as SoftwareSortField);
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

      <section className="my-20 flex flex-col justify-center">
        {isLoading && <p>Loading</p>}
        {error && <p className="text-red-500">{error.message}</p>}

        {data && (
          <p className="font-bold text-lg mb-6">
            {data.totalItems.toLocaleString()} Result
            {data.totalItems !== 1 && "s"}:
          </p>
        )}

        <div className="w-full gap-6 grid grid-cols-1">
          {data?.data.map((software) => (
            <SoftwareCard key={software.identifier} software={software} />
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
