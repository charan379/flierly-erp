import { Router } from "express";
import { create, testGet } from "./branch.controller";


const branchRouter = Router();

branchRouter.get('/', testGet);
branchRouter.post('/', create);

export default branchRouter;