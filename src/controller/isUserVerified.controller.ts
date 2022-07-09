import {Request, Response} from "express";
import db from '../models';

const {User} = db;

export const verified = (req: Request, res: Response) => {
    try {
        User.findOne({
            where : {
                email : req.body.email
            }
        })
            .then(user => {
                if (user?.isEmailVerified) {
                    res.status(200).send({
                        "response" : "E-mail has been verified."
                    })
                }
                else{
                    res.status(301).send({
                        "response" : "E-mail has not been verified."
                    })
                }
            })
    } catch (_) {
        return res.status(400).send('Could not check verification status.')
    }
}