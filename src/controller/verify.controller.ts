import {Request, Response} from "express";
import db from '../models';
import {UserRequest} from "../models/user/user.request";

const {User} = db;

export const verifyEmail = (req: Request, res: Response) => {
    const userId = (req as UserRequest).query.tag
    User.findByPk(userId)
        .then(user => {
            if (user) {
                User.update({
                    isEmailVerified: true
                }, {
                    where: {
                        id: userId
                    }
                }).then(() => {
                    return res.status(200).send('Account Verified')
                })
            }
        })
    return res.status(400).send('Could not verify email. Try again later.')
}