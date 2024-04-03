import controllers from "@/controllers";
import { Router } from "express";

const router = Router();

controllers().then(contros => console.log(contros)).catch(errors => console.log(errors));



export default router;