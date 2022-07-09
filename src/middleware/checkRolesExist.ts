import {Request, Response} from "express";
import db from '../models';

const {ROLES} = db;

const checkRolesExist = (req: Request, res: Response, next: Function) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: 'Role does not exist',
                });
                return;
            }
        }
    }
    next();
};

export default checkRolesExist