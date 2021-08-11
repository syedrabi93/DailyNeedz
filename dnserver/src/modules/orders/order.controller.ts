import { RequestHandler } from "express";
import admin from "firebase-admin";
import * as Yup from "yup";
import { IOrderDTO } from "./IOrderDTO";
import { OrderModel } from "./order.model";

const create: RequestHandler = async (req, res) => {
    const user = req.user as admin.auth.UserRecord;
    const { body } = req;

    const orderValidationShema = Yup.object<IOrderDTO>({
        id: Yup.string(),
        items: Yup.array().of(
            Yup.object().shape<IOrderDTO["items"][number]>({
                productId: Yup.string(),
                quantity: Yup.number().required(),
            })
        ),
        ordertotal: Yup.number(),
        status: Yup.string().default("processing" as IOrderDTO["status"]) as any,
        userId: Yup.string().default(user.uid),
    });
    try {
        await orderValidationShema.validate(body);
        await OrderModel.create(body);
        return res.send(body);
    } catch (e) {
        return res
            .status(500)
            .send({ message: e.message || "Unknown Internal Server error" });
    }
};

const getOrders: RequestHandler = async (req, res) => {
    const user = req.user as admin.auth.UserRecord;

    const orders = await OrderModel.find({userId: user.uid,},).sort({createdAt: 1}).exec();

    res.json(orders.map(ord => ord.toObject()));
}

export const Orders = {
    create,
    getOrders
};
