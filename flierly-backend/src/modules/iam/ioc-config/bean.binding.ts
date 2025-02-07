import { ContainerModule } from "inversify";
import UserService from "../services/user-service/UserService";
import UserServiceImpl from "../services/user-service/UserServiceImpl";
import IamModuleBeanTypes from "./bean.types";
import UserController from "../controllers/user-controller/UserController";
import UserControllerImpl from "../controllers/user-controller/UserControllerImpl";

const IamModuleBeans = new ContainerModule((bind) => {
    bind<UserService>(IamModuleBeanTypes.UserSevice).to(UserServiceImpl).inSingletonScope();
    bind<UserController>(IamModuleBeanTypes.UserController).to(UserControllerImpl).inSingletonScope();
});

export default IamModuleBeans;