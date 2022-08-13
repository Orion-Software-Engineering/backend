import {Request, Response} from "express";
import db from '../../models';
import Conversation from "../../models/conversation";

const {User} = db;

export const addUserToConversation = async (req: Request, res: Response) => {
    try {
        const {userId, conversationId} = req.body
        const user = await User.findByPk(userId)

        await user?.addConversations(conversationId)

        return res.status(201).send({user})
    } catch (e) {
        return res.status(400).send({e})
    }
}

export const removeUserFromConversation = async (req: Request, res: Response) => {
    try {
        const {userId, conversationId} = req.body
        const user = await User.findByPk(userId)

        await user?.removeConversations([conversationId])

        return res.status(200).send('conversation removed successfully')
    } catch (e) {
        res.status(400).send({e})
    }
}

export const getUsersOfConversation = async (req: Request, res: Response) => {
    try {
        const {conversationId} = req.body
        const users = await User.findAll({
            include: [{
                model: Conversation,
                // through: {
                where: {
                    id: conversationId
                }
                // },
            }]
        })

        const usersInfo: Array<Object> = []
        users.forEach(user => {
            const u = {
                "id": user.id,
                "username": user.username
            }
            usersInfo.push(u)
        })

        // TODO: send only user ids
        return res.status(200).send({usersInfo})
    } catch ({message}) {
        res.status(400).send({message})
    }
}
