import { Router } from "express";
import branchRouter from "../controllers/branch";

const router = Router();

router.use('/branches', branchRouter);

export default router;