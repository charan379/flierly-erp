import branchRoutes from "@/modules/organization/routes/branch.routes";
import { Router } from "express";


const brandModuleRoutes = Router();

brandModuleRoutes.use(branchRoutes);

export default brandModuleRoutes;