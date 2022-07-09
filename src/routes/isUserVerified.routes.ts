import {Express, NextFunction, Request, Response} from "express";
import * as controller from '../controller/isUserVerified.controller'

export default (app: Express) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.post('/api/isUserVerified', controller.verified)
}