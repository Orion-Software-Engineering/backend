/* eslint-disable prettier/prettier */
import {Request, Response} from "express";
import db from '../models';
import { UserRequest } from '../models/user/user.request';
const {User} = db;


export const resetpasswordPage = async (req:Request, res:Response) => {
    const userId = (req as UserRequest).query.tag;
    User.findByPk(userId)
    .then(user => {
        if (user){
            res.redirect('/static/resetpassword/?token='+ user.id)
        }
    });
};