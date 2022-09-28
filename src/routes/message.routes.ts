import {Express, NextFunction, Request, Response, Router} from 'express';
import {
    addMessageToConversation, getLastMessageFromConversation,
    getMessageFromConversation,
    getMessagesFromConversation, removeMessageFromConversation
} from "../controller/chat/conversation.message.controller";
import verifyToken from "../middleware/authentication/verifyToken";

export default (app: Express) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.get('/api/message/:messageId',
        [verifyToken],
        getMessageFromConversation)

    app.get('/api/message/last/:conversationId',
        [verifyToken],
        getLastMessageFromConversation)

    app.get('/api/messages/:conversationId',
        [verifyToken],
        getMessagesFromConversation)

    app.put('/api/message',
        [verifyToken],
        addMessageToConversation)

    app.delete('/api/message',
        [verifyToken],
        removeMessageFromConversation)

}

// router.post('/', messageController.add);
// router.get('/:conversationId', messageController.getMessages);
