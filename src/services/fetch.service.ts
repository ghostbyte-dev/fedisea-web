import type { PageMetadata, PaginatedResponse } from "@/lib/types";

export const fetchSingleAndMap = async <U>(
  url: string,
  mapFn: (data: any) => U,
): Promise<U> => {
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 308) {
      const data = await res.json();
      window.location.href = data.redirect;
    }
    throw new Error("Failed to fetch data");
  }
  const result = await res.json();
  return mapFn(result);
};

export const fetchArrayAndMap = async <U>(
  url: string,
  mapFn: (data: any) => U,
): Promise<U[]> => {
  const res = await fetch(url);

  if (!res.ok) {
    if (res.status === 308) {
      const data = await res.json();
      window.location.href = data.redirect;
    }
    throw new Error("Failed to fetch data");
  }
  console.log(res.status);
  const result = await res.json();
  if (!Array.isArray(result)) throw new Error("Expected array response");
  return result.map(mapFn);
};

export const fetchPagedAndMap = async <U>(
  baseUrl: string,
  mapFn: (data: any) => U,
  page: number = 0,
  size: number = 20
): Promise<PaginatedResponse<U>> => {
  const url = new URL(baseUrl);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("size", size.toString());

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch data");

  const result = await res.json();

  return {
    data: result.data.map(mapFn),
    currentPage: result.currentPage,
    totalPages: result.totalPages,
    totalItems: result.totalItems,
    size: result.size,
    hasNext: result.hasNext,
    hasPrevious: result.hasPrevious
  };
};
