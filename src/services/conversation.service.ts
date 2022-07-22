import db from '../models';

const {Conversation, User} = db;

const get = async (id: string) => {
    return await Conversation.findOne({
        where: {
            id: id,
        },
    });
};

const add = async (senderId: string, receiverId: string) => {
    const conversation = await Conversation.create({
        unseenCount: 0,
    });

    const sender = await User.findOne({
        where: {
            id: senderId,
        },
    });

    const receiver = await User.findOne({
        where: {
            id: receiverId,
        },
    });

    await sender?.addConversations([conversation])
    await receiver?.addConversations([conversation])

    return conversation
};

export default {get, add};
