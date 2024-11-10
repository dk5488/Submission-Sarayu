import {Router} from 'express'
import {createEvent,getEvents,deleteEvent,updateEvent} from '../controllers/calenderController.js';
import authMiddleware from '../middleware/authMiddleware.js'

const router=Router();

router.post('/events',authMiddleware,createEvent);
router.get('/events',authMiddleware,getEvents);
router.post('/events1',authMiddleware,deleteEvent);
router.put('/events',authMiddleware,updateEvent)
export default router;