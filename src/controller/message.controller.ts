import {Request, Response} from 'express';
import messageService from '../services/message.service';

type PostMessage = {receiverId: string; senderId: string; text: string};

const add = async (req: Request, res: Response) => {
  try {
    const messageContext: PostMessage = req.body;
    res.json(await messageService.addMessage(messageContext));
  } catch ({message}) {
    res.status(400).send({message});
  }
};

const getMessages = async (req: Request, res: Response) => {
  const {senderId, receiverId} = req.params;
  try {
    res.json(await messageService.getMessages({senderId, receiverId}));
  } catch ({message}) {
    res.status(400).send({message});
  }
};

export default {add, getMessages};