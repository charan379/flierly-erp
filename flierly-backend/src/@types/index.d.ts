type PageResult = {
    data: any[];
    page: number;
    pageSize: number;
    totalResults: number;
    totalPages: number;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    nextPage?: number;
    previousPage?: number;
    sort?: object;
}

type ModelDetails = {
    entity: string,
    name: string,
    filePath: string,
}

type EntityDetails = {
    entity: string,
    code: string,
    controller: string,
    filePath: string,
}

type SortBy = {
    [key: string]: "desc" | "asc";
}

type ModelSortBy<T> = {
    [key: keyof T]: "desc" | "asc";
}

type PageRequest = {
    page: number;
    size: number;
    sort: SortBy;
}

type ApiResponse = {
    // Indicates if the request was successful
    success: boolean,
    // The result of the API call, can be various types
    result: any,
    // A message providing more details about the result
    message: string,
    // The name of the controller that handled the request
    controller: string,
    // URL of the request
    requestUrl: string,
    // Error details if the request was unsuccessful
    error: string | ErrorObject | null | ErrorMessage,
    // The HTTP status code of the response
    httpCode: number
}

type ErrorMessage = {
    name: String;
    message: string,
    httpCode: HttpCodes,
    reason: string,
    stack?: string
}

type MongoQueryArray = { [x: string]: string | { $regex: RegExp } | boolean | number }[];

type ResLocals = { success: boolean, message: string, controller: string }

type FilterValue = string | number | boolean | Date | FilterObject | FilterArray;

type FilterObject = { [key: string]: FilterValue };

type FilterArray = FilterValue[];

type FilterAndLimitArgs<T> = {
    matcher: RegExp; // Regular expression used for filtering items based on the value of queryKey
    limit: number;   // Maximum number of items to return
    data: T[];       // Array of items to be filtered
    queryKey: keyof T; // Key of the property in the item to be used for filtering
}