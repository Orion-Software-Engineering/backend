import {Request, Response} from "express";
import db from '../models';
import {UserRequest} from "../models/user/user.request";

const {User} = db;

export const verifyEmail = (req: Request, res: Response, next: Function) => {
    const userId = req.query.tag
    User.findByPk((req as UserRequest).tag)
        .then(user => {
                if (user) {
                    User.create({
                        username: user.username,
                        email: user.email,
                        id: user.id,
                        isEmailVerified: true,
                        password: user.password,
                    })
                }

            }
        )
}