import { Router } from "express";
import branchRoutes from "./branch.routes";

const organizationModuleRoutes = Router();

organizationModuleRoutes.use("/branch", branchRoutes);

export default organizationModuleRoutes;