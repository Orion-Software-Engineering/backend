import {Request, Response} from "express";
import {UserRequest} from "../../models/user/user.request";
import db from "../../models";

const {User} = db;

const isOrganizer = async (req: Request, res: Response, next: Function) => {
    try {
        const user = await User.findByPk(req.body.organizer)
        if (!user) return res.status(404).send('Not a user')
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "organizer") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Organizer Role!"
            });
            return;
        });
    } catch ({message}) {
        console.log(message)
        return res.status(500).send(message)
    }
};

export default isOrganizer
