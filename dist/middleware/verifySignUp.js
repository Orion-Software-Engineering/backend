"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;
let checkDuplicatedUsernameOrEmail;
checkDuplicatedUsernameOrEmail = (req, res, next) => {
    User.findOne({
        where: { username: req.body.username }
    }).then((user) => {
        if (user) {
            res.status(400).send({
                message: 'Duplicated username'
            });
            return;
        }
        // check email is not duplicate
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then((user) => {
            if (user) {
                res.status(400).send({
                    message: 'Duplicated email'
                });
                return;
            }
            next();
        });
    });
};
let checkRolesExisted;
checkRolesExisted = (req, res, next) => {
};
