import authenticate from '@/controllers/user-controller/authenticate.controller';
import refreshUserAccessToken from '@/controllers/user-controller/refresh-access-token.controller';
import updatePassword from '@/controllers/user-controller/update-password.controller';
import { authorize } from '@/middlewares/authorization.middleware';
import { controllerErrorBoundary } from '@/middlewares/controller-error-boundary.middleware';
import { Router } from 'express';

const userRouter = Router();

userRouter.post(`/user/authenticate`, controllerErrorBoundary(authenticate, 'user'));
userRouter.get(`/user/refresh-access-token`, authorize(), controllerErrorBoundary(refreshUserAccessToken, 'user'));
userRouter.post(`/user/update-password`, authorize('user.manage-password'), controllerErrorBoundary(updatePassword, 'user'));

export default userRouter;
