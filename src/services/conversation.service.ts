import db from '../models';

const get = async (id: string) => {
    return await db.Conversation.findAll({
        where: {
            userId: id,
        },
    });
};

const add = async (userId: string, senderId: string) => {
    // two conversations need to be created; one for the sender and another for the recipient
    await db.Conversation.create({
        senderId,
        userId,
    });
    await db.Conversation.create({
        senderId: userId,
        userId: senderId,
    });
};

export default {get, add};
