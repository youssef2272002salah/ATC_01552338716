import { AppError } from '../../utils/appError';
import { BookingModel } from './booking.model';
import { log } from '../../utils/logging';
import { APIFeatures } from '../../utils/apiFeatures';
import { CreateBookingDto, UpdateBookingDto } from './booking.dto';

export class BookingService {
  async createBooking(userId: string, data: CreateBookingDto) {
    const booking = await BookingModel.create({ ...data, user: userId });
    log('info', 'Booking created', { bookingId: booking._id });
    return booking;
  }

  async getBookingsByUser(userId: string) {
    const bookings = await BookingModel.find({ user: userId });
    log('info', 'User bookings retrieved from DB', { userId });
    return bookings;
  }

  async getBookingById(id: string) {
    const booking = await BookingModel.findById(id);
    if (!booking) {
      log('warn', 'Booking not found', { bookingId: id });
      throw new AppError('Booking not found', 404);
    }
    log('info', 'Booking retrieved from DB', { bookingId: id });
    return booking;
  }

  async getAllBookings(req: any) {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);

    let query = BookingModel.find();
    const features = new APIFeatures(query, req.query).filter().sort().limitFields().paginate();
    const bookings = await features.getQuery();

    log('info', `All bookings retrieved from DB (Page: ${page}, Limit: ${limit})`);
    return bookings;
  }

  async updateBooking(id: string, update: UpdateBookingDto, userId: string) {
    const booking = await BookingModel.findOneAndUpdate({ _id: id, user: userId }, update, { new: true });
    if (!booking) {
      log('warn', 'Booking not found for update', { bookingId: id });
      throw new AppError('Booking not found', 404);
    }

    log('info', 'Booking updated in DB', { bookingId: id });
    return booking;
  }

  async deleteBooking(id: string) {
    const booking = await BookingModel.findByIdAndDelete(id);
    if (!booking) {
      log('warn', 'Booking not found for deletion', { bookingId: id });
      throw new AppError('Booking not found', 404);
    }

    log('info', 'Booking deleted from DB', { bookingId: id });
    return booking;
  }
}
