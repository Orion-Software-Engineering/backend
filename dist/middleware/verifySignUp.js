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
        User.findOne({
            where: {
                email: req.body.email
            }
        });
    });
};
