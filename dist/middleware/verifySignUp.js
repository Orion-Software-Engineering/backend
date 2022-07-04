"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySignUp = void 0;
const db = require('../models');
const ROLES = db.ROLES;
const INTERESTS = db.INTERESTS;
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
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: 'Role does not exist'
                });
                return;
            }
        }
    }
    next();
};
let checkInterestsExisted;
checkInterestsExisted = (req, res, next) => {
    if (req.body.interests) {
        for (let i = 0; i < req.body.interests.length; i++) {
            if (!INTERESTS.includes(req.body.interests[i])) {
                res.status(400).send({
                    message: 'Interests does not exist'
                });
                return;
            }
        }
    }
};
exports.verifySignUp = {
    checkDuplicatedUsernameOrEmail: checkDuplicatedUsernameOrEmail,
    checkRolesExisted: checkRolesExisted,
    checkInterestsExisted: checkInterestsExisted
};
