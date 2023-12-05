import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFrequentlyAskedQuestionDto {
  @IsString()
  @ApiProperty()
  question: string;

  @IsString()
  @ApiProperty()
  answer: string;
}
