import {Request, Response} from 'express';
import db from '../models';

const {INTERESTS} = db;

const checkInterestsExist = (req: Request, res: Response, next: Function) => {
    if (req.body.interests) {
        for (let i = 0; i < req.body.interests.length; i++) {
            if (!INTERESTS.includes(req.body.interests[i])) {
                res.status(400).send({
                    message: 'Interests does not exist',
                });
                return;
            }
        }
    }
    next();
};

export default checkInterestsExist