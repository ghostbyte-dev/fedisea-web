import { useQuery } from "@tanstack/react-query";
import type { Software } from "@/lib/types";
import { SoftwareService } from "@/services/software.service";

export const useSoftware = (identifier: string | undefined) =>
  useQuery<Software>({
    queryKey: ["instance", identifier],
    queryFn: () => {
      if (!identifier) throw new Error("Identifier is required");
      return SoftwareService.getSoftwareByIdentifier(identifier)
    },
    staleTime: 1 * 60 * 1000,
    enabled: !!identifier
  });
