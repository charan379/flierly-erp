import authenticate from './authenticate';
import refreshUserAccessToken from './refresh-access-token';
import updatePassword from './update-password';


const userController = {
  authenticate,
  refreshUserAccessToken,
  updatePassword,
}

export default userController;
