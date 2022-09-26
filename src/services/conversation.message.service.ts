import db from '../models';
import {where} from "sequelize";
import {sendNotification} from "../services/notification.service";
import {Request, Response} from "express";
import {logger} from "../logger/logger";
const OneSignal = require('onesignal-node');

const {Message, Conversation,User} = db

const addMessage = async (userId: string, messageText: string, conversationId: string) => {
    const message = await Message.create({
        text: messageText,
        userId: userId,
        conversationId: conversationId,
    })

    const conversation = await Conversation.findByPk(conversationId)
    conversation?.addMessage([message])
    return message
}


export const notifyMessage = async (userId:string, conversationId:string,message: string)=>{
    const user = await User.findByPk(userId)
    const conversation = await Conversation.findByPk(conversationId)

    const messageReceivers: string[] = []

    // remove senderId from recipients
    await arrayRemove(messageReceivers, userId)

    if (user && conversation) {
        const conversationUser = await conversation.getUsers()
        conversationUser.forEach(conversation => {
            messageReceivers.push(conversation.id)
        })

        const notify = await sendNotification(user.username,messageReceivers, message)
        return notify
    }
}


const removeMessage = async (messageId: string) => {
    return await Message.destroy({
        where: {
            id: messageId
        }
    })
}

const getMessage = async (messageId: string) => {
    const message = await Message.findByPk(messageId)

    if (!message) throw new Error("Message not found")

    return message
}

const getMessages = async (conversationId: string) => {
    const messages = await Message.findAll({
        where: {
            conversationId: conversationId
        }
    })

    if (!messages) throw new Error("No messages")

    return messages
}

const getLastMessage = async (conversationId: string) => {
    const message = await Message.findOne({
        where: {
            conversationId: conversationId
        },
        order: [['createdAt', 'DESC']]
    })
    if (!message) throw new Error("No message found")
    return message
}

const arrayRemove = async (arr:string[], value:string) => {
    return arr.filter((geeks)=>{
        return geeks != value;
    });
}

export default {
    addMessage,
    notifyMessage,
    removeMessage,
    getMessage,
    getMessages,
    getLastMessage
}
