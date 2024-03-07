import { Router } from "express";
import create from "./create";

const router = Router();

router.get("/branch", function (req, res, next) {
    console.log({message: "yeah its working!"})
    next();
}, create);

export default router;