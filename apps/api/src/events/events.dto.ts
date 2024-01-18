import { getCreateEventDto, getUpdateEventDto } from '@ddays-app/types';

export const _CreateEventDto = getCreateEventDto();
export class CreateEventDto extends _CreateEventDto {}

export const _UpdateEventDto = getUpdateEventDto();
export class UpdateEventDto extends _UpdateEventDto {}
