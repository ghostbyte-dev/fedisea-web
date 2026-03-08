import type { Instance, Software, SoftwareDistributionItem, SoftwareVersion, Stats } from "@/lib/types";

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

export const mapSoftware = (data: any): Software => {
  return {
    identifier: data.identifier,
    name: data.name,
    website: data.website,
    sourceCode: data.sourceCode,
    instances: data.instances,
    activeUsersMonthly: data.activeUsersMonthly,
    activeUsersHalfyear: data.activeUsersHalfyear,
    totalUsers: data.totalUsers,
    localPosts: data.localPosts,
    localComments: data.localComments,
  };
};

export const mapSoftwareVersion = (data: any): SoftwareVersion => {
  return ({ version: data.version, count: data.count, percentage: data.percentage })
}

export const mapStats = (data: any): Stats => {
  return ({ totalInstances: data.totalInstances, totalAccounts: data.totalUsers })
}

export const mapSoftwareDistributionItem = (data: any): SoftwareDistributionItem => {
  return ({ software: data.software, name: data.name, count: data.count, percentage: data.percentage })
}