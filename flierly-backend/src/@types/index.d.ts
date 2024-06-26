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
    success: boolean,
    result: string | number | null | object | [],
    message: string,
    controller: string,
    error: string | object | null,
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