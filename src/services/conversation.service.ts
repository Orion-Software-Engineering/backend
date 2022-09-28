import db from '../models';

const {Conversation, User} = db;

const get = async (id: string) => {
    return await Conversation.findOne({
        where: {
            id: id,
        },
    });
};

const add = async (userId: string) => {
    const conversation = await Conversation.create();

    const sender = await User.findOne({
        where: {
            id: userId,
        },
    });

    await sender?.addConversations([conversation])

    return conversation
};

const remove = async (userId: string, conversationId: string) => {
    // const user = await User.findByPk(userId)
    const conversation = await Conversation.findByPk(conversationId)
    // await user?.removeConversations([conversationId])
    if (!conversation) return
    const conversationUsers = await conversation.getUsers()
    for (const cUser of conversationUsers) {
        const user = await User.findByPk(cUser.id)
        user?.removeConversations([conversationId])
    }
}

export default {get, add, remove};
