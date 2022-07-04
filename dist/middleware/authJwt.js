"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authJwt = void 0;
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
// various modules for access checks with token verification
const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    // get token from request and return if null
    if (!token) {
        return res.status(403).send({
            message: "No token provided"
        });
    }
    // check that the token is actually a string else JWT will cry
    if (typeof token === "string") {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized"
                });
            }
            // @ts-ignore
            req.userId = decoded.id; // add a new entry called userId, needed later
            next();
        });
    }
};
const isAdmin = (req, res, next) => {
    // @ts-ignore
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Requires Admin Role!"
            });
            return;
        });
    });
};
const isModerator = (req, res, next) => {
    // @ts-ignore
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Requires Moderator Role"
            });
        });
    });
};
const isModeratorOrAdmin = (req, res, next) => {
    // @ts-ignore
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Requires Moderator or Admin Role"
            });
        });
    });
};
exports.authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
};
