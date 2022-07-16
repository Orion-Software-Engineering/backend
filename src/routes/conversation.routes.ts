// under normal circumstances.... I feel there should be no route for conversations
// a conversation instance should be created when a match is made and should be handled by the backend
// not called from the frontend.
// with that out of the way, it's needed for testing purposes

// TODO: remove routes after matching algo's are completed

import {Router} from 'express';
import conversationController from '../controller/conversation.controller';

const router = Router();

router.get('/:id', conversationController.get);
router.post('/:id', conversationController.add);

export default router;
