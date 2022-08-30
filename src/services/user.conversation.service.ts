import db from '../models'
import {where} from "sequelize";

const {User, Conversation, Message} = db

const addUser = async (userId: string, conversationId: string) => {
    const user = await User.findByPk(userId)

    return user?.addConversations([conversationId]);
}

const removeUser = async (userId: string, conversationId: string) => {
    const user = await User.findByPk(userId)

    return user?.removeConversations([conversationId])
}

const getUsers = async (conversationId: string) => {
    return User.findAll({
        include: [{
            model: Conversation,
            where: {
                id: conversationId
            },
            attributes: []
        }],
        attributes: ['id', 'username']
    })
}

const getUserConversations = async (userId: string) => {
    const user = await User.findByPk(userId)

    const conversations = await Conversation.findAll({
        include: [{
            model: User,
            where: {
                id: userId
            },
            attributes: []  // we don't need any attributes from user
        },
            {
                model: Message,
                order: [['createdAt', 'DESC']]
            }]
    })
    return conversations
    // return user?.getConversations()
}

export default {
    addUser,
    removeUser,
    getUsers,
    getUserConversations
}
