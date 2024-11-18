type ApiResponse<T> = {
    success: boolean;
    result: T | null;
    message: string;
    controller: string;
    requestUrl: string;
    error?: ErrorDetails | null;
    httpCode: number;
}

type ErrorDetails = {
    name: string;
    httpCode: number;
    reason: string;
    stack?: string;
    message: string;
  }