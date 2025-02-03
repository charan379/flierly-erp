import { Router } from "express";
import brandRoutes from "./brand.routes";

const brandModuleRoutes = Router();

brandModuleRoutes.use("/brand", brandRoutes);

export default brandModuleRoutes;