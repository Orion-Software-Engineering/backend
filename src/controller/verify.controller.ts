import {Request, Response} from "express";
import db from '../models';
import {UserRequest} from "../models/user/user.request";
import {where} from "sequelize";

const {User} = db;

export const verifyEmail = (req: Request, res: Response, next: Function) => {
    const userId = (req as UserRequest).tag
    User.findByPk(userId)
        .then(user => {
                if (user) {
                    User.update({
                        isEmailVerified: true
                    }, {
                        where: {
                            id: userId
                        }
                    })
                }
            }
        )
}