import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {Identifier} from 'sequelize/types';
import config from '../config/auth.config';
import db from '../models';
import {UserRequest} from "../models/user/user.request";

const {User} = db;

// various modules for access checks with token verification

const verifyToken = (req: Request, res: Response, next: Function) => {
    const token = req.headers['x-access-token'];
    // get token from request and return if null
    if (!token) {
        return res.status(403).send({
            message: 'No token provided',
        });
    }

    // check that the token is actually a string else JWT will cry
    if (typeof token === 'string') {
        jwt.verify(token, config.secret, (err: unknown, decoded: unknown) => {
            if (err) {
                return res.status(401).send({
                    message: 'Unauthorized',
                });
            }
            (req as unknown as { userId: string }).userId = (
                decoded as { id: string }
            ).id; // add a new entry called userId, needed later
            next(); // simply invokes the next middleware function
        });
    }
};

// middleware function to check if user is an admin
const isAdmin = (req: Request, res: Response, next: Function) => {
    User.findByPk((req as UserRequest).userId).then(user => {
        user?.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};

// middleware function to check if user is a moderator
const isModerator = (req: Request, res: Response, next: Function) => {
    User.findByPk((req as UserRequest).userId).then(user => {
        user?.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Moderator Role!"
            });
        });
    });
};
// check if user is either admin or moderator
const isModeratorOrAdmin = (req: Request, res: Response, next: Function) => {
    User.findByPk((req as UserRequest).userId).then(user => {
        user?.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Moderator or Admin Role!"
            });
        });
    });
};

// export the functions
export const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin,
};
