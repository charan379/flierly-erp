import { Router } from "express";
import inventoryRoutes from "./inventoty.routes";


const inventoryModuleRoutes = Router();

inventoryModuleRoutes.use("/inventory", inventoryRoutes);

export default inventoryModuleRoutes;