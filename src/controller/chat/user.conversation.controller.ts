import {Request, Response} from "express";
import db from '../../models';

const {User} = db;

export const addUserToConversation = async (req: Request, res: Response) => {
    try {
        const {userId, conversationId} = req.body
        const user = await User.findByPk(userId)

        await user?.addConversations([conversationId])

        return res.status(201).send('conversations added successfully')
    } catch (e) {
        return res.status(400).send({e})
    }
}

export const removeUserFromConversation = async (req: Request, res: Response) => {
    try {
        const {userId, conversationId} = req.body
        const user = await User.findByPk(userId)

        await user?.removeConversations([conversationId])

        return res.status(200).send('conversations removed successfully')
    } catch (e) {
        res.status(400).send({e})
    }
}
