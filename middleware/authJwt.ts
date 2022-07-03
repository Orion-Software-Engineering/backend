import express, {Request, Response} from "express";

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

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
            return res.status(401).send({
                message:"Unauthorized"
            })
        }
        req.userId = decoded.id
        next()
    })
}