import {Request, Response} from "express";
import db from '../../models';
import Conversation from "../../models/conversation";

const {Message} = db;

export const addMessageToConversation = async (req: Request, res: Response) => {
    try {
        const {userId, messageText, conversationId} = req.body
        await Message.create({
            text: messageText,
            userId: userId,
            conversationId: conversationId
        });

        return res.status(200).send()
    } catch (e) {
        return res.status(400).send()
    }
}

export const removeMessageFromConversation = async (req: Request, res: Response) => {
    try {
        const {messageId} = req.body
        await Message.destroy({
            where: {
                id: messageId
            }
        })

        return res.status(200).send()
    } catch ({message}) {
        return res.status(400).send({message})
    }
}

export const getMessageFromConversation = async (req: Request, res: Response) => {
    try {
        const {messageId} = req.body
        const message = await Message.findByPk(messageId)

        return res.status(200).send({message})
    } catch ({message}) {
        return res.status(400).send({message})
    }
}

export const getMessagesFromConversation = async (req: Request, res: Response) => {
    try {
        const {conversationId} = req.body
        const messages = await Message.findAll({
            where: {
                conversationId: conversationId
            }
        })
        return res.status(200).send({messages})
    } catch ({message}) {
        return res.status(400).send({message})
    }
}
