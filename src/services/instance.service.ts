import { mapInstance } from "@/adapters/adapters";
import type { Instance, InstanceSortField, PaginatedResponse, SortDirection } from "@/lib/types";
import { fetchPagedAndMap, fetchSingleAndMap } from "./fetch.service";


const getInstances = async (
  page: number = 0,
  size: number = 10,
  search: string = "",
  software: string = "",
  sortBy: InstanceSortField = "users",
  direction: SortDirection = "desc"
): Promise<PaginatedResponse<Instance>> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) throw new Error("Could not get api url");

  const url = new URL(`${apiUrl}/v1/instances`);

  url.searchParams.append("page", page.toString());
  url.searchParams.append("size", size.toString());
  url.searchParams.append("search", search);
  url.searchParams.append("software", software);
  url.searchParams.append("sort", sortBy);
  url.searchParams.append("order", direction);

  return fetchPagedAndMap(url.toString(), mapInstance);
};

const getInstanceByDomain = async (domain: string): Promise<Instance> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("Could not get api url");
  }
  return fetchSingleAndMap(
    `${apiUrl}/v1/instances/${domain}`,
    mapInstance,
  );
};


export const InstanceService = {
  getInstances,
  getInstanceByDomain
};
