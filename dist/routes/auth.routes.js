"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifySignUp_1 = require("../middleware/verifySignUp");
const controller = require("../controller/auth.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });
    app.post("/api/auth/signup", [
        verifySignUp_1.verifySignUp.checkDuplicatedUsernameOrEmail,
        verifySignUp_1.verifySignUp.checkRolesExisted
    ]);
};
