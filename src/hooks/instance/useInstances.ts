import { useInfiniteQuery } from "@tanstack/react-query";
import { InstanceService } from "@/services/instance.service";


export const useInstances = (
  size: number = 10,
  search: string = "",
  software: string = "",
  sortBy: string = "activeUsersMonth",
  direction: string = "desc"
) =>
  useInfiniteQuery({
    queryKey: ["instances", size, search, software, sortBy, direction],

    queryFn: ({ pageParam = 0 }) =>
      InstanceService.getInstances(pageParam, size, search, software, sortBy, direction),

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
    },
  });