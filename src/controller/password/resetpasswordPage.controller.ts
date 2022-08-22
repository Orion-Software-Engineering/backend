/* eslint-disable prettier/prettier */
import {Request, Response} from 'express';
import db from '../../models';
import path from 'path';

const {User} = db;


export const resetPasswordPage = async (req: Request, res: Response) => {
    const userId = req.params.id
    User.findByPk(userId)
        .then(user => {
            if (user) {
                res.sendFile(path.resolve('src', 'public', 'reset', 'index.html'));
            }
        });
};
