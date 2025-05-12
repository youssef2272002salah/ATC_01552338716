import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { BookingService } from './booking.service';
import { AppError } from '../../utils/appError';
import { log } from '../../utils/logging';
import { CreateBookingDto, UpdateBookingDto } from './booking.dto';
import { AuthenticatedRequest } from 'interfaces/AuthenticatedRequest.interface';

const bookingService = new BookingService();

export class BookingController {
  createBooking = expressAsyncHandler(async (req: Request, res: Response) => {
    const { user } = req as AuthenticatedRequest;
    if (!user) throw new AppError('User not authenticated', 401);

    const booking = await bookingService.createBooking(user._id, req.body as CreateBookingDto);
    log('info', `Booking created for user: ${user._id}`);
    res.status(201).json({ status: 'success', data: booking });
  });

  getUserBookings = expressAsyncHandler(async (req: Request, res: Response) => {
    const { user } = req as AuthenticatedRequest;
    if (!user) throw new AppError('User not authenticated', 401);

    const bookings = await bookingService.getBookingsByUser(user._id);
    res.status(200).json({ status: 'success', data: bookings });
  });

  getBookingById = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const booking = await bookingService.getBookingById(id);
    if (!booking) throw new AppError('Booking not found', 404);
    res.status(200).json({ status: 'success', data: booking });
  });

  // Admin route: all bookings
  getAllBookings = expressAsyncHandler(async (req: Request, res: Response) => {
    const bookings = await bookingService.getAllBookings(req as Request);
    res.status(200).json({ status: 'success', data: bookings });
  });

  updateBookingStatus = expressAsyncHandler(async (req: Request, res: Response) => {
    const { user } = req as AuthenticatedRequest;
    if (!user) throw new AppError('User not authenticated', 401);
    const { id } = req.params;
    const updated = await bookingService.updateBooking(id, req.body as UpdateBookingDto, user._id);
    res.status(200).json({ status: 'success', data: updated });
  });

  deleteBooking = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await bookingService.deleteBooking(id);
    res.status(204).json({ status: 'success', data: null });
  });
}
