import { Router } from "express";
import CreateOrderController from "../modules/create-order/create-order.controller";
import UpdateOrderController from "../modules/update-order/upate-order.controller";

const router = Router();

router.post("/orders", CreateOrderController.execute);
router.patch("/orders/:id", UpdateOrderController.execute);

export { router };
