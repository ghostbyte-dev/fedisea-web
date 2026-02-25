
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
};