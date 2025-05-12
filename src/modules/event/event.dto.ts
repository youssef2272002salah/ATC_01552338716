import {
  IsString,
  IsDateString,
  IsNumber,
  IsOptional,
  IsArray,
  IsMongoId,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateEventDto {
  @IsString()
  name: string | undefined;

  @IsString()
  description: string | undefined;

  @IsString()
  category: string | undefined;

  @IsDateString()
  date: Date | undefined;

  @IsString()
  venue: string | undefined;

  @IsNumber()
  price: number | undefined;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsMongoId()
  createdBy?: Types.ObjectId;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsDateString()
  date?: Date;

  @IsOptional()
  @IsString()
  venue?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsMongoId()
  createdBy?: Types.ObjectId;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
