import { HttpError } from "http-errors";
import HttpCodes from "@/constants/httpCodes";
import FlierlyException from "@/lib/flierly.exception";
import { Prisma } from "@prisma/client";

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
    FlierlyException |
    Prisma.PrismaClientKnownRequestError |
    Prisma.PrismaClientUnknownRequestError |
    Prisma.PrismaClientUnknownRequestError |
    Prisma.PrismaClientRustPanicError |
    Prisma.PrismaClientInitializationError |
    Prisma.PrismaClientValidationError
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

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        response.httpCode = HttpCodes.BAD_REQUEST;
        response.reason = `${error.code}:${JSON.stringify(error?.meta)}:${error.clientVersion}`;
        response.message = error.message.split('\n').map((str) => str.trim()).join(', ').trim();
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
        response.httpCode = HttpCodes.BAD_REQUEST;
        response.message = error.message.split('\n').map((str) => str.trim()).join(', ').trim();
        response.reason = `Data Validation Failed::${error.clientVersion}`
    }

    if (error instanceof Prisma.PrismaClientUnknownRequestError ||
        error instanceof Prisma.PrismaClientRustPanicError
    ) {
        response.httpCode = HttpCodes.INTERNAL_SERVER_ERROR;
        response.message = error.message.split('\n').map((str) => str.trim()).join(', ').trim();
        response.reason = `::${error.clientVersion}`
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
        response.httpCode = HttpCodes.INTERNAL_SERVER_ERROR;
        response.message = error.message.split('\n').map((str) => str.trim()).join(', ').trim();
        response.reason = `${error.errorCode} :: ${error.clientVersion}`
    }

    return response;
}

export default errrorResponseGenerator;