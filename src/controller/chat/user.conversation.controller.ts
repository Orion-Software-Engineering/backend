import {Request, Response} from "express";
import db from '../../models';
import Conversation from "../../models/conversation";
import conversation from '../../services/user.conversation.service'

const {User} = db;

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
        const {conversationId} = req.body


        return res.status(200).send({users})
    } catch ({message}) {
        res.status(400).send({message})
    }
}

export const getConversationsOfUser = async (req: Request, res: Response) => {
    try {
        const {userId} = req.body
        const user = await User.findByPk(userId)
        const conversations = await user?.getConversations()
        return res.status(200).send({conversations})
    } catch ({message}) {
        res.status(400).send({message})
    }
}
