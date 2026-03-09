import { useInfiniteQuery } from "@tanstack/react-query";
import type { SoftwareSortField, SortDirection } from "@/lib/types";
import { SoftwareService } from "@/services/software.service";

interface UseSoftwareOptions {
  size?: number;
  search?: string;
  sortBy?: SoftwareSortField;
  direction?: SortDirection;
}

export const useSoftwares = ({
  size = 10,
  search = "",
  sortBy = "activeUsersMonth",
  direction = "desc",
}: UseSoftwareOptions = {}) =>
  useInfiniteQuery({
    queryKey: ["software", size, search, sortBy, direction],

    queryFn: ({ pageParam = 0 }) =>
      SoftwareService.getSoftwares(
        pageParam,
        size,
        search,
        sortBy,
        direction,
      ),

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
    },
  });
