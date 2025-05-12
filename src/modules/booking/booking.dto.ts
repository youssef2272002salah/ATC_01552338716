import { IsMongoId, IsOptional, IsIn } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBookingDto {
  @IsMongoId()
  event: Types.ObjectId | undefined;
}

export class UpdateBookingDto {
  @IsOptional()
  @IsIn(['booked', 'cancelled'])
  status?: 'booked' | 'cancelled';
}
