import { Schema, model, Model, Document, Types } from "mongoose";
import { IOrderDTO } from "./IOrderDTO";
import { MongoSchema } from "../../interfaces";

const Order: MongoSchema<IOrderDTO> = {
    ordertotal: { type: Number, required: true },
    status: { type: String },
    userId: { type: String, required: true },
    items: [{ productId: { type: Types.ObjectId, ref: "Product" }, quantity: { type: Number } }]
};

const OrderSchema = new Schema(Order, { timestamps: true })


export const OrderModel = model<IOrderDTO & Document>("Order", OrderSchema);