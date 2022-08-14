import db from '../models'

const {User, Conversation} = db

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
            }
        }],
        attributes: ['id', 'username']
    })
}

const getUserConversations = async (userId: string) => {
    const user = await User.findByPk(userId)
    return user?.getConversations()
}

export default {
    addUser,
    removeUser,
    getUsers,
    getUserConversations
}
