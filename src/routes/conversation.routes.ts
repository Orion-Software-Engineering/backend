// under normal circumstances.... I feel there should be no route for conversations
// a conversation instance should be created when a match is made and should be handled by the backend
// not called from the frontend.
// with that out of the way, it's needed for testing purposes

// TODO: remove routes after matching algo's are completed ... TBD

import {Router} from 'express';
import conversationController from '../controller/chat/conversation.controller';
import {
    addUserToConversation,
    getUsersOfConversation,
    removeUserFromConversation
} from "../controller/chat/user.conversation.controller";

const router = Router();

router.get('/:id', conversationController.get);
router.put('/', conversationController.add);
router.delete('/', conversationController.remove);

router.put('/user', addUserToConversation)
router.delete('/user', removeUserFromConversation)
router.get('/users', getUsersOfConversation)

export default router;
