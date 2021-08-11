import { Schema, SchemaTypeOpts, SchemaType } from "mongoose";

export type AnyVal<T extends object> = { [key in keyof T]: any };
export type MongoSchema<T extends object> = { [key in keyof T]: Schema | SchemaTypeOpts<any> | SchemaType };