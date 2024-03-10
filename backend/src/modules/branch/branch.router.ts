import { Router } from "express";
import branchModuleController from "./branch.controller";


const branchModuleRouter = Router();

branchModuleRouter.post('/', branchModuleController.createBranch);
branchModuleRouter.get('/:id', branchModuleController.getBranchById);
branchModuleRouter.get('/status/:id', branchModuleController.getStatusById);
branchModuleRouter.get('/exists-by-name/:name', branchModuleController.getExistenceByName);
branchModuleRouter.get('/exists-by-email/:email', branchModuleController.getExistenceByEmail);
branchModuleRouter.get('/exists-by-phone/:phone', branchModuleController.getExistenceByPhone);
branchModuleRouter.put("/:id", branchModuleController.updateBranch);
branchModuleRouter.patch("/:id/address/:addressId", branchModuleController.updateBranchAddress);
branchModuleRouter.patch("/:id/tax-identity/:taxIdentityId", branchModuleController.updateBranchTaxIdentity)
branchModuleRouter.delete('/:id', branchModuleController.deleteBranch);

export default branchModuleRouter;