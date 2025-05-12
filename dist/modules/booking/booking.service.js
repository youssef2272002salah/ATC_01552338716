"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const appError_1 = require("../../utils/appError");
const booking_model_1 = require("./booking.model");
const logging_1 = require("../../utils/logging");
const apiFeatures_1 = require("../../utils/apiFeatures");
class BookingService {
    async createBooking(userId, data) {
        const booking = await booking_model_1.BookingModel.create({ ...data, user: userId });
        (0, logging_1.log)('info', 'Booking created', { bookingId: booking._id });
        return booking;
    }
    async getBookingsByUser(userId) {
        const bookings = await booking_model_1.BookingModel.find({ user: userId });
        (0, logging_1.log)('info', 'User bookings retrieved from DB', { userId });
        return bookings;
    }
    async getBookingById(id) {
        const booking = await booking_model_1.BookingModel.findById(id);
        if (!booking) {
            (0, logging_1.log)('warn', 'Booking not found', { bookingId: id });
            throw new appError_1.AppError('Booking not found', 404);
        }
        (0, logging_1.log)('info', 'Booking retrieved from DB', { bookingId: id });
        return booking;
    }
    async getAllBookings(req) {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);
        let query = booking_model_1.BookingModel.find();
        const features = new apiFeatures_1.APIFeatures(query, req.query).filter().sort().limitFields().paginate();
        const bookings = await features.getQuery();
        (0, logging_1.log)('info', `All bookings retrieved from DB (Page: ${page}, Limit: ${limit})`);
        return bookings;
    }
    async updateBooking(id, update, userId) {
        const booking = await booking_model_1.BookingModel.findOneAndUpdate({ _id: id, user: userId }, update, { new: true });
        if (!booking) {
            (0, logging_1.log)('warn', 'Booking not found for update', { bookingId: id });
            throw new appError_1.AppError('Booking not found', 404);
        }
        (0, logging_1.log)('info', 'Booking updated in DB', { bookingId: id });
        return booking;
    }
    async deleteBooking(id) {
        const booking = await booking_model_1.BookingModel.findByIdAndDelete(id);
        if (!booking) {
            (0, logging_1.log)('warn', 'Booking not found for deletion', { bookingId: id });
            throw new appError_1.AppError('Booking not found', 404);
        }
        (0, logging_1.log)('info', 'Booking deleted from DB', { bookingId: id });
        return booking;
    }
}
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map