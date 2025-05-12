import { AppError } from '../../utils/appError';
import { EventModel } from './event.model';
import { log } from '../../utils/logging';
import { APIFeatures } from '../../utils/apiFeatures';
import { CreateEventDto, UpdateEventDto } from './event.dto';

export class EventService {
  async createEvent(data: CreateEventDto) {
    const event = await EventModel.create(data);
    log('info', 'Event created', { eventId: event._id });
    return event;
  }

  async getEventById(id: string) {
    const event = await EventModel.findById(id);
    if (!event) {
      log('warn', 'Event not found in DB', { eventId: id });
      throw new AppError('Event not found', 404);
    }

    log('info', 'Event retrieved from DB', { eventId: id });
    return event;
  }

  async updateEvent(id: string, update: UpdateEventDto) {
    const event = await EventModel.findByIdAndUpdate(id, update, { new: true });
    if (!event) {
      log('warn', 'Event not found for update', { eventId: id });
      throw new AppError('Event not found', 404);
    }

    log('info', 'Event updated in DB', { eventId: id });
    return event;
  }

  async deleteEvent(id: string) {
    const event = await EventModel.findByIdAndDelete(id);
    if (!event) {
      log('warn', 'Event not found for deletion', { eventId: id });
      throw new AppError('Event not found', 404);
    }

    log('info', 'Event deleted from DB', { eventId: id });
    return event;
  }

  async getAllEvents(req: any) {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);

    let query = EventModel.find();
    const features = new APIFeatures(query, req.query).filter().sort().limitFields().paginate();
    const events = await features.getQuery();

    log('info', `Events retrieved from DB (Page: ${page}, Limit: ${limit})`);
    return events;
  }
}
