/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import {Request, Response} from 'express';
import db from '../../models';
import {sendResetMail} from '../../mailer/resetPasswordMailer';
import {UserRequest} from "../../models/user/user.request";

const {User} = db;
require('dotenv').config()

// eslint-disable-next-line prettier/prettier
export const resetPassword = async (req: Request, res: Response) => {
    // check if user exists in database
    User.findOne({
        where: {
            id: req.params.id,
            isEmailVerified: true
        },
    }).then(user => {
        if (user) {
            const passwordResetLink = `${process.env.RESET_PASSWORD_URL}?tag=${user.id}`
            sendResetMail(user.email, passwordResetLink);
            return res.send('Password reset link has been sent to your email.');
        }
        // if user does not exist play with their brains, hahaha :)
        return res.status(403).send('Link has been sent to email.')
    })
};