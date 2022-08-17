import {Request, Response} from "express";
import db from "../../models";

const {User} = db;

const isUserVerified = (req: Request, res: Response, next: Function) => {
    User.findOne({
        where: {
            username: req.body.username,
        }
    }).then(user => {
        if (user) {
            if (user.isEmailVerified) {
                next()
                return
            }
            return res.status(403).send('Verify your account before logging in.')
        }
        return res.status(404).send('Account not found.')
    })
}

export default isUserVerified
