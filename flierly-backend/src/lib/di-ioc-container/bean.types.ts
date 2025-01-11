import InventoryModuleBeanTypes from "@/modules/inventory/ioc-config/bean.types";
import DatabaseModuleBeanTypes from "../database/ioc-config/bean.types";

const BeanTypes = {
    ...DatabaseModuleBeanTypes,
    ...InventoryModuleBeanTypes,
}
export default BeanTypes;