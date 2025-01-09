import coreModuleRoutes from "@/modules/core/routers";
import iamModuleRoutes from "@/modules/iam/routes";
import inventoryModuleRoutes from "@/modules/inventory/routes";
import { Router } from "express";


const appRoutes = Router();

appRoutes.use(iamModuleRoutes);
appRoutes.use(coreModuleRoutes);
appRoutes.use(inventoryModuleRoutes);

export default appRoutes;