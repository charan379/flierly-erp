import ProductModuleBeanTypes from "@/modules/product/ioc-config/bean.types";
import DatabaseModuleBeanTypes from "../database/ioc-config/bean.types";

const BeanTypes = {
    ...DatabaseModuleBeanTypes,
    ...ProductModuleBeanTypes,
}
export default BeanTypes;