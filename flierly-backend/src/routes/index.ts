import { Router } from "express";
import { globSync } from "glob";
import path from "path";

const ignoreDirs = ['misc-controller', "upload-controller"];

export const routes = globSync(`${__dirname}/**/*-router`)
    .filter(routerDir => !ignoreDirs.includes(routerDir.split(/[\/\\]/g).slice(-1)[0]))
    .map(routerDir => {

        const route = {
            name: path.basename(routerDir),
            directory: routerDir
        }

        return route;
    });

const router = Router();

routes.forEach((route) => {
    const routers = require(`@/routes/${route.name}`).default;
    router.use(routers);
});

export default router;