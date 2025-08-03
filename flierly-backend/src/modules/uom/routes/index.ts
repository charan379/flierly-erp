import { Router } from "express";
import uomRoutes from "./uom.routes";
import uomConvertionRoutes from "./uom-convertion.routes";


const uomModuleRoutes = Router();

uomModuleRoutes.use("/uom", uomRoutes);
uomModuleRoutes.use("/uom-convertions", uomConvertionRoutes);

export default uomModuleRoutes;