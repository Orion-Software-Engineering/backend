import {Express, Request, Response} from 'express';
import * as controller from '../controller/event.controller';
import {eventsMatchingController} from "../controller/events.matching.controller";
import verifyToken from "../middleware/authentication/verifyToken";
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
        [verifyToken, isOrganizer],
        controller.createEvent);

    app.get('/api/event/:id',
        [verifyToken],
        controller.getEvent);

    app.get('/api/events',
        [verifyToken],
        controller.getAllEvents);

    app.delete('/api/event/:id',
        [verifyToken, isOrganizer],
        controller.deleteEvent);

    app.put('/api/event/:id',
        [verifyToken, isOrganizer],
        controller.updateEvent);

    app.get('/api/events/:id',
        [verifyToken],
        eventsMatchingController);

    app.get('/api/organizer/events/:id',
        controller.getEventsByOrganizer);
}
