function apiResponse(
    success: boolean,
    result: string | number | null | object | any[],
    message: string,
    controller: string,
    error: string | Error | null | ErrorMessage,
    httpCode: number
): ApiResponse {
    return {
        success,
        result,
        message,
        controller,
        error,
        httpCode
    };
}

export default apiResponse;
