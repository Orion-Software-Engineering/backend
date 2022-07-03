import express, {Request, Response} from "express";
import {JwtPayload} from "jsonwebtoken";

const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const db = require('../models')
const User = db.user

const verifyToken = (req: Request, res: Response, next: Function) => {
    let token = req.headers["x-access-token"]

    if (!token) {
        return res.status(403).send({
            message: "No token provided"
        })
    }

    jwt.verify(token, config.secret, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized"
            })
        }
        // @ts-ignore
        req.userId = decoded.id
        next()
    })
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

}