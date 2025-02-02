import { Container } from "inversify";
import DatabaseModuleBeans from "../database/ioc-config/bean.bindings";
import ProductModuleBeans from "@/modules/product/ioc-config/bean.bindings";
import CoreModuleBeans from "@/modules/core/ioc-config/bean.bindings";
import InventoryModuleBeans from "@/modules/inventory/ioc-config/bean.bindings";

const iocContainer = new Container();

iocContainer.load(CoreModuleBeans, DatabaseModuleBeans, ProductModuleBeans, InventoryModuleBeans);

export default iocContainer;