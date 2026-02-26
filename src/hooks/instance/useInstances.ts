import { useInfiniteQuery } from "@tanstack/react-query";
import { InstanceService } from "@/services/instance.service";

export const useInstances = (size: number = 10) =>
  useInfiniteQuery({
    queryKey: ["instances", size],
    queryFn: ({ pageParam = 0 }) =>
      InstanceService.getInstances(pageParam, size),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
    },
  });

