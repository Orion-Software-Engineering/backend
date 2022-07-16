import db from '../models';

const get = async (id: string) => {
  return await db.Conversation.findAll({
    where: {
      userId: id,
    },
  });
};

const add = async (userId: string, senderId: string) => {
  await db.Conversation.create({
    senderId,
    userId,
  });
};

export default {get, add};
