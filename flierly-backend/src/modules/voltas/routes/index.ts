import { Router } from "express";


const voltasModuleRoutes = Router();

voltasModuleRoutes.use(`/spare-call`, require(`./spare-call.routes`).default);

export default voltasModuleRoutes;