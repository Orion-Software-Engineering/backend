import {Express, Request, Response, Router} from 'express';
import logsController from '../controller/logs.controller';

export default (app: Express) => {
    app.use((req: Request, res: Response, next: Function) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });


    app.get('/api/logs/download', logsController.download)

}
