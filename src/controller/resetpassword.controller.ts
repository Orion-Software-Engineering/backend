/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import {Request, Response} from 'express';
import db from '../models';
import { sendresetmail } from '../mailer/resetPasswordMailer';
const {User} = db;

// eslint-disable-next-line prettier/prettier
export const resetpassword = async (req: Request, res: Response) => {
    // check if user exists in database
    User.findByPk(req.body.email)
    .then(user => {
        if (user?.email){
            sendresetmail(req.body.email, 'link');
        }
        else{
            res.send({
                'response':'Check your mail for reset link.'
            });
        }
    })
};