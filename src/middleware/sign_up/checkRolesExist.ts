import {Request, Response} from "express";
import db from '../../models';

const {ROLES} = db;

const checkRolesExist = (req: Request, res: Response, next: Function) => {
    if (req.body.roles) {
        if (Array.isArray(req.body.roles))
            req.body.roles.forEach((role: string) => {
                if (!ROLES.includes(role)) {
                    return res.status(400).send({
                        'message': `Role ${role} does not exist.`
                    });
                }
            })
        else return res.status(400).send({
            'message': 'Roles must be an array'
        })
    }
    next()
};

export default checkRolesExist