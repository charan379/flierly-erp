import coreModuleRoutes from "@/modules/core/routers";
import iamModuleRoutes from "@/modules/iam/routes";
import productModuleRoutes from "@/modules/product/routes";
import { Router } from "express";


const appRoutes = Router();

appRoutes.use(iamModuleRoutes);
appRoutes.use(coreModuleRoutes);
appRoutes.use(productModuleRoutes);

export default appRoutes;