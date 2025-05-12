"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRouter = void 0;
const express_1 = require("express");
const event_controller_1 = require("./event.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const validateDto_1 = require("../../utils/validateDto");
const event_dto_1 = require("./event.dto");
const eventController = new event_controller_1.EventController();
const eventRouter = (0, express_1.Router)();
exports.eventRouter = eventRouter;
// Public or Authenticated Routes (customize as needed)
eventRouter.get('/', auth_middleware_1.protect, eventController.getAllEvents);
eventRouter.get('/:id', auth_middleware_1.protect, eventController.getEventById);
// Admin Routes
eventRouter.post('/', auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)('admin'), (0, validateDto_1.validateDto)(event_dto_1.CreateEventDto), eventController.createEvent);
eventRouter.patch('/:id', auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)('admin'), (0, validateDto_1.validateDto)(event_dto_1.UpdateEventDto), eventController.updateEventById);
eventRouter.delete('/:id', auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)('admin'), eventController.deleteEventById);
//# sourceMappingURL=event.routes.js.map