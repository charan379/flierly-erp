import { Container } from "inversify";
import DatabaseModuleBeans from "../database/ioc-config/bean.bindings";
import ProductModuleBeans from "@/modules/product/ioc-config/bean.bindings";

const iocContainer = new Container();

iocContainer.load(DatabaseModuleBeans, ProductModuleBeans);

export default iocContainer;