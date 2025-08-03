import { Router } from "express";
import miscRoutes from "./misc.routes";

const coreModuleRoutes = Router();

coreModuleRoutes.use("/misc", miscRoutes);

export default coreModuleRoutes;

