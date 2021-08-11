import { Router } from "express";
import { Address } from "./address.controller";


const addressRouter = Router();


addressRouter.post("/", Address.createOrUpdate);
addressRouter.delete("/",Address.deleteOne);
addressRouter.get("/",Address.getAddresses);

export { addressRouter };