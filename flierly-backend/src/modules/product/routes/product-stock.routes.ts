import CRUDController from "@/modules/core/controllers/crud-controller";
import { Router } from "express";
import { authorize } from "@/middlewares/authorization.middleware";
import ProductStock from "../entities/ProductStock.entity";
import iocContainer from "@/lib/di-ioc-container";
import ProductStockController from "../controller/product-stock-controller/ProductStockController";
import BeanTypes from "@/lib/di-ioc-container/bean.types";
import { requestValidator } from "@/middlewares/request-validator.middleware";
import TransferStockIntraBranchDTO from "../dto/TransferStockIntraBranch.dto";
import AdjustProductStockBalanceDTO from "../dto/AdjustProductStockBalance.dto";

const productStockRoutes = Router();

const crudController = CRUDController(ProductStock);

const productStockController = iocContainer.get<ProductStockController>(BeanTypes.ProductStockController);

// crud routes
productStockRoutes.post(`/read`, authorize(`product-stock.read`), crudController.read);
productStockRoutes.post(`/search`, authorize(`product-stock.read`), crudController.search);
productStockRoutes.post(`/is-exists`, authorize(`product-stock.read`), crudController.isExists);
productStockRoutes.post(`/page`, authorize(`product-stock.read`), crudController.page);
productStockRoutes.post(`/intra-branch-transfer`, requestValidator(TransferStockIntraBranchDTO, "body"), authorize(`product-stock.manage`), productStockController.transferStockIntraBranch.bind(productStockController));
productStockRoutes.post(`/adjust-balance`, requestValidator(AdjustProductStockBalanceDTO, "body"), authorize(`product-stock.manage`), productStockController.adjustStockBalance.bind(productStockController));

export default productStockRoutes;