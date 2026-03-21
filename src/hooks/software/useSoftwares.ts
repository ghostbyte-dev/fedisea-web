import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { SoftwareSortField, SortDirection } from "@/lib/types";
import { SoftwareService } from "@/services/software.service";

interface UseSoftwareOptions {
  page?: number;
  size?: number;
  search?: string;
  sortBy?: SoftwareSortField;
  direction?: SortDirection;
}

export const useSoftwares = ({
  page = 0,
  size = 10,
  search = "",
  sortBy = "activeUsersMonth",
  direction = "desc",
}: UseSoftwareOptions = {}) =>
  useQuery({
    queryKey: ["software", page, size, search, sortBy, direction],

    queryFn: () =>
      SoftwareService.getSoftwares(
        page,
        size,
        search,
        sortBy,
        direction,
      ),
  });
