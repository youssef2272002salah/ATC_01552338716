"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const event_service_1 = require("./event.service");
const appError_1 = require("../../utils/appError");
const logging_1 = require("../../utils/logging");
const eventService = new event_service_1.EventService();
class EventController {
    createEvent = (0, express_async_handler_1.default)(async (req, res) => {
        const event = await eventService.createEvent(req.body);
        (0, logging_1.log)('info', `Event created: ${event.name}`);
        res.status(201).json({ status: 'success', data: event });
    });
    getAllEvents = (0, express_async_handler_1.default)(async (req, res) => {
        const events = await eventService.getAllEvents(req);
        (0, logging_1.log)('info', 'Fetched all events');
        res.status(200).json({ status: 'success', data: events });
    });
    getEventById = (0, express_async_handler_1.default)(async (req, res) => {
        const { id } = req.params;
        if (!id)
            throw new appError_1.AppError('Event ID is required', 400);
        const event = await eventService.getEventById(id);
        res.status(200).json({ status: 'success', data: event });
    });
    updateEventById = (0, express_async_handler_1.default)(async (req, res) => {
        const { id } = req.params;
        const updated = await eventService.updateEvent(id, req.body);
        (0, logging_1.log)('info', `Event updated: ${id}`);
        res.status(200).json({ status: 'success', data: updated });
    });
    deleteEventById = (0, express_async_handler_1.default)(async (req, res) => {
        const { id } = req.params;
        await eventService.deleteEvent(id);
        (0, logging_1.log)('info', `Event deleted: ${id}`);
        res.status(204).json({ status: 'success', data: null });
    });
}
exports.EventController = EventController;
//# sourceMappingURL=event.controller.js.map