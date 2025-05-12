"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const appError_1 = require("../../utils/appError");
const event_model_1 = require("./event.model");
const logging_1 = require("../../utils/logging");
const apiFeatures_1 = require("../../utils/apiFeatures");
class EventService {
    async createEvent(data) {
        const event = await event_model_1.EventModel.create(data);
        (0, logging_1.log)('info', 'Event created', { eventId: event._id });
        return event;
    }
    async getEventById(id) {
        const event = await event_model_1.EventModel.findById(id);
        if (!event) {
            (0, logging_1.log)('warn', 'Event not found in DB', { eventId: id });
            throw new appError_1.AppError('Event not found', 404);
        }
        (0, logging_1.log)('info', 'Event retrieved from DB', { eventId: id });
        return event;
    }
    async updateEvent(id, update) {
        const event = await event_model_1.EventModel.findByIdAndUpdate(id, update, { new: true });
        if (!event) {
            (0, logging_1.log)('warn', 'Event not found for update', { eventId: id });
            throw new appError_1.AppError('Event not found', 404);
        }
        (0, logging_1.log)('info', 'Event updated in DB', { eventId: id });
        return event;
    }
    async deleteEvent(id) {
        const event = await event_model_1.EventModel.findByIdAndDelete(id);
        if (!event) {
            (0, logging_1.log)('warn', 'Event not found for deletion', { eventId: id });
            throw new appError_1.AppError('Event not found', 404);
        }
        (0, logging_1.log)('info', 'Event deleted from DB', { eventId: id });
        return event;
    }
    async getAllEvents(req) {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);
        let query = event_model_1.EventModel.find();
        const features = new apiFeatures_1.APIFeatures(query, req.query).filter().sort().limitFields().paginate();
        const events = await features.getQuery();
        (0, logging_1.log)('info', `Events retrieved from DB (Page: ${page}, Limit: ${limit})`);
        return events;
    }
}
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map