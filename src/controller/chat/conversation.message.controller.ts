import {Request, Response} from "express";
import db from '../../models';
import conversation from '../../services/conversation.message.service'

const {Message} = db;

export const addMessageToConversation = async (req: Request, res: Response) => {
    try {
        const {userId, messageText, conversationId} = req.body

        await conversation.addMessage(userId, messageText, conversationId)

        return res.status(200).send()
    } catch ({message}) {
        return res.status(400).send({message})
    }
}

export const removeMessageFromConversation = async (req: Request, res: Response) => {
    try {
        const {messageId} = req.body

        await conversation.removeMessage(messageId)

        return res.status(200).send()
    } catch ({message}) {
        return res.status(400).send({message})
    }
}

export const getMessageFromConversation = async (req: Request, res: Response) => {
    try {
        const {messageId} = req.body

        return res.status(200).json(await conversation.getMessage(messageId))
    } catch ({message}) {
        return res.status(400).send({message})
    }
}

export const getMessagesFromConversation = async (req: Request, res: Response) => {
    try {
        const {conversationId} = req.body

        return res.status(200).json(await conversation.getMessages(conversationId))
    } catch ({message}) {
        return res.status(400).send({message})
    }
}
