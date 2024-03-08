import branchModuleRouter from "@/modules/branch/branch.router";
import { Router } from "express";

const router = Router();

router.use('/branch', branchModuleRouter);

export default router;