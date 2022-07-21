import db from '../models';

const {Conversation, User} = db;

const get = async (id: string) => {
  return await Conversation.findAll({
    where: {
      id: id,
    },
  });
};

const add = async (userId: string, senderId: string) => {
  // await db.Conversation.create({
  //     senderId,
  //     userId,
  // });
  // await db.Conversation.create({
  //     senderId: userId,
  //     userId: senderId,
  // });
  const convo = await Conversation.create({
    unseenCount: 0,
  });

  const user = await User.findByPk(userId);
};

export default {get, add};
