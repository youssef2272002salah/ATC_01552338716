import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { EventService } from './event.service';
import { AppError } from '../../utils/appError';
import { log } from '../../utils/logging';
import { CreateEventDto, UpdateEventDto } from './event.dto';

const eventService = new EventService();

export class EventController {
  
  createEvent = expressAsyncHandler(async (req: Request, res: Response) => {
    const event = await eventService.createEvent(req.body as CreateEventDto);
    log('info', `Event created: ${event.name}`);
    res.status(201).json({ status: 'success', data: event });
  });

  getAllEvents = expressAsyncHandler(async (req: Request, res: Response) => {
    const events = await eventService.getAllEvents(req as Request);
    log('info', 'Fetched all events');
    res.status(200).json({ status: 'success', data: events });
  });

  getEventById = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) throw new AppError('Event ID is required', 400);

    const event = await eventService.getEventById(id);
    res.status(200).json({ status: 'success', data: event });
  });

  updateEventById = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = await eventService.updateEvent(id, req.body as UpdateEventDto);
    log('info', `Event updated: ${id}`);
    res.status(200).json({ status: 'success', data: updated });
  });

  deleteEventById = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await eventService.deleteEvent(id);
    log('info', `Event deleted: ${id}`);
    res.status(204).json({ status: 'success', data: null });
  });
}
