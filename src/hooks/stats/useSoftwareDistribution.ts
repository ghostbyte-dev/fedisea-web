import { useQuery } from "@tanstack/react-query";
import type { SoftwareDistributionItem } from "@/lib/types";
import { StatsService } from "@/services/stats.service";

export const useSoftwareDistribution = (limit?: number) =>
  useQuery<SoftwareDistributionItem[]>({
    queryKey: ["softwareDistribution", limit],
    queryFn: () => StatsService.getSoftwareDistribution(limit),
    staleTime: 1 * 60 * 1000, // 1 minute
  });