import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  event: mongoose.Types.ObjectId;
  bookingDate: Date;
  status: 'booked' | 'cancelled';
}

const BookingSchema = new Schema<IBooking>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['booked', 'cancelled'],
      default: 'booked',
    },
  },
  { timestamps: true },
);

// Prevent duplicate bookings for the same user & event
BookingSchema.index({ event: 1 }, { unique: true });

export const BookingModel: Model<IBooking> = mongoose.model<IBooking>('Booking', BookingSchema);
