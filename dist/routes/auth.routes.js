"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifySignUp_1 = require("../middleware/verifySignUp");
const controller = require("../controller/auth.controller");
// routes for authentication functions
exports.default = (app) => {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });
    // the signup controller
    app.post("/api/auth/signup", [
        verifySignUp_1.verifySignUp.checkDuplicatedUsernameOrEmail,
        verifySignUp_1.verifySignUp.checkRolesExisted
    ], controller.signup);
    // the sign in controller
    app.post("/api/auth/signin", controller.signin);
};
