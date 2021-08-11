import { RequestHandler } from "express";
import admin from "firebase-admin";
import * as Yup from "yup";
import { IAddressDTA } from "./IAddressDTO";
import { AddressModel } from "./address.model";



const createOrUpdate: RequestHandler = async (req, res) => {
    const user = (req).user as admin.auth.UserRecord;
    const body = req.body as IAddressDTA;

    const addressValidationSchema = Yup.object<IAddressDTA>({
        id: Yup.string(),
        name: Yup.string().required(),
        extras: Yup.mixed(),
        street: Yup.string().required(),
        userId: Yup.string().default(user.uid),
        location: Yup.object().shape({
            type: Yup.string().required(),
            coords: Yup.array().of(Yup.string()).max(2).min(2),
        }) as any,
    });
    try {
        await addressValidationSchema.validate(body);
        if (!body.id) {
            await AddressModel.create(body);
            return res.send(body);
        }
        const old = await AddressModel.findById(body.id);
        Object.keys(body).forEach(key => {
            if (key === "id") {
                return;
            }
            if (body[key]) {
                old[key] = body[key];
            }
        })
        await old.save();
        res.send(old.toObject());
    } catch (e) {
        return res
            .status(500)
            .send({ message: e.message || "Unknown Internal Server error" });
    }
};

const deleteOne: RequestHandler = async (req, res) => {
    const { id } = req.body;
    try {
        await AddressModel.deleteOne({ _id: id });
        return res.sendStatus(200);
    } catch (e) {
        res.sendStatus(500);
    }
}

const getAddresses: RequestHandler = async (req, res) => {
    const user = req.user as admin.auth.UserRecord;
    const adresses = await AddressModel.find({ userId: user.uid });
    res.send(adresses.map(add => add.toObject()));
}


export const Address = {
    createOrUpdate,
    deleteOne,
    getAddresses
};
