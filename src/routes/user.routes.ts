import {NextFunction, Request, Response, Express} from 'express';

import * as controller from '../controller/user.controller';
import * as matchController from '../controller/match.controller';
import verifyToken from '../middleware/authentication/verifyToken';
import isModerator from '../middleware/authentication/isModerator';
import isAdmin from '../middleware/authentication/isAdmin';

// routes for user functions

export default (app: Express) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.get('/api/user/:userId',
        [verifyToken],
        controller.getUsername)

    app.post('/api/user/bio',
        [verifyToken],
        controller.updateUserBio)

    app.get('/api/user/profile/:userId',
        [verifyToken],
        controller.getUserProfile)

    app.get('/api/test/all',
        controller.allAccess);

    app.get('/api/test/user',
        [verifyToken],
        controller.userBoard);

    app.get(
        '/api/test/mod',
        [verifyToken, isModerator],
        controller.moderatorBoard
    );

    app.get('/api/test/all',
        controller.allAccess);


    app.get('/api/test/admin',
        [verifyToken, isAdmin],
        controller.adminBoard);

    app.get('/api/test/matches/:id',
        [verifyToken],
        matchController.find);

    app.get('/api/test/match/location/:id',
        [verifyToken],
        matchController.findWithLocation)

    app.get(
        '/api/test/users',
        [verifyToken, isAdmin],
        controller.showAll
    );
};
