import { useInfiniteQuery } from "@tanstack/react-query";
import type { InstanceSortField, SortDirection } from "@/lib/types";
import { InstanceService } from "@/services/instance.service";

interface UseInstancesOptions {
  size?: number;
  search?: string;
  software?: string;
  sortBy?: InstanceSortField;
  direction?: SortDirection;
}

export const useInstances = ({
  size = 10,
  search = "",
  software = "",
  sortBy = "activeUsersMonth",
  direction = "desc",
}: UseInstancesOptions = {}
) =>
  useInfiniteQuery({
    queryKey: ["instances", size, search, software, sortBy, direction],

    queryFn: ({ pageParam = 0 }) =>
      InstanceService.getInstances(
        pageParam,
        size,
        search,
        software,
        sortBy,
        direction,
      ),

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
    },
  });
