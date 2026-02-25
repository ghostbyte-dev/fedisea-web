import { useQuery } from "@tanstack/react-query";
import type { Stats } from "@/lib/types";
import { StatsService } from "@/services/stats.service";

export const useStats = () =>
  useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: () => StatsService.getStats(),
    staleTime: 1 * 60 * 1000,
  });
