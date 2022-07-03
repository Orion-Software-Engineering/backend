import {Request, Response} from "express";

const db = require('../models')
const config = require('../config/auth.config')
const User = db.user
const Role = db.role
const Op = db.Sequelize.Op
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
exports.signup = (req: Request, res: Response) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.send({
                        message: "User registered successfully!"
                    })
                })
            })
        } else {
            user.setRoles([1]).then(() => {
                res.send({message: "User registered successfully!"})
            })
        }
    }).catch(err => {
        res.status(500).send({message: err.message})
    })
}

exports.signin = (req: Request, res: Response) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (!user) {

        }
    })
}