
export type PageMetadata = {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  content: T[];
  page: PageMetadata;
};

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
};

export type Stats = {
  totalInstances: number,
  totalAccounts: number
}