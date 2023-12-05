import { getCreateEventDto, getUpdateEventDto } from '@ddays-app/types';
import { ApiProperty } from '@nestjs/swagger';

export const _CreateEventDto = getCreateEventDto(ApiProperty);
export class CreateEventDto extends _CreateEventDto {}

export const _UpdateEventDto = getUpdateEventDto(ApiProperty);
export class UpdateEventDto extends _UpdateEventDto {}
