import { mapInstance } from "@/adapters/adapters";
import type { Instance } from "@/lib/types";
import { fetchArrayAndMap, fetchSingleAndMap } from "./fetch.service";

const getAllInstances = async (): Promise<Instance[]> => {
  return fetchArrayAndMap(`/api/proxy/api/servers/details`, mapInstance);
};

const getInstanceByDomain = async (domain: string): Promise<Instance> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("Could not get api url");
  }
  console.log(`${apiUrl}/v1/instances/${domain}`)
  return fetchSingleAndMap(
    `${apiUrl}/v1/instances/${domain}`,
    mapInstance,
  );
};


export const InstanceService = {
  getAllInstances,
  getInstanceByDomain
};
