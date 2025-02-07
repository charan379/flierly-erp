import { Container } from "inversify";
import DatabaseModuleBeans from "../database/ioc-config/bean.bindings";
import ProductModuleBeans from "@/modules/product/ioc-config/bean.bindings";
import CoreModuleBeans from "@/modules/core/ioc-config/bean.bindings";
import InventoryModuleBeans from "@/modules/inventory/ioc-config/bean.bindings";
import { EnvConfig } from "@/config/env";
import JwtModuleBeans from "../jwt/ioc-config/bean.bindings";
import HashingModuleBeans from "../hashing/ioc-config/bean.binding";
import IamModuleBeans from "@/modules/iam/ioc-config/bean.binding";

const iocContainer = new Container();

iocContainer.load(CoreModuleBeans, DatabaseModuleBeans, ProductModuleBeans, InventoryModuleBeans, JwtModuleBeans, HashingModuleBeans, IamModuleBeans);

iocContainer.bind(Symbol.for("EnvConfig")).toConstantValue(EnvConfig);

export default iocContainer;