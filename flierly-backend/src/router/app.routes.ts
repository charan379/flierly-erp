import coreModuleRoutes from "@/modules/core/routers";
import iamModuleRoutes from "@/modules/iam/routes";
import inventoryModuleRoutes from "@/modules/inventory/routes";
import organizationModuleRoutes from "@/modules/organization/routes";
import { Router } from "express";

const appRoutes = Router();

appRoutes.use(iamModuleRoutes);
appRoutes.use(coreModuleRoutes);
appRoutes.use(inventoryModuleRoutes);
appRoutes.use(organizationModuleRoutes);

export default appRoutes;