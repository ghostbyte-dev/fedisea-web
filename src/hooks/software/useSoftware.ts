import { useQuery } from "@tanstack/react-query";
import type { Software } from "@/lib/types";
import { SoftwareService } from "@/services/software.service";

export const useSoftware = (identifier: string) =>
  useQuery<Software>({
    queryKey: ["instance", identifier],
    queryFn: () => SoftwareService.getSoftwareByIdentifier(identifier),
    staleTime: 1 * 60 * 1000,
  });
