import {Request, Response} from 'express';
import db from '../models';

const {User} = db;

// basic controllers for content
export const allAccess = (req: Request, res: Response) => {
    res.status(200).send('Public Content');
};

export const userBoard = (req: Request, res: Response) => {
    res.status(200).send('User Content.');
};

export const adminBoard = (req: Request, res: Response) => {
    res.status(200).send('Admin Content.');
};

export const moderatorBoard = (req: Request, res: Response) => {
    res.status(200).send('Moderator Content.');
};

// show all registered users
export const showAll = async (req: Request, res: Response) => {
    await User.findAll()
        .then(users => {
            res.status(200).send({users})
        });
};
