import {Request, Response} from "express";
import {UserRequest} from "../../models/user/user.request";
import db from "../../models";

const {User} = db;

const isModerator = (req: Request, res: Response, next: Function) => {
    User.findByPk((req as UserRequest).userId).then(user => {
        user?.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Moderator Role!"
            });
        });
    });
};

export default isModerator