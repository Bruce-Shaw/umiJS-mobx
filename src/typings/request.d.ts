export interface TResponse<T> {
  data: T;
  message?: "string";
  success: boolean;
  [propName: string]: any;
}

export interface TPageResponse<T> {
  data: TPageData<T>;
  message: string;
  success: boolean;
  [propName: string]: any;
}

export interface TPageInfo {
  pageSize: number;
  pageNow: number;
  totalCount: number;
  [propName: string]: any;
}

export interface TPageData<T> extends TPageInfo {
  pages: T[];
}
