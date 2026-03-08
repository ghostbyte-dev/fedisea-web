import { useInfiniteQuery } from "@tanstack/react-query";
import { SoftwareService } from "@/services/software.service";

export const useSoftwareVersions = (
  software: string,
  size: number = 10,
) =>
  useInfiniteQuery({
    queryKey: ["softwareVersions", software, size],

    queryFn: ({ pageParam = 0 }) =>
      SoftwareService.getSoftwareVersions(software, pageParam, size),

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
    },
  });