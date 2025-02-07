import { ContainerModule } from "inversify";
import JwtService from "../jwt-service/JwtService";
import JwtModuleBeanTypes from "./bean.types";
import JwtServiceImpl from "../jwt-service/JwtServiceImpl";

const JwtModuleBeans = new ContainerModule((bind) => {
    bind<JwtService>(JwtModuleBeanTypes.JwtService).to(JwtServiceImpl).inSingletonScope();
});

export default JwtModuleBeans;