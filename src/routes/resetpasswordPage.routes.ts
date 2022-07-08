/* eslint-disable prettier/prettier */
import {Express, NextFunction, Request, Response} from 'express';
import * as controller from '../controller/resetpasswordPage.controller';

export default (app: Express) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.get('/api/reset', controller.resetPasswordPage);
}