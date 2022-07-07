import {Request, Response} from 'express';
import db from '../models';
const {User} = db;
import bcrypt from 'bcryptjs';
import { where } from 'sequelize/types';
require('dotenv').config()

export const changePassword = async (req:Request, res: Response) => {
    try{
        await User.findOne({
            where : req.body.userId
        }).then(user => {
            User.update({
                'password' : bcrypt.hashSync(req.body.password, 8);
            }, where : {
                'id' : req.body.userId
            }).then(() => {
                return res.send('Password Changed Successfully.')
            })
        })
    }catch(_){
        return res.send('Unable to change password.')
    }
    
}