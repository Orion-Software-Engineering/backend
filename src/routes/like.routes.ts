import {Express, Request, Response, Router} from 'express';
import likeController from '../controller/like.controller';

export default (app: Express) => {
    app.use((req: Request, res: Response, next: Function) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });


    app.post('/api/event/like', likeController.likeEvent);
    app.get('/api/event/dislike/:id', likeController.dislikeEvent);

    app.get('/api/event/likes/:id', likeController.getEventLikes);

}
