import {Express, NextFunction, Request, Response, Router} from 'express';
import {
    addMessageToConversation, getLastMessageFromConversation,
    getMessageFromConversation,
    getMessagesFromConversation, removeMessageFromConversation
} from "../controller/chat/conversation.message.controller";
// import messageController from '../controller/chat/message.controller';
import {notifyMessage} from "../services/conversation.message.service";

// const router = Router();
export default (app: Express) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.get('/api/message/:messageId',
        getMessageFromConversation)

    app.get('/api/message/last/:conversationId',
        getLastMessageFromConversation)

    app.get('/api/messages/:conversationId',
        getMessagesFromConversation)

    app.put('/api/message',
        addMessageToConversation)

    app.delete('/api/message',
        removeMessageFromConversation)

}

// router.post('/', messageController.add);
// router.get('/:conversationId', messageController.getMessages);
