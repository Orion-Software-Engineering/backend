import {Request, Response} from "express";
import conversation from '../../services/user.conversation.service'

export const addUserToConversation = async (req: Request, res: Response) => {
    try {
        const {userId, conversationId} = req.body

        return res.status(201).json(await conversation.addUser(userId, conversationId))
    } catch (e) {
        return res.status(400).send({e})
    }
}

export const removeUserFromConversation = async (req: Request, res: Response) => {
    try {
        const {userId, conversationId} = req.body

        return res.status(200).json(await conversation.removeUser(userId, conversationId))
    } catch (e) {
        res.status(400).send({e})
    }
}

export const getUsersOfConversation = async (req: Request, res: Response) => {
    try {
        return res.status(200).json(await conversation.getUsers(req.params.conversationId))
    } catch ({message}) {
        res.status(400).send({message})
    }
}

export const getConversationsOfUser = async (req: Request, res: Response) => {
    try {
        return res.status(200).json(await conversation.getUserConversations(req.params.userId))
    } catch ({message}) {
        res.status(400).send({message})
    }
}
