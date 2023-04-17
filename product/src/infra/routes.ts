import { Router } from "express";
import CreateProductController from "../modules/create-product/create-product.controller";

const router = Router();

router.post("/products", CreateProductController.execute);

export { router };
