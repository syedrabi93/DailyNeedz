import express from "express";
import morgan from "morgan";
import { IS_PRODUCTION, FIREBASE_CONFIG } from "./config/env";
import { AuthenticationManager } from "./middlewares/authMiddleware";
import admin from "firebase-admin";
import "./config/db";
import { productRouter, orderRouter, addressRouter } from "./modules";
const app = express();

const auth = AuthenticationManager.init(admin, FIREBASE_CONFIG)

app.use(morgan(IS_PRODUCTION ? "common" : "dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/products", auth.protect(), productRouter);
app.use("/api/v1/orders", auth.protect(), orderRouter);
app.use("/api/v1/addresses", auth.protect(), addressRouter);

app.get("/version", (_, res) => {
    res.send({ version: process.env.VERSION })
})


app.listen(3000, () => {
    console.log("Server listening on port 3000")
})