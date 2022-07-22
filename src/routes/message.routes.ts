import {Router} from 'express';
import messageController from '../controller/message.controller';

const router = Router();

router.post('/', messageController.add);
router.get('/:conversationId', messageController.getMessages);

export default router;
