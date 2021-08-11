import { RequestHandler } from "express";

export class AuthenticationManager {
    private static instance: AuthenticationManager | null;
    private admin: typeof import("firebase-admin");
    public protect = (): RequestHandler => async (req, res, next) => {
        const { admin } = this;
        const authToken = req.headers["authorization"];
        if (!authToken) {
            return res.sendStatus(401);
        }
        if (!authToken.includes("Bearer")) {
            return res.sendStatus(401);
        }
        const token = authToken.split(" ")[1].trim();
        try {
            const decoded = await admin.auth().verifyIdToken(token);
            const user = await admin.auth().getUser(decoded.uid);

            (req as any).user = user;
            next();
        } catch (e) {
            return res.sendStatus(401);
        }
    }
    static init = (admin: typeof import("firebase-admin"), config: any) => {
        if (!AuthenticationManager.instance) {
            AuthenticationManager.instance = new AuthenticationManager(admin, config);
        }
        return AuthenticationManager.instance;
    }
    constructor(admin: typeof import("firebase-admin"), config: any) {
        admin.initializeApp({
            credential: admin.credential.cert(config)
        })
        this.admin = admin;
    }
}
