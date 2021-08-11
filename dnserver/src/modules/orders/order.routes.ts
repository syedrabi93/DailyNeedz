import { Router } from "express";
import { Orders } from "./order.controller";

const orderRouter = Router();

orderRouter.post("/", Orders.create);
orderRouter.get("/",Orders.getOrders);

export { orderRouter };