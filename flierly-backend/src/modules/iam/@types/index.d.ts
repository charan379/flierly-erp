interface AuthenticatedUser {
    user: any
    allowedAccess: string[],
    token: string,
    loggedInAt: Date,
    tokenExpiresAt: Date,
}