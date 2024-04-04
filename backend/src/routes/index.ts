import controllers from "@/controllers";
import { getModelsList } from "@/models";
import { Router } from "express";

const router = Router();

controllers().then(contros => console.log(contros)).catch(errors => console.log(errors));

getModelsList().then(() => {
    
})
export default router;