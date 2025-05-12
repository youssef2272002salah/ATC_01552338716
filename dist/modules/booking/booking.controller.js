"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const booking_service_1 = require("./booking.service");
const appError_1 = require("../../utils/appError");
const logging_1 = require("../../utils/logging");
const bookingService = new booking_service_1.BookingService();
class BookingController {
    createBooking = (0, express_async_handler_1.default)(async (req, res) => {
        const { user } = req;
        if (!user)
            throw new appError_1.AppError('User not authenticated', 401);
        const booking = await bookingService.createBooking(user._id, req.body);
        (0, logging_1.log)('info', `Booking created for user: ${user._id}`);
        res.status(201).json({ status: 'success', data: booking });
    });
    getUserBookings = (0, express_async_handler_1.default)(async (req, res) => {
        const { user } = req;
        if (!user)
            throw new appError_1.AppError('User not authenticated', 401);
        const bookings = await bookingService.getBookingsByUser(user._id);
        res.status(200).json({ status: 'success', data: bookings });
    });
    getBookingById = (0, express_async_handler_1.default)(async (req, res) => {
        const { id } = req.params;
        const booking = await bookingService.getBookingById(id);
        if (!booking)
            throw new appError_1.AppError('Booking not found', 404);
        res.status(200).json({ status: 'success', data: booking });
    });
    // Admin route: all bookings
    getAllBookings = (0, express_async_handler_1.default)(async (req, res) => {
        const bookings = await bookingService.getAllBookings(req);
        res.status(200).json({ status: 'success', data: bookings });
    });
    updateBookingStatus = (0, express_async_handler_1.default)(async (req, res) => {
        const { user } = req;
        if (!user)
            throw new appError_1.AppError('User not authenticated', 401);
        const { id } = req.params;
        const updated = await bookingService.updateBooking(id, req.body, user._id);
        res.status(200).json({ status: 'success', data: updated });
    });
    deleteBooking = (0, express_async_handler_1.default)(async (req, res) => {
        const { id } = req.params;
        await bookingService.deleteBooking(id);
        res.status(204).json({ status: 'success', data: null });
    });
}
exports.BookingController = BookingController;
//# sourceMappingURL=booking.controller.js.map