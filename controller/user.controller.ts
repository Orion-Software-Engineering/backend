import {Request, Response} from "express";

const db = require('../models')
require('../config/auth.config');
const User = db.user

export const allAccess = (req: Request, res: Response) => {
    res.status(200).send("Public Content")
}

export const userBoard = (req: Request, res: Response) => {
    res.status(200).send("User Content.");
};

export const adminBoard = (req: Request, res: Response) => {
    res.status(200).send("Admin Content.");
};

export const moderatorBoard = (req: Request, res: Response) => {
    res.status(200).send("Moderator Content.");
};

export const showAll = (req: Request, res: Response) => {
    User.findAll().then(users => {
        res.status(200).send({
            users
        })
    })
}