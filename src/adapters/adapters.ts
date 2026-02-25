import type { Instance, Stats } from "@/lib/types";

export const mapInstance = (data: any): Instance => {
  return ({
    domain: data.domain,
    software: data.software,
    version: data.version,
    openRegistration: data.openRegistration,
    totalUsers: data.totalUsers,
    activeUsersMonth: data.activeUsersMonth,
    activeUsersHalfyear: data.activeUsersHalfyear,
    localPosts: data.localPosts,
    localComments: data.localComments
  })
};

export const mapStats = (data: any): Stats => {
  return ({ totalInstances: data.totalInstances, totalAccounts: data.totalUsers })
}