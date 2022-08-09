// import db from '../models';
//
// const {Message, Conversation, User} = db;
//
// type PostMessage = { conversationId: string; senderId: string; text: string };
//
// const addMessage = async (context: PostMessage) => {
//     // const {text, receiverId, senderId} = context;
//     // const idHash = [senderId, receiverId].sort().join('');
//     // return await db.Message.create({
//     //     text,
//     //     senderId,
//     //     idHash,
//     // });
//
//     // to add a message we need the conversation, sender and text
//     const {conversationId, senderId, text} = context;
//     const message = await Message.create({
//         senderId: senderId,
//         conversationId: conversationId,
//         text: text,
//     });
//
//     // update conversation unread message count
//     const conversation = await Conversation.findOne({
//         where: {
//             id: message.conversationId,
//         },
//     });
//
//     conversation?.update({
//         unseenCount: conversation.unseenCount + 1,
//     });
//
//     return message;
// };
//
// const getMessages = async (context: Omit<PostMessage, 'text' | 'senderId'>) => {
//     return await Message.findAll({
//         where: {
//             conversationId: context.conversationId,
//         },
//     });
// };
//
// export default {addMessage, getMessages};
