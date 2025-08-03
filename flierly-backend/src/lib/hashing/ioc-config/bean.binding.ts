import { ContainerModule } from "inversify";
import HashingModuleBeanTypes from "./bean.types";
import { BcryptService } from "../bcrypt-service/BcryptService";
import BcryptServiceImpl from "../bcrypt-service/BcryptServiceImpl";

const HashingModuleBeans = new ContainerModule((bind) => {
    bind<BcryptService>(HashingModuleBeanTypes.BcryptService).to(BcryptServiceImpl).inSingletonScope();
});

export default HashingModuleBeans;