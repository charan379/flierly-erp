import { Router } from "express";
import { create, testGet } from "./branch.controller";


const branchModuleRouter = Router();

branchModuleRouter.get('/', testGet);
branchModuleRouter.post('/', create);

export default branchModuleRouter;