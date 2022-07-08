import {Request, Response} from 'express';
import db from '../models';

const {User} = db;
import bcrypt from 'bcryptjs';
import {where} from 'sequelize/types';

export const changePassword = async (req: Request, res: Response) => {
    try {
        await User.findOne({
            where: {
                'id': req.body.id
            }
        }).then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    return res.status(403).send('New password cannot be same as old password.')
                } else {
                    User.update({
                        'password': bcrypt.hashSync(req.body.password, 8)
                    }, {
                        where: {
                            'id': req.body.id
                        }
                    }).then(() => {
                        return res.send('Password Changed Successfully.')
                    })
                }
            }
            else return res.status(403).send('Unable to change password.')
        })
    } catch (_) {
        return res.status(403).send('Unable to change password.')
    }

}