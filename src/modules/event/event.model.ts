import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEvent extends Document {
  name: string;
  description: string;
  category: string;
  date: Date;
  venue: string;
  price: number;
  imageUrl?: string;
  createdBy?: mongoose.Types.ObjectId;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    
    name: {
      type: String,
      required: [true, 'Event name is required'],
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    imageUrl: {
      type: String,
      default: 'https://via.placeholder.com/500x300?text=Event+Image',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    tags: [String],
  },
  { timestamps: true },
);

export const EventModel: Model<IEvent> = mongoose.model<IEvent>('Event', EventSchema);
