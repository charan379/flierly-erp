function apiResponse(
    success: boolean,
    result: string | number | null | object | any[],
    message: string,
    controller: string,
    requestUrl: string,
    error: string | Error | null | ErrorMessage,
    httpCode: number
): ApiResponse {
    return {
        success,
        result,
        message,
        controller,
        requestUrl,
        error,
        httpCode,
    };
}

export default apiResponse;
