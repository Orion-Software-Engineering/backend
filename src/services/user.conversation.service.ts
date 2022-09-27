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
    // return await Conversation.findAll({
    //     include: [
    //         {
    //             model: User,
    //             as: "Users",
    //             where: {
    //                 id: userId
    //             },
    //             attributes: []  // we don't need any attributes from user
    //         },
    //         {
    //             model: Message,
    //             as: "Messages",
    //             attributes: [],
    //         }],
    //     attributes: ['id'],
    //     order: [['Messages', 'createdAt', 'DESC']]
    // })

    const conversations = await Conversation.findAll({
        include: [{
            model: User,
            where: {
                id: userId
            },
            attributes: []
        }, {
            model: Message,
            as: "Messages",
            attributes: [],
        }],
        attributes: ['id'],
        order: [['Messages', 'createdAt', 'DESC']]
    })

    const conversationsWithLastMessages: any[] = []
    for (const conversation of conversations) {
        const lastMessage = await getLastMessageOfConversation(conversation.id)
        const users = await User.findAll({
            include: [{
                model: Conversation,
                where: {
                    id: conversation.id
                },
                attributes: []
            }],
            attributes: ['id', 'username']
        })
        const tempCon = conversation
        // @ts-ignore
        tempCon.setDataValue('lastMessage', lastMessage)

        // @ts-ignore
        tempCon.setDataValue('users', users)
        conversationsWithLastMessages.push(tempCon)
    }

    return conversationsWithLastMessages
}

const getLastMessageOfConversation = async (conversationId: string) => {
    const message = await Message.findOne({
        where: {
            conversationId: conversationId
        },
        attributes: ['userId', 'text'],
        order: [['createdAt', 'DESC']]
    })
    if (!message) throw new Error("No message found")

    const sender = await User.findByPk(message.userId).then(user => user?.username)

    // @ts-ignore
    message.setDataValue('sender', sender)
    return message
}

export default {
    addUser,
    removeUser,
    getUsers,
    getUserConversations
}
