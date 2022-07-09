import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import config from "../../config/auth.config";

const verifyToken = (req: Request, res: Response, next: Function) => {
    const token = req.headers['x-access-token'];
    // get token from request and return if null
    if (!token) {
        return res.status(403).send({
            message: 'No token provided',
        });
    }

    // check that the token is actually a string else JWT will cry
    if (typeof token === 'string') {
        jwt.verify(token, config.secret, (err: unknown, decoded: unknown) => {
            if (err) {
                return res.status(401).send({
                    message: 'Unauthorized',
                });
            }
            (req as unknown as { userId: string }).userId = (
                decoded as { id: string }
            ).id; // add a new entry called userId, needed later
            next(); // simply invokes the next middleware function
        });
    }
};

export default verifyToken