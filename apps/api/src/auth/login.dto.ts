import { getSponsorLoginDto } from '@ddays-app/types';
import { ApiProperty } from '@nestjs/swagger';

export const _SponsorLoginDto = getSponsorLoginDto(ApiProperty);

export class SponsorLoginDto extends _SponsorLoginDto {}
