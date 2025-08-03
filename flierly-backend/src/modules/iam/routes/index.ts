import { Router } from "express";
import userRoutes from "./user.routes";
import roleRoutes from "./role.routes";
import privilegeRoutes from "./privilege.routes";

const iamModuleRoutes = Router();

iamModuleRoutes.use("/user", userRoutes);
iamModuleRoutes.use("/role", roleRoutes);
iamModuleRoutes.use("/privilege", privilegeRoutes);

export default iamModuleRoutes;