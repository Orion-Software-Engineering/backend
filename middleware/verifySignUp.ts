import express, {Request, Response} from "express";

const db = require('../models')
const ROLES = db.ROLES
const User = db.user

let checkDuplicatedUsernameOrEmail;
checkDuplicatedUsernameOrEmail = (req: Request, res: Response, next: Function) => {
    User.findOne({
        where: {username: req.body.username}
    }).then((user: any) => {
        if (user) {
            res.status(400).send({
                message: 'Duplicated username'
            })
            return
        }

        // check email is not duplicate
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then((user: any) => {
            if (user) {
                res.status(400).send({
                    message: 'Duplicated email'
                })
                return
            }
            next()
        })
    })
}

let checkRolesExisted;
checkRolesExisted = (req: Request, res: Response, next: Function) => {

}