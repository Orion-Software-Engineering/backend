/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import {Request, Response} from 'express';
import db from '../models';
import { sendresetmail } from '../mailer/resetPasswordMailer';
const {User} = db;
require('dotenv').config()

// eslint-disable-next-line prettier/prettier
export const resetpassword = async (req: Request, res: Response) => {
    // check if user exists in database
    User.findByPk(req.body.email)
    .then(user => {
        if (user?.email){
            const passwordResetLink = `${process.env.PASSWORD_RESET_LINK}?token=${user.id}`
            sendresetmail(req.body.email, passwordResetLink);
        }
        else{
            res.send({
                'response':'Check your mail for reset link.'
            });
        }
    })
};