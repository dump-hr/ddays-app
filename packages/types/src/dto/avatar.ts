import { IsEnum, IsOptional } from 'class-validator';
import { Accessory, Body, Colors, Face } from '../enum';

export class AvatarDto {
  id: number;
  userId: number;
  color: Colors;
  face: Face;
  accessory: Accessory;
  body: Body;
}

export class AvatarUpdateDto {
  @IsOptional()
  @IsEnum(Colors)
  color: Colors;

  @IsOptional()
  @IsEnum(Face)
  face: Face;

  @IsOptional()
  @IsEnum(Accessory)
  accessory: Accessory;

  @IsOptional()
  @IsEnum(Body)
  body: Body;
}

export class AvatarUploadDto {
  @IsOptional()
  @IsEnum(Colors)
  colors: Colors;

  @IsOptional()
  @IsEnum(Face)
  face: Face;

  @IsOptional()
  @IsEnum(Accessory)
  accessories: Accessory;

  @IsOptional()
  @IsEnum(Body)
  body: Body;
}

export class UserWithAvatarDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  yearOfBirth: number;
  occupation?: string;
  profilePhotoUrl?: string;
  points?: number;
  avatar?: {
    color: Colors;
    face: Face;
    accessory: Accessory;
    body: Body;
  };
}
