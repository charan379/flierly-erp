import { HttpError } from "http-errors";
import HttpCodes from "@/constants/httpCodes";
import FlierlyException from "@/lib/flierly.exception";

type ErrorResponse = {
    name: String;
    message: string,
    httpCode: HttpCodes,
    reason: string,
    stack?: string
}

function errrorResponseGenerator(error:
    Error |
    HttpError |
    FlierlyException
): ErrorResponse {

    let response: ErrorResponse =
    {
        name: error.name,
        httpCode: HttpCodes.INTERNAL_SERVER_ERROR,
        reason: "",
        stack: (process.env.NODE_ENV === 'development') ? error.stack : "",
        message: error.message ?? 'INTERNAL SERVER ERROR'
    };

    if (error instanceof FlierlyException) {
        response.httpCode = error.httpCode;
        response.reason = error.reason;
    }

    return response;
}

export default errrorResponseGenerator;