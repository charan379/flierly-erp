import authenticate from "@/controllers/user-controller/authenticate";
import refreshAccessToken from "@/controllers/user-controller/refreshAccessToken";
import updatePassword from "@/controllers/user-controller/updatePassword";
import { authorize } from "@/middlewares/authorization.middleware";
import { errorBoundary } from "@/middlewares/error-boundary.middleware";
import { Router } from "express";

const userRouter = Router();

userRouter.post(`/user/authenticate`, errorBoundary(authenticate, 'user'));
userRouter.get(`/user/refresh-access-token`, authorize(), errorBoundary(refreshAccessToken, 'user'));
userRouter.post(`/user/update-password`, authorize("user.manage-password"), errorBoundary(updatePassword, 'user'));


export default userRouter;