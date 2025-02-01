import ProductModuleBeanTypes from "@/modules/product/ioc-config/bean.types";
import DatabaseModuleBeanTypes from "../database/ioc-config/bean.types";
import InventoryModuleBeanTypes from "@/modules/inventory/ioc-config/bean.types";
import CoreModuleBeanTypes from "@/modules/core/ioc-config/bean.types";

const BeanTypes = {
    ...CoreModuleBeanTypes,
    ...DatabaseModuleBeanTypes,
    ...ProductModuleBeanTypes,
    ...InventoryModuleBeanTypes
}
export default BeanTypes;