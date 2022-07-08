/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import {Request, Response} from 'express';
import db from '../models';
import {sendResetMail} from '../mailer/resetPasswordMailer';

const {User} = db;
require('dotenv').config()

// eslint-disable-next-line prettier/prettier
export const resetPassword = async (req: Request, res: Response) => {
    // check if user exists in database
    const user = await User.findOne({
        where: {
            email: req.body.email,
        },
    })


    if (user?.email) {
        const passwordResetLink = `${process.env.RESET_PASSWORD_URL}?tag=${user.id}`
        sendResetMail(req.body.email, passwordResetLink);
        res.send({
            'response': 'Check your email for reset link!'
        });
    }
    // if user does not exist play with their brains, hahaha :)
    else {
        res.send({
            'response': 'Check your email for reset'
        });
    }


};