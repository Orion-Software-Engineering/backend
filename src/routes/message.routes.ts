import {Express, NextFunction, Request, Response, Router} from 'express';
import {
    addMessageToConversation,
    getMessageFromConversation,
    getMessagesFromConversation, removeMessageFromConversation
} from "../controller/chat/conversation.message.controller";
// import messageController from '../controller/chat/message.controller';

// const router = Router();
export default (app: Express) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.get('/api/message',
        getMessageFromConversation)

    app.get('/api/messages',
        getMessagesFromConversation)

    app.post('/api/message',
        addMessageToConversation)

    app.delete('/api/messages',
        removeMessageFromConversation)
}

// router.post('/', messageController.add);
// router.get('/:conversationId', messageController.getMessages);
