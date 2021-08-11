import { Schema, model, Model, Document, Types } from "mongoose";
import { IProductDTO } from "./IProductDTO";
import { MongoSchema } from "../../interfaces";

const product: MongoSchema<IProductDTO> = {
    name: { type: String, required: true },
    description: { type: String, required: true },
    extras: { type: Schema.Types.Mixed, },
    stock: { type: Number, required: true },
    images: [{type: String,}],
    createdBy: { type: String, },
    mrp: { type: String },
    product_size: { type: String },
    product_type: { type: String, },
    othersizes: [{ type: Types.ObjectId, ref: "Product" }],
    discount: { type: Number }
};

const ProductSchema = new Schema(product, { timestamps: true })


export const ProductModel = model<IProductDTO & Document>("Product", ProductSchema);