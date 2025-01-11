import { Container } from "inversify";
import DatabaseModuleBeans from "../database/bean.bindings";

const iocContainer = new Container();

iocContainer.load(DatabaseModuleBeans);

export default iocContainer;