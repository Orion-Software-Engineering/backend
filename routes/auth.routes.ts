import {verifySignUp} from "../middleware/verifySignUp"

const controller = require("../controller/auth.controller")

export default (app) => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })

    app.post("/api/auth/signup",
        [
            verifySignUp.checkDuplicatedUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    )

    app.post("/api/auth/signin", controller.signin)

    app.post("/api/auth/verifyEmail", controller.verify)
}