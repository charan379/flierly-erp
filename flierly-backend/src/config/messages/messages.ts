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
    entityIdNotFound: "${entity} not found with ID: ${recordId}",
    // JWT
    TOKEN_CREATION_FAILED: 'Token Creation Failed',
    UNAUTHORIZED_LOGIN: 'Unauthorized Please Login!',
    AUTHENTICATION_EXPIRED: 'Authentication Expired Please Login!',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    INVALID_SIGNATURE: 'Token probably modified or signature changed: invalid signature',
    INVALID_TOKEN: 'Token probably modified or signature changed: invalid token',
    JWT_EXPIRED: 'Token Expired Re-authenticate',
    UNKNOWN_ERROR: 'Unknown Error Occurred while decoding token',
});

export default messages;
