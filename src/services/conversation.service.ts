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
    const conversation = await Conversation.create({
        unseenCount: 0,
    });

    const sender = await User.findOne({
        where: {
            id: userId,
        },
    });

    await sender?.addConversations([conversation])

    return conversation
};

export default {get, add};
