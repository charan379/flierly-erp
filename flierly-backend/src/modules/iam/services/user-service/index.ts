import authenticate from "./authenticate-user";
import getUserPrivilegeCodes from "./get-user-privilege-codes";
import refreshUserAccessToken from "./refresh-user-access-token";
import updateUserPassword from "./update-user-password";


const userService = {
    getUserPrivilegeCodes,
    updateUserPassword,
    authenticate,
    refreshUserAccessToken
};

export default userService;