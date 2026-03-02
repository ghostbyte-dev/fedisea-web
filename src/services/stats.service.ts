import { mapSoftwareDistributionItem, mapStats } from "@/adapters/adapters";
import type { SoftwareDistributionItem, Stats } from "@/lib/types";
import { fetchArrayAndMap, fetchSingleAndMap } from "./fetch.service";

const getStats = async (): Promise<Stats> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("Could not get api url");
  }

  return fetchSingleAndMap(`${apiUrl}/v1/stats`, mapStats);
};

const getSoftwareDistribution = async (limit?: number): Promise<SoftwareDistributionItem[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("Could not get api url");
  }

  const url = new URL(`${apiUrl}/v1/software/distribution`);
  if (limit) {
    url.searchParams.append("limit", limit.toString());
  }

  return fetchArrayAndMap(url.toString(), mapSoftwareDistributionItem);
};

export const StatsService = {
  getStats,
  getSoftwareDistribution
};
