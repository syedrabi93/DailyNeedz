import { Schema, model, Model, Document, SchemaTypes } from "mongoose";
import { IAddressDTA } from "./IAddressDTO";
import {  MongoSchema } from "../../interfaces";

const Address: MongoSchema<IAddressDTA> = {
    name: { type: String, required: true },
    street: {type: String, required: true},
    userId: {type: String, required: true},
    extras: {type: SchemaTypes.Mixed},
    location: {
        type: {type: String, },
        coords: [{type: SchemaTypes.Decimal128,}]
    }
};

const AddressSchema = new Schema(Address, { timestamps: true })


export const AddressModel = model<IAddressDTA & Document>("Address", AddressSchema);