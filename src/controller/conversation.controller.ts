import {Request, Response} from 'express';
import conversationService from '../services/conversation.service';

const get = async (req: Request, res: Response) => {
    try {
        res.json(await conversationService.get(req.params.id));
    } catch ({message}) {
        res.status(400).send({message});
    }
};

const add = async (req: Request, res: Response) => {
    try {
        const {userId}: { userId: string } = req.body;
        res.json(await conversationService.add(userId));
    } catch ({message}) {
        res.status(400).send({message});
    }
};

export default {get, add};
