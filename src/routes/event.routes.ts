import {Express, Request, Response} from 'express';
import * as controller from '../controller/event.controller';
import * as mController from '../controller/events.matching.controller'
import {eventsMatchingController} from "../controller/events.matching.controller";

export default (app: Express) => {
    app.use((req: Request, res: Response, next: Function) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.post('/api/event',
        // multerUploads,
        controller.createEvent);

    app.get('/api/event/:id',
        controller.getEvent);

    app.get('/api/events',
        controller.getAllEvents);

    app.delete('/api/event/:id',
        // [isOrganizer],
        controller.deleteEvent);

    app.put('/api/event/:id',
        // [isOrganizer],
        // multerUploads,
        controller.updateEvent);

    app.get('/api/events/:id', mController.eventsMatchingController);
};
