import { useQuery } from "@tanstack/react-query";
import type { Instance } from "@/lib/types";
import { InstanceService } from "@/services/instance.service";

export const useInstance = (domain: string) =>
  useQuery<Instance>({
    queryKey: ["instance", domain],
    queryFn: () => InstanceService.getInstanceByDomain(domain),
    staleTime: 1 * 60 * 1000,
  });
