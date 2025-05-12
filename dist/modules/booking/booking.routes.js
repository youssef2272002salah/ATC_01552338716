"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const validateDto_1 = require("../../utils/validateDto");
const booking_dto_1 = require("./booking.dto");
const bookingController = new booking_controller_1.BookingController();
const bookingRouter = (0, express_1.Router)();
exports.bookingRouter = bookingRouter;
// User Bookings
bookingRouter.get('/my', auth_middleware_1.protect, bookingController.getUserBookings);
bookingRouter.post('/my', auth_middleware_1.protect, (0, validateDto_1.validateDto)(booking_dto_1.CreateBookingDto), bookingController.createBooking);
bookingRouter.patch('/:id', auth_middleware_1.protect, (0, validateDto_1.validateDto)(booking_dto_1.UpdateBookingDto), bookingController.updateBookingStatus);
bookingRouter.get('/:id', auth_middleware_1.protect, bookingController.getBookingById);
// Admin Routes
bookingRouter.get('/', auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)('admin'), bookingController.getAllBookings);
bookingRouter.delete('/:id', auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)('admin'), bookingController.deleteBooking);
//# sourceMappingURL=booking.routes.js.map