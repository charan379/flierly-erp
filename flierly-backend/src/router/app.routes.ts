import coreModuleRoutes from "@/modules/core/routers";
import iamModuleRoutes from "@/modules/iam/routes";
import productModuleRoutes from "@/modules/product/routes";
import organizationModuleRoutes from "@/modules/organization/routes";
import voltasModuleRoutes from "@/modules/voltas/routes";
import { Router } from "express";
import inventoryModuleRoutes from "@/modules/inventory/routes";
import brandModuleRoutes from "@/modules/brand/routes";
import uomModuleRoutes from "@/modules/uom/routes";

const appRoutes = Router();

appRoutes.use(iamModuleRoutes);
appRoutes.use(coreModuleRoutes);
appRoutes.use(productModuleRoutes);
appRoutes.use(organizationModuleRoutes);
appRoutes.use(uomModuleRoutes);
appRoutes.use(voltasModuleRoutes);
appRoutes.use(inventoryModuleRoutes);
appRoutes.use(brandModuleRoutes);

export default appRoutes;