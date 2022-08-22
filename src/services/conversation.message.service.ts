import db from '../models';

const {Message, Conversation} = db

const addMessage = async (userId: string, messageText: string, conversationId: string) => {
    return await Message.create({
        text: messageText,
        userId: userId,
        conversationId: conversationId,
    })
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

export default {
    addMessage,
    removeMessage,
    getMessage,
    getMessages
}
