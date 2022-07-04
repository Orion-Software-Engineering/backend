import {Request, Response} from "express";

const db = require('../models')
const config = require('../config/auth.config')
const User = db.user
const Role = db.role
const Op = db.Sequelize.Op
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// this controller manages sign up and sign in authorization with JWT

// module for signing up new users
exports.signup = (req: Request, res: Response) => {
    // per the Sequelize docs, create is synonymous to an INSERT operation with the given params
    User.create({
        username: req.body.username,
        email: req.body.email,
        // don't store the raw password, encrypt it with bcrypt
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        // if request has 'roles' element
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        // find the role in the 'role' table
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                // roles found, assign to the user
                user.setRoles(roles).then(() => {
                    res.send({
                        message: "User registered successfully!"
                    })
                })
            })
        } else {
            // the user has no roles, hence default is 'user'
            user.setRoles([1]).then(() => {
                res.send({message: "User registered successfully!"})
            })
        }
    }).catch(err => {
        // unhandled promise: server error
        res.status(500).send({message: err.message})
    })
}

// module for logging in users
exports.signin = (req: Request, res: Response) => {
    User.findOne({
        where: {
            // we want only one user with the passed username (there cant be duplicate usernames anyway)
            username: req.body.username
        }
    }).then(user => {
        if (!user) {
            // user is null
            return res.status(404).send({message: "User not found"})
        }
        const passwordIsValid = bcrypt.compareSync(
            // use bcrypt to compare given password to stored password
            req.body.password,
            user.password
        )
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password."
            })
        }
        // generate the token with JWT with 60 days expiration
        const token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 5184000
        })
        const authorities = []
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase())
            }
            // return the user's credentials and access token
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            })
        })
    }).catch(err => {
        // what happened to our promise? oops
        res.status(500).send({
            message: err.message
        })
    })
}