"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoutes = void 0;
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_routes_1 = require("../modules/users/user.routes");
const booking_routes_1 = require("../modules/booking/booking.routes");
const event_routes_1 = require("../modules/event/event.routes");
const setupRoutes = (app) => {
    app.get('/health', (_req, res) => res.json({ status: 'healthy' }));
    app.use('/api/v1/auth', auth_routes_1.authRouter);
    app.use('/api/v1/users', user_routes_1.userRouter);
    app.use('/api/v1/bookings', booking_routes_1.bookingRouter);
    app.use('/api/v1/events', event_routes_1.eventRouter);
};
exports.setupRoutes = setupRoutes;
//# sourceMappingURL=routes.js.map