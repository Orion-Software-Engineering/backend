import {Request, Response} from "express";
import db from '../../models';

const {ROLES} = db;

const checkRolesExist = (req: Request, res: Response, next: Function) => {
    if (req.body.roles) {
        req.body.roles.forEach((role: string) => {
            if (!ROLES.includes(role)) {
                return res.status(400).send({
                    'message': `Role ${role} does not exist.`
                });
            }
        })
    }
    next()
};

export default checkRolesExist