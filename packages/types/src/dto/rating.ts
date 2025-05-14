import {
  isNumber,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { RatingQuestionType } from 'src/enum';

export type RatingQuestionDto = {
  id: number;
  question: string;
  subtitle: string;
  type: `${RatingQuestionType}`;
};

/*
model Rating {
  id               Int            @id @default(autoincrement())
  userId           Int
  boothId          Int?
  eventId          Int?
  value            Int
  ratingQuestionId Int
  comment          String?
  ratingQuestion   RatingQuestion @relation(fields: [ratingQuestionId], references: [id], onDelete: NoAction, onUpdate: NoAction)
  booth            Booth?         @relation(fields: [boothId], references: [id], onDelete: NoAction, onUpdate: NoAction)
  event            Event?         @relation(fields: [eventId], references: [id], onDelete: NoAction, onUpdate: NoAction)
}
  */

export type RatingDto = {
  id: number;
  userId: number;
  boothId?: number;
  eventId?: number;
  value: number;
  ratingQuestionId: number;
  comment?: string;
};

export class RatingModifyDto {
  @IsOptional()
  @IsNumber()
  boothId?: number;

  @IsOptional()
  @IsNumber()
  eventId?: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  value: number;

  @IsNumber()
  ratingQuestionId: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
