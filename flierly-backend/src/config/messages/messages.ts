const messages = Object.freeze({
    classValidatorNotFound: "Validator class not found for ${validator} !",
    requestValidationFail: "Request validation failed!",
    invalidAuthorizationHeader: "Token not provided in headers or cookies.",
    invalidAuthorizationToken: "Authorization headers are not in Bearer format.",
    userNotFound: "Can't find user with provided ${userId}.",
    userInactive: "User is not activated.",
    insufficientPermissions: "Insufficient Permissions, Access Blocked!",
    unknownError: "An unexpected error occurred while processing your request.",
    tokenVerificationFailed: "Token verification failed.",
    privilegeCheckFailed: "User doesn't have the required permissions for ${privilege}.",
    "500": "INTERNAL SERVER ERROR",
    unhandledValidationError: "Unhandled Validation Error !.",
});

export default messages;
