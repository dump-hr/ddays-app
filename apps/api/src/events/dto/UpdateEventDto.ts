import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './CreateEventDto';

export class UpdateAsdDto extends PartialType(CreateEventDto) {}
 