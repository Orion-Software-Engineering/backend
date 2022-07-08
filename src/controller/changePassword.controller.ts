import {Request, Response} from 'express';
import db from '../models';

const {User} = db;
import bcrypt from 'bcryptjs';
import {where} from 'sequelize/types';

require('dotenv').config()

export const changePassword = async (req: Request, res: Response) => {
    try {
        await User.findOne({
            where: {
                'id': req.body.id
            }
        }).then(() => {
            User.update({
                'password': bcrypt.hashSync(req.body.password, 8)
            }, {
                where: {
                    'id': req.body.id
                }
            }).then(() => {
                return res.send('Password Changed Successfully.')
            })
        })
    } catch (_) {
        return res.status(400).send('Unable to change password.')
    }

}