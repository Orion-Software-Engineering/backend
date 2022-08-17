import {Express, Request, Response} from 'express';
import * as controller from '../controller/events.controller';
import isModerator from '../middleware/authentication/isModerator';
import isUserVerified from '../middleware/authentication/isUserVerified';


export default (app: Express) => {
    app.use((req: Request, res: Response, next: Function) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.post('/api/events/createEvent', controller.createEvents);
    app.get('/api/events/getEvent/:id', controller.getEvents);
    app.delete('/api/events/deleteEvent/:id', controller.deleteEvents);
};
