import ProductModuleBeanTypes from "@/modules/product/ioc-config/bean.types";
import DatabaseModuleBeanTypes from "../database/ioc-config/bean.types";
import InventoryModuleBeanTypes from "@/modules/inventory/ioc-config/bean.types";
import CoreModuleBeanTypes from "@/modules/core/ioc-config/bean.types";
import JwtModuleBeanTypes from "../jwt/ioc-config/bean.types";
import HashingModuleBeanTypes from "../hashing/ioc-config/bean.types";
import IamModuleBeanTypes from "@/modules/iam/ioc-config/bean.types";

const BeanTypes = {
    EnvConfig: Symbol.for("EnvConfig"),
    ...CoreModuleBeanTypes,
    ...DatabaseModuleBeanTypes,
    ...ProductModuleBeanTypes,
    ...InventoryModuleBeanTypes,
    ...JwtModuleBeanTypes,
    ...HashingModuleBeanTypes,
    ...IamModuleBeanTypes
}
export default BeanTypes;