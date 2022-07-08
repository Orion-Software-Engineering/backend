import {Request, Response} from 'express';
import db from '../../models';
import bcrypt from 'bcryptjs';

const {User} = db;

export const changePassword = async (req: Request, res: Response) => {
    try {
        await User.findOne({
            where: {
                id: req.body.id,
                isEmailVerified: true
            }
        }).then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    return res.status(403).send('New password cannot be same as old password.')
                } else {
                    User.update({
                        password: bcrypt.hashSync(req.body.password, 8)
                    }, {
                        where: {
                            id: req.body.id
                        }
                    }).then(() => {
                        return res.send('Password Changed Successfully.')
                    })
                }
            } else return res.status(403).send('Unable to change password.')
        })
    } catch ({message}) {
        return res.status(400).send('Unable to change password. Please try again later.')
    }

}