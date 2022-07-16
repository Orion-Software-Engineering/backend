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

export default {addMessage};
