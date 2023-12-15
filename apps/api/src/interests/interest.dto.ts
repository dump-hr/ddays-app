import { getCreateInterestDto } from '@ddays-app/types';
import { ApiProperty } from '@nestjs/swagger';

export const _CreateInterestDto = getCreateInterestDto(ApiProperty);
export const CreateInterestDto = _CreateInterestDto;

export const _UpdateInterestDto = getCreateInterestDto(ApiProperty);
export const UpdateInterestDto = _UpdateInterestDto;
