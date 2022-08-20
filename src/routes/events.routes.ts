import {Express, Request, Response} from 'express';
import * as controller from '../controller/events.controller';
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

    app.post('/api/events/createEvent',[isOrganizer], controller.createEvents);
    app.get('/api/events/getEvent/:id', [isOrganizer],controller.getEvents);
    app.delete('/api/events/deleteEvent/:id',[isOrganizer], controller.deleteEvent);
    app.put('/api/events/updateEvent/:id',[isOrganizer], controller.updateEvents);
};
