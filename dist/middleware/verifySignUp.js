"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;
let checkDuplicatedUsernameOrEmail;
checkDuplicatedUsernameOrEmail = (req, res, next) => {
    var _a;
    User.findOne({
        // @ts-ignore
        where: { username: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.username }
    }).then((user) => {
        if (user) {
            res.status(400).send({
                message: 'Duplicated username'
            });
        }
    });
};
