
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

export type Protocol = {
  identifier: string,
  name?: string,
  description?: string,
  website?: string
}

export type Instance = {
  domain: string;
  software: string;
  version: string;
  protocols?: Protocol[];
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
  softwareLogoUrl?: string,
  country?: string,
  city?: string,
  asnName?: string,
  metadata?: Record<string, any>;
};

export type Software = {
  identifier: string;
  name?: string;
  description?: string;
  iconUrl?: string;
  website?: string;
  joinUrl?: string;
  sourceCode?: string;
  license?: string;
  instances?: number;
  activeUsersMonth?: number;
  activeUsersHalfyear?: number;
  totalUsers?: number;
  localPosts?: number;
  localComments?: number;
}

export type SoftwareVersion = {
  version: string,
  count: number,
  percentage: number
}

export type Stats = {
  totalInstances: number,
  totalUsers: number,
  totalActiveUsersMonth: number,
  totalActiveUsersHalfYear: number,
  totalPosts: number,
  totalComments: number
}

export type SoftwareSortField =
  | "instances"
  | "activeUsersMonth"
  | "activeUsersHalfyear"
  | "totalUsers"
  | "localPosts"
  | "localComments"
  | "identifier";

export type InstanceSortField =
  | "localPosts"
  | "localComments"
  | "activeUsersMonth"
  | "activeUsersHalfyear"
  | "users"
  | "softwareVersion"
  | "domain";

export type SortDirection = "asc" | "desc";