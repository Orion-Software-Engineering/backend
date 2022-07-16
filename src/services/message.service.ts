import db from '../models';

type PostMessage = {receiverId: string; senderId: string; text: string};

const addMessage = async (context: PostMessage) => {
  const {text, receiverId, senderId} = context;
  const idHash = [senderId, receiverId].sort().join('');
  return await db.Message.create({
    text,
    senderId,
    idHash,
  });
};

const getMessages = async (context: Omit<PostMessage, 'text'>) => {
  const {senderId, receiverId} = context;
  const idHash = [senderId, receiverId].sort().join('');
  return await db.Message.findAll({
    where: {
      idHash,
    },
  });
};

export default {addMessage, getMessages};
