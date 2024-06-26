import { HttpError } from "http-errors";
import HttpCodes from "@/constants/httpCodes";
import FlierlyException from "@/lib/flierly.exception";

function errrorMessageGenerator(error:
    Error |
    HttpError |
    FlierlyException
): ErrorMessage {

    let message: ErrorMessage =
    {
        name: error.name,
        httpCode: HttpCodes.INTERNAL_SERVER_ERROR,
        reason: "",
        stack: (process.env.NODE_ENV === 'development') ? error.stack : "",
        message: error.message ?? 'INTERNAL SERVER ERROR'
    };

    if (error instanceof FlierlyException) {
        message.httpCode = error.httpCode;
        message.reason = error.reason;
    }

    return message;
}

export default errrorMessageGenerator;