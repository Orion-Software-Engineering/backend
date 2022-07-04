import {Request, Response} from "express";

const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const db = require('../models')
const User = db.user

// various modules for access checks with token verification

const verifyToken = (req: Request, res: Response, next: Function) => {
    let token = req.headers["x-access-token"]
    // get token from request and return if null
    if (!token) {
        return res.status(403).send({
            message: "No token provided"
        })
    }

    // check that the token is actually a string else JWT will cry
    if (typeof token === "string") {
        jwt.verify(token, config.secret, (err: any, decoded: any) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized"
                })
            }
            // @ts-ignore
            req.userId = decoded.id     // add a new entry called userId, needed later
            next()
        })
    }
}

const isAdmin = (req: Request, res: Response, next: Function) => {
    // @ts-ignore
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next()
                    return
                }
            }
            res.status(403).send({
                message: "Requires Admin Role!"
            })
            return;
        })
    })
}

const isModerator = (req: Request, res: Response, next: Function) => {
    // @ts-ignore
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next()
                    return
                }
            }
            res.status(403).send({
                message: "Requires Moderator Role"
            })
        })
    })
}

const isModeratorOrAdmin = (req: Request, res: Response, next: Function) => {
    // @ts-ignore
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next()
                    return
                }
                if (roles[i].name === "admin") {
                    next()
                    return
                }
            }
            res.status(403).send({
                message: "Requires Moderator or Admin Role"
            })
        })
    })
}

export const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
}