import { authRouter } from '../modules/auth/auth.routes';
import { userRouter } from '../modules/users/user.routes';
import { bookingRouter } from '../modules/booking/booking.routes';
import { eventRouter } from '../modules/event/event.routes';


export const setupRoutes = (app: any) => {
  app.get('/health', (_req: any, res: { json: (arg0: { status: string }) => any }) =>
    res.json({ status: 'healthy' }),
  );
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/bookings', bookingRouter);
  app.use('/api/v1/events', eventRouter);

};
