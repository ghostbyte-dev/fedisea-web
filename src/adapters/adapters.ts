import type { Instance, SoftwareDistributionItem, Stats } from "@/lib/types";

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
    localComments: data.localComments,
    title: data.title,
    description: data.description,
    source_url: data.source_url,
    thumbnail: data.thumbnail
  })
};

export const mapStats = (data: any): Stats => {
  return ({ totalInstances: data.totalInstances, totalAccounts: data.totalUsers })
}

export const mapSoftwareDistributionItem = (data: any): SoftwareDistributionItem => {
  return ({ software: data.software, name: data.name, count: data.count, percentage: data.percentage })
}