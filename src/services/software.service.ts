import { mapSoftware, mapSoftwareVersion } from "@/adapters/adapters";
import type { PaginatedResponse, Software, SoftwareSortField, SoftwareVersion, SortDirection } from "@/lib/types";
import { fetchPagedAndMap, fetchSingleAndMap } from "./fetch.service";


const getSoftwares = async (
  page: number = 0,
  size: number = 10,
  search: string = "",
  sortBy: SoftwareSortField = "activeUsersMonth",
  direction: SortDirection = "desc"
): Promise<PaginatedResponse<Software>> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) throw new Error("Could not get api url");

  const url = new URL(`${apiUrl}/v1/software`);

  url.searchParams.append("page", page.toString());
  url.searchParams.append("size", size.toString());
  url.searchParams.append("search", search);
  url.searchParams.append("sort", sortBy);
  url.searchParams.append("order", direction);

  return fetchPagedAndMap(url.toString(), mapSoftware);
};

const getSoftwareByIdentifier = async (identifier: string): Promise<Software> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("Could not get api url");
  }
  return fetchSingleAndMap(
    `${apiUrl}/v1/software/${identifier}`,
    mapSoftware,
  );
};

const getSoftwareVersions = async (
  software: string,
  page: number,
  size: number,
): Promise<PaginatedResponse<SoftwareVersion>> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) throw new Error("Could not get api url");

  const url = new URL(`${apiUrl}/v1/software/${software}/versions`);

  url.searchParams.append("page", page.toString());
  url.searchParams.append("size", size.toString());

  return fetchPagedAndMap(url.toString(), mapSoftwareVersion);
};

export const SoftwareService = {
  getSoftwares,
  getSoftwareByIdentifier,
  getSoftwareVersions
};
