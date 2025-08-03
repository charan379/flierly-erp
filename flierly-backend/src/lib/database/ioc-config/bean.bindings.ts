import { ContainerModule, interfaces } from "inversify";
import DatabaseService from "../database-service/DatabaseService";
import DatabaseServiceImpl from "../database-service/DatabaseServiceImpl";
import DatabaseModuleBeanTypes from "./bean.types";


const DatabaseModuleBeans = new ContainerModule((bind: interfaces.Bind) => {
    bind<DatabaseService>(DatabaseModuleBeanTypes.DatabaseService).to(DatabaseServiceImpl).inSingletonScope();
});

export default DatabaseModuleBeans;