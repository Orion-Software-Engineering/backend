import {Request, Response} from 'express'
import db from '../../models';

const {User} = db;

const checkDuplicatedUsernameOrEmail = (
    req: Request,
    res: Response,
    next: Function
) => {
    User.findOne({
        where: {
            username: req.body.username
        },
    }).then((user: any) => {
        if (user) {
            res.status(400).send({
                message: 'Duplicated username',
            });
            return;
        }

        // check email is not duplicate
        User.findOne({
            where: {
                email: req.body.email,
            },
        }).then((user: any) => {
            if (user) {
                res.status(400).send({
                    message: 'Duplicated email',
                });
                return;
            }
            next();
        });
    });
};

export default checkDuplicatedUsernameOrEmail
