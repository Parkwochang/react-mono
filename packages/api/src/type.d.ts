// ----------------------------------------------------------------------
// ! API Response Type

export interface Pagination {
  endPageNo: number;
  maxValue: number;
  minValue: number;
  pageNo: number;
  rowsPerPage: number;
  startPageNo: number;
  totalCount: number;
}

export interface ApiResponse<T> {
  code: string;
  message: string;
  additionalMessage?: string;
  responseTime: string;
  body: T;
}

export interface ApiPaginatedResponse<T extends Record<string, unknown>> extends ApiResponse<{
  pagination: Pagination;
  list: T[];
}> {}

export interface ApiErrorResponse extends ApiResponse<null> {}

// ----------------------------------------------------------------------
// ! Utility Type

export interface ApiContext {
  skipAuth?: boolean;
  suppressToast?: boolean;
}
