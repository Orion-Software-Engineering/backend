import {Express, Request, Response, Router} from 'express';
import likeController from '../controller/like.controller';
import verifyToken from "../middleware/authentication/verifyToken";

export default (app: Express) => {
    app.use((req: Request, res: Response, next: Function) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });


    app.post('/api/event/like',
        [verifyToken],
        likeController.likeEvent);

    app.get('/api/event/likes/:id',
        [verifyToken],
        likeController.getEventLikes);

    app.post('/api/event/unlike',
        [verifyToken],
        likeController.unlikeEvent);

}
