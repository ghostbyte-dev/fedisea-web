import type { PageMetadata } from "@/lib/types";

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
  url: string,
  mapFn: (data: any) => U,
  page: number = 0,
  size: number = 10,
  queryParams: URLSearchParams = new URLSearchParams()
): Promise<{ content: U[]; page: PageMetadata }> => {
  queryParams.append("page", page.toString());
  queryParams.append("pageSize", size.toString());
  const res = await fetch(`${url}?${queryParams.toString()}`);
  if (!res.ok) {
    if (res.status === 308) {
      const data = await res.json();
      window.location.href = data.redirect;
    }
    throw new Error("Failed to fetch data");
  }
  const result = await res.json();
  return {
    content: result.content.map(mapFn),
    page: result.page,
  };
};
