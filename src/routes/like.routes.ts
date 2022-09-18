import {Router} from 'express';
import likeController from '../controller/like.controller';

const router = Router();

router.post('/api/event/like', likeController.likeEvent);
router.get('/api/event/dislike/:id', likeController.dislikeEvent);
router.get('/api/event/likes/:id', likeController.getEventLikes);
// router.delete('/:id',);

export default router;
