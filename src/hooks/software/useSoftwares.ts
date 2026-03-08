import { useInfiniteQuery } from "@tanstack/react-query";
import { SoftwareService } from "@/services/software.service";

export const useSoftwares = (
  size: number = 10,
  search: string = "",
  software: string = "",
  sortBy: string = "activeUsersMonth",
  direction: string = "desc"
) =>
  useInfiniteQuery({
    queryKey: ["software", size, search, software, sortBy, direction],

    queryFn: ({ pageParam = 0 }) =>
      SoftwareService.getSoftwares(pageParam, size, search, software, sortBy, direction),

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
    },
  });