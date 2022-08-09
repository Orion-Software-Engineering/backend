import {Request, Response} from "express";
import db from '../../models';

const {Conversation, Message} = db;

export const addMessageToConversation = async (req: Request, res: Response) => {
    try {
        const {userId, messageText, conversationId} = req.body

        const conversation = await Conversation.findByPk(conversationId)
        const message = await Message.create({text: messageText})

        await conversation?.addMessage([message.id])

        return res.status(200).send()
    } catch (e) {
        return res.status(400).send()
    }
}

export const removeMessageFromConversation = async (req: Request, res: Response) => {
    try {
        const {userId, messageId, conversationId} = req.body

        const conversation = await Conversation.findByPk(conversationId)
        await conversation?.removeMessage([messageId])

        return res.status(200).send()
    } catch (e) {
        return res.status(400).send()
    }
}

export const getMessageFromConversation = async (req: Request, res: Response) => {
    try {
        const {userId, messageId, conversationId} = req.body
        const conversation = await Conversation.findByPk(conversationId)

        const message = await Message.findByPk(messageId)

        return res.status(200).send(JSON.stringify(message))
    } catch (e) {
        return res.status(400).send()
    }
}

export const getMessagesFromConversation = async (req: Request, res: Response) => {
    try {
        const {userId, messageId, conversationId} = req.body
        const conversation = await Conversation.findByPk(conversationId)

        const messages = await conversation?.getMessages()
        return res.status(200).send(JSON.stringify(messages))
    } catch (e) {
        return res.status(400).send()
    }
}
