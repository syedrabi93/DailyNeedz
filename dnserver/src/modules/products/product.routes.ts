import { Router } from "express";
import { Product } from "./product.controller";


const productRouter = Router();

productRouter.post("/", Product.createOrUpdate);
productRouter.get("/", Product.getProducts);


export { productRouter };