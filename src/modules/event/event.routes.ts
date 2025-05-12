import { Router, RequestHandler } from 'express';
import { EventController } from './event.controller';
import { protect, restrictTo } from '../auth/auth.middleware';
import { validateDto } from '../../utils/validateDto';
import { CreateEventDto, UpdateEventDto } from './event.dto';

const eventController = new EventController();
const eventRouter = Router();

// Public or Authenticated Routes (customize as needed)
eventRouter.get('/', protect, eventController.getAllEvents);
eventRouter.get('/:id', protect, eventController.getEventById);

// Admin Routes
eventRouter.post(
  '/',
  protect,
  restrictTo('admin') as RequestHandler,
  validateDto(CreateEventDto),
  eventController.createEvent,
);

eventRouter.patch(
  '/:id',
  protect,
  restrictTo('admin') as RequestHandler,
  validateDto(UpdateEventDto),
  eventController.updateEventById,
);

eventRouter.delete(
  '/:id',
  protect,
  restrictTo('admin') as RequestHandler,
  eventController.deleteEventById,
);

export { eventRouter };
