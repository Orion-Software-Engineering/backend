import {Request, Response} from "express";
import db from '../../models';

const {Conversation, Message} = db;

export const addMessageToConversation = async (req: Request, res: Response) => {
    const {userId, messageText, conversationId} = req.body

    const conversation = await Conversation.findByPk(conversationId)
    const message = await Message.create({text: messageText})

    await conversation?.addMessage([message.id])
}

export const removeMessageFromConversation = async (req: Request, res: Response) => {

}

export const getMessageFromConversation = async (req: Request, res: Response) => {

}

export const getMessagesFromConversation = async (req: Request, res: Response) => {

}
