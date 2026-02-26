import { mapInstance } from "@/adapters/adapters";
import type { Instance, PaginatedResponse } from "@/lib/types";
import { fetchPagedAndMap, fetchSingleAndMap } from "./fetch.service";

const getInstances = async (page: number = 0,
  size: number = 10): Promise<PaginatedResponse<Instance>> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("Could not get api url");
  }

  const url = new URL(`${apiUrl}/v1/instances`);
  if (size) {
    url.searchParams.append("size", size.toString());
  }
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
