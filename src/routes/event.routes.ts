import {Express, Request, Response} from 'express';
import * as controller from '../controller/event.controller';
import isModerator from '../middleware/authentication/isModerator';
import isUserVerified from '../middleware/authentication/isUserVerified';
import isOrganizer from "../middleware/authentication/isOrganizer";


export default (app: Express) => {
    app.use((req: Request, res: Response, next: Function) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.post('/api/event',
        // [isOrganizer],
        controller.createEvent);

    app.get('/api/event/:id',
        controller.getEvent);

    app.delete('/api/event/:id',
        // [isOrganizer],
        controller.deleteEvent);

    app.put('/api/events/:id',
        // [isOrganizer],
        controller.updateEvent);
};
