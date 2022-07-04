import {verifySignUp} from "../middleware/verifySignUp"

const controller = require("../controller/auth.controller")

// routes for authentication functions

export default (app) => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })

    // the signup controller
    app.post("/api/auth/signup",
        [
            verifySignUp.checkDuplicatedUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    )

    // the sign in controller
    app.post("/api/auth/signin", controller.signin)
}