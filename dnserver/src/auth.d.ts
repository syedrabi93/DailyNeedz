declare module "auth";

declare namespace Express {
    export interface Request {
        user: any;
    }
}