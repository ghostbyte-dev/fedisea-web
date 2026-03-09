import { useQuery } from "@tanstack/react-query";
import type { InstanceSortField, SortDirection } from "@/lib/types";
import { InstanceService } from "@/services/instance.service";

interface UseInstancesOptions {
  page?: number;
  size?: number;
  search?: string;
  software?: string;
  sortBy?: InstanceSortField;
  direction?: SortDirection;
}

export const useInstances = ({
  page = 0,
  size = 10,
  search = "",
  software = "",
  sortBy = "activeUsersMonth",
  direction = "desc",
}: UseInstancesOptions = {}
) =>
  useQuery({
    queryKey: ["instances", { size, search, software, page, sortBy, direction }],

    queryFn: () =>
      InstanceService.getInstances(
        page,
        size,
        search,
        software,
        sortBy,
        direction,
      ),

  });
