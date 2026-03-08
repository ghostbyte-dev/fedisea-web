
export type PageMetadata = {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
};

export interface PaginatedResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  size: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export type Instance = {
  domain: string;
  software: string;
  version: string;
  openRegistration: boolean;
  totalUsers: number;
  activeUsersMonth: number;
  activeUsersHalfyear: number;
  localPosts: number;
  localComments: number;
  title?: string;
  description?: string;
  source_url?: string;
  thumbnail?: string;
};

export type Software = {
  identifier: string;
  name: string;
  website?: string;
  sourceCode?: string;
  instances?: number;
  activeUsersMonthly?: number;
  activeUsersHalfyear?: number;
  totalUsers?: number;
  localPosts?: number;
  localComments?: number;
}

export type Stats = {
  totalInstances: number,
  totalAccounts: number
}

export type SoftwareDistributionItem = {
  software: string,
  name?: string,
  count: number,
  percentage: number
}