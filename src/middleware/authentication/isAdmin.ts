import {Request, Response} from "express";
import {UserRequest} from "../../models/user/user.request";
import db from "../../models";

const {User} = db;

const isAdmin = (req: Request, res: Response, next: Function) => {
    User.findByPk((req as UserRequest).userId).then(user => {
        user?.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};

export default isAdmin