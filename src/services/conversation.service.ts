import db from '../models';
import conversation from '../models/conversation';

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
    const user = await User.findByPk(userId)
    await user?.removeConversations([conversationId])
}

export default {get, add, remove};
