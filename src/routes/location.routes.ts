import {NextFunction, Request, Response, Express} from 'express';
import {getUserLocation, updateUserLocation} from "../controller/location.controller";
import verifyToken from "../middleware/authentication/verifyToken";


export default (app: Express) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.get('/api/user/location/:userId',
        [verifyToken],
        getUserLocation)

    app.post('/api/user/location',
        [verifyToken],
        updateUserLocation)

};
