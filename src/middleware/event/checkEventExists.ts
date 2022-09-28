import {Request, response, Response} from 'express'
import db from '../../models';

const {Event} = db;

const checkDuplicatedUsernameOrEmail = async (
    req: Request,
    res: Response,
    next: Function
) => {
    try {
        const event = await Event.findOne({
            where: {
                name: req.body.name,
            }
        })

        if (event) return res.status(400).send({
            message: "Event already exists"
        })
        next()
    } catch ({message}) {
        return res.status(500).send()
    }
};

export default checkDuplicatedUsernameOrEmail
