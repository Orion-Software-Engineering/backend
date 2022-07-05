import {Express, NextFunction, Request, Response} from "express";
import {verifyEmail} from "../middleware/verifyEmail";
import * as controller from '../controller/verify.controller'

export default (app: Express) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.get('/verify',
        [verifyEmail],
        controller.verified)
}