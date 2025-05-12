import { Router, RequestHandler } from 'express';
import { BookingController } from './booking.controller';
import { protect, restrictTo } from '../auth/auth.middleware';
import { validateDto } from '../../utils/validateDto';
import { CreateBookingDto, UpdateBookingDto } from './booking.dto';

const bookingController = new BookingController();
const bookingRouter = Router();

// User Bookings
bookingRouter.get('/my', protect, bookingController.getUserBookings);
bookingRouter.post(
  '/my',
  protect,
  validateDto(CreateBookingDto),
  bookingController.createBooking,
);

bookingRouter.patch(
  '/:id',
  protect,
  validateDto(UpdateBookingDto),
  bookingController.updateBookingStatus,
);

bookingRouter.get('/:id', protect, bookingController.getBookingById);

// Admin Routes
bookingRouter.get('/', protect, restrictTo('admin') as RequestHandler, bookingController.getAllBookings);


bookingRouter.delete(
  '/:id',
  protect,
  restrictTo('admin') as RequestHandler,
  bookingController.deleteBooking,
);

export { bookingRouter };
