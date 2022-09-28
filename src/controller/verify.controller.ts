import {Request, Response} from "express";
import db from '../models';
import {UserRequest} from "../models/user/user.request";

const {User} = db;

export const verifyEmail = async (req: Request, res: Response) => {
    try {
        const userId = (req as UserRequest).query.tag
        const user = await User.findByPk(userId)
        if (!user) return res.status(404).send()
        if (!user.isEmailVerified) {
            User.update({
                isEmailVerified: true
            }, {
                where: {
                    id: userId
                }
            }).then(() => {
                return res.status(200).send('Account Verified. You can now log in to the app.')
            })
        } else if (user.isEmailVerified) {
            return res.status(200).send('Account Already Verified. You can log in to the app.')
        }
    } catch (_) {
        return res.status(400).send('Could not verify email. Try again later.')
    }
}
