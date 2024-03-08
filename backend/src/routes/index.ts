import branchRouter from "@/modules/branch/branch.router";
import { Router } from "express";

const router = Router();

router.use('/branch', branchRouter);

export default router;