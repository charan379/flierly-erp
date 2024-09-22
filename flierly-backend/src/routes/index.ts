import { Router } from "express";
import { globSync } from "glob";
import path from "path";

const ignoreDirs = ['misc-controller'];

export const customRoutes = globSync(`${__dirname}/**/*-router`)
    .filter(routerDir => !ignoreDirs.includes(routerDir.split(/[\/\\]/g).slice(-1)[0]))
    .map(routerDir => {

        const router = {
            name: path.basename(routerDir),
            directory: routerDir
        }

        return router;
    });

const router = Router();

customRoutes.forEach((route) => {
    const routers = require(`@/routes/${route.name}`).default;
    router.use(routers);
});

export default router;