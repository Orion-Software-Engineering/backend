import {Router} from 'express';
import interestController from '../controller/interest.controller';

const router = Router();

router.get('/:id', interestController.get);
router.post('/:id', interestController.set);
router.put('/:id', interestController.add);
router.delete('/:id', interestController.remove);

export default router;
