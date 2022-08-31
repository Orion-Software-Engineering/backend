import db from '../models';
import {where} from "sequelize";

const {Message, Conversation} = db

const addMessage = async (userId: string, messageText: string, conversationId: string) => {
    const message = await Message.create({
        text: messageText,
        userId: userId,
        conversationId: conversationId,
    })

    const conversation = await Conversation.findByPk(conversationId)
    conversation?.addMessage([message])
    return message
}

const removeMessage = async (messageId: string) => {
    return await Message.destroy({
        where: {
            id: messageId
        }
    })
}

const getMessage = async (messageId: string) => {
    const message = await Message.findByPk(messageId)

    if (!message) throw new Error("Message not found")

    return message
}

const getMessages = async (conversationId: string) => {
    const messages = await Message.findAll({
        where: {
            conversationId: conversationId
        }
    })

    if (!messages) throw new Error("No messages")

    return messages
}

const getLastMessage = async (conversationId: string) => {
    const message = await Message.findOne({
        where: {
            conversationId: conversationId
        },
        order: [['createdAt', 'DESC']]
    })
    if (!message) throw new Error("No message found")
    return message
}

export default {
    addMessage,
    removeMessage,
    getMessage,
    getMessages,
    getLastMessage
}
