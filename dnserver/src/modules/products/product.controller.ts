import { RequestHandler } from "express";
import admin from "firebase-admin";
import * as Yup from "yup";
import { IProductDTO } from "./IProductDTO";
import { ProductModel } from "./product.model";

const PRODUCT_TYPES: IProductDTO["product_type"][] = ["non-veg", "none", "veg"]

const createOrUpdate: RequestHandler = async (req, res) => {
    const user = req.user as admin.auth.UserRecord;
    const  body = req.body as IProductDTO;
    if (!user.customClaims) {
        return res.sendStatus(401);
    }
    if (!user.customClaims.isAdmin) {
        return res.sendStatus(401);
    }
    const productValidationSchema = Yup.object<IProductDTO>({
        name: Yup.string().required(),
        description: Yup.string().notRequired(),
        images: Yup.array().of(Yup.string()),
        extras: Yup.mixed(),
        stock: Yup.number().required(),
        createdBy: Yup.string().required(),
        mrp: Yup.number(),
        product_size: Yup.string(),
        product_type: Yup.string().oneOf(PRODUCT_TYPES) as any,
        discount: Yup.number(),
    })
    try {
        if(!body.id){
            await productValidationSchema.validate(body);
            await ProductModel.create(body)
            return res.send(body);
        }
        const old = await ProductModel.findById(body.id);
        if(!old){
            throw new Error("Product not Found");
        }
        Object.keys(body).forEach(key => {
            if (key === "id") {
                return;
            }
            old[key] = body[key];
        })
        await old.save();
        res.send(body);
    } catch (e) {
        return res.status(500).send({ message: e.message || "Unknown Internal Server error", })
    }
}

const getProducts: RequestHandler =async(req,res) => {
    const {page = 1, limit = 10} = (req.query as any) as {page: number, limit: number};
    
    const products = await ProductModel.find().limit(limit).skip((page-1) * limit).exec();
    return res.send(products.map(prod => prod.toObject()));
}
export const Product = {
    createOrUpdate,
    getProducts
}
