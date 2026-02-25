import { mapStats } from "@/adapters/adapters";
import type { Stats } from "@/lib/types";
import { fetchSingleAndMap } from "./fetch.service";

const getStats = async (): Promise<Stats> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("Could not get api url");
  }

  return fetchSingleAndMap(`${apiUrl}/v1/stats`, mapStats);
};

export const StatsService = {
  getStats,
};
