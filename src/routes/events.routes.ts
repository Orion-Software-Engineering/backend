import {Express, Request, Response} from 'express';
import * as controller from '../controller/events.controller';
import isModerator from "../middleware/authentication/isModerator";


export default (app: Express) => {
    app.use((req: Request, res: Response, next: Function) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.post("/createEvent", [isModerator], controller.createEvents);
}
