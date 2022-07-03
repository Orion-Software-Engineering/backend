"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authJwt_1 = require("../middleware/authJwt");
const controller = require('../controller/user.controller');
exports.default = (app) => {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });
    app.get('/api/test/all', controller.allAccess);
    app.get('/api/test/user', [authJwt_1.authJwt.verifyToken], controller.userBoard);
    app.get('/api/test/mod', [authJwt_1.authJwt.verifyToken, authJwt_1.authJwt.isModerator], controller.moderatorBoard);
    app.get('/api/test/admin', [authJwt_1.authJwt.verifyToken, authJwt_1.authJwt.isAdmin], controller.adminBoard);
};
