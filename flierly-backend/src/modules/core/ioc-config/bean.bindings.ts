import { ContainerModule } from "inversify";
import LoggerService from "../services/logger-service/LoggerService";
import CoreModuleBeanTypes from "./bean.types";
import LoggerServiceImpl from "../services/logger-service/LoggerServiceImpl";

const CoreModuleBeans = new ContainerModule((bind) => {
    bind<LoggerService>(CoreModuleBeanTypes.LoggerService).to(LoggerServiceImpl).inSingletonScope();
});

export default CoreModuleBeans;