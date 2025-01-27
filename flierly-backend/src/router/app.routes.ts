import coreModuleRoutes from "@/modules/core/routers";
import iamModuleRoutes from "@/modules/iam/routes";
import inventoryModuleRoutes from "@/modules/inventory/routes";
import organizationModuleRoutes from "@/modules/organization/routes";
import voltasModuleRoutes from "@/modules/voltas/routes";
import { Router } from "express";

const appRoutes = Router();

appRoutes.use(iamModuleRoutes);
appRoutes.use(coreModuleRoutes);
appRoutes.use(inventoryModuleRoutes);
appRoutes.use(organizationModuleRoutes);
appRoutes.use(voltasModuleRoutes);

export default appRoutes;