import {Request, Response} from 'express';
import messageService from '../../services/message.service';

type PostMessage = { conversationId: string; senderId: string; text: string };

const add = async (req: Request, res: Response) => {
    try {
        const messageContext: PostMessage = req.body;
        res.json(await messageService.addMessage(messageContext));
    } catch ({message}) {
        res.status(400).send({message});
    }
};

const getMessages = async (req: Request, res: Response) => {
    const {conversationId} = req.params;
    try {
        res.json(await messageService.getMessages({conversationId}));
    } catch ({message}) {
        res.status(400).send({message});
    }
};

export default {add, getMessages};
