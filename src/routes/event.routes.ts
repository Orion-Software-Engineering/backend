import {Express, Request, Response} from 'express';
import * as controller from '../controller/event.controller';
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: __dirname + '../../../images/',
    filename(req: Request,
             file: Express.Multer.File,
             callback: (error: (Error | null), filename: string) => void) {
        callback(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage})

export default (app: Express) => {
    app.use((req: Request, res: Response, next: Function) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.post('/api/event',
        upload.single('cover-image'),
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
        controller.updateEvent);
};
