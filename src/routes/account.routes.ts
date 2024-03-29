import {Express, Request, Response} from 'express';
import accountController from "../controller/account.controller";
import verifyToken from "../middleware/authentication/verifyToken";

// routes for account related functions
export default (app: Express) => {
    app.use((req: Request, res: Response, next: Function) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    // delete account controller
    app.post('/api/account/delete',
        [verifyToken],
        accountController.deleteAccount);
};
