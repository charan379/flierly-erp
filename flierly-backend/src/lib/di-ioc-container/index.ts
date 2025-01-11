import { Container } from "inversify";
import DatabaseModuleBeans from "../database/ioc-config/bean.bindings";
import InventoryModuleBeans from "@/modules/inventory/ioc-config/bean.bindings";

const iocContainer = new Container();

iocContainer.load(DatabaseModuleBeans, InventoryModuleBeans);

export default iocContainer;