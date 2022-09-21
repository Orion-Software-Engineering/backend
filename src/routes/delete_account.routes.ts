import {Express, Request, Response} from 'express';
import {deleteAccount} from "../controller/account.controller";

// routes for authentication functions

export default (app: Express) => {
    app.use((req: Request, res: Response, next: Function) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    // the delete account controller
    app.post(
        '/api/user/delete', deleteAccount);
};
