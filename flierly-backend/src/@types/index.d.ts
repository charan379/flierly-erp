interface Page<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalResults: number;
  totalPages: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  nextPage?: number;
  previousPage?: number;
  sort?: object;
};

interface EntityDetails {
  entity: string;
  code: string;
  controller: string;
  filePath: string;
};

interface SortBy {
  [key: string]: 'desc' | 'asc';
};

interface ApiResponse<T> {
  // Indicates if the request was successful
  success: boolean;
  // The result of the API call, can be various types
  result: T;
  // A message providing more details about the result
  message: string;
  // The name of the controller that handled the request
  controller: string;
  // URL of the request
  requestUrl: string;
  // Error details if the request was unsuccessful
  error: string | null | ErrorMessage;
  // The HTTP status code of the response
  httpCode: number;
};

interface ErrorMessage {
  name: String;
  message: string;
  httpCode: number;
  stack?: string;
};

type ResLocals = { success: boolean; message: string; controller: string };

type FilterValue = string | number | boolean | Date | FilterObject | FilterArray;

type FilterObject = { [key: string]: FilterValue };

type SortObject = { [key: string]: 'ascend' | 'descend' };

/**
 * Type representing possible sort order values.
 */
type SortOrder = 'ascend' | 'descend' | 'asc' | 'desc' | 'ascending' | 'descending' | 1 | -1;


type FilterArray = FilterValue[];

interface FilterAndLimitArgs<T> {
  matcher: RegExp; // Regular expression used for filtering items based on the value of queryKey
  limit: number; // Maximum number of items to return
  data: T[]; // Array of items to be filtered
  queryKey: keyof T; // Key of the property in the item to be used for filtering
};