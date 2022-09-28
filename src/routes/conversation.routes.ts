// under normal circumstances.... I feel there should be no route for conversations
// a conversation instance should be created when a match is made and should be handled by the backend
// not called from the frontend.
// with that out of the way, it's needed for testing purposes

// TODO: remove routes after matching algo's are completed ... TBD

import {Router} from 'express';
import conversationController from '../controller/chat/conversation.controller';
import {
    addUserToConversation, getConversationsOfUser,
    getUsersOfConversation,
    removeUserFromConversation
} from "../controller/chat/user.conversation.controller";
import verifyToken from "../middleware/authentication/verifyToken";

const router = Router();

router.use([verifyToken])

router.get('/:id',
    conversationController.get);

router.put('/',
    conversationController.add);

router.delete('/',
    conversationController.remove);

router.put('/user',
    addUserToConversation)

router.delete('/user',
    removeUserFromConversation)

router.get('/users/all/:conversationId',
    getUsersOfConversation)

router.get('/user/all/:userId',
    getConversationsOfUser)

export default router;
