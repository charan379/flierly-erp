import { Router } from "express";
import { createBranch, deleteBranch } from "./branch.controller";


const branchModuleRouter = Router();

branchModuleRouter.post('/', createBranch);
branchModuleRouter.delete('/:id', deleteBranch);

export default branchModuleRouter;