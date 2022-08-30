import db from '../models'

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
    return await Conversation.findAll({
        include: [
            {
                model: User,
                as: "Users",
                where: {
                    id: userId
                },
                attributes: []  // we don't need any attributes from user
            },
            {
                model: Message,
                as: "Messages",
                attributes: [],
            }],
        attributes: ['id'],
        order: [['Messages', 'createdAt', 'DESC']]
    })
    // return user?.getConversations()
}

export default {
    addUser,
    removeUser,
    getUsers,
    getUserConversations
}
