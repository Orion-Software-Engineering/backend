import {Request, Response} from "express";
import conversation, {notifyMessage} from '../../services/conversation.message.service'

export const addMessageToConversation = async (req: Request, res: Response) => {
    try {
        const {userId, messageText, conversationId} = req.body

        res.status(200).send(await conversation.addMessage(userId, messageText, conversationId))
        return await conversation.notifyMessage(userId, messageText)
    } catch ({message}) {
        return res.status(400).send(message)
    }
}

export const removeMessageFromConversation = async (req: Request, res: Response) => {
    try {
        const {messageId} = req.body

        return res.status(200).json(await conversation.removeMessage(messageId))
    } catch ({message}) {
        return res.status(400).send(message)
    }
}

export const getMessageFromConversation = async (req: Request, res: Response) => {
    try {
        return res.status(200).json(await conversation.getMessage(req.params.messageId))
    } catch ({message}) {
        return res.status(400).send(message)
    }
}

export const getMessagesFromConversation = async (req: Request, res: Response) => {
    try {
        return res.status(200).json(await conversation.getMessages(req.params.conversationId))
    } catch ({message}) {
        return res.status(400).send(message)
    }
}

export const getLastMessageFromConversation = async (req: Request, res: Response) => {
    try {
        return res.status(200).send(await conversation.getLastMessage(req.params.conversationId))
    } catch ({message}) {
        return res.status(400).send(message)
    }
}
