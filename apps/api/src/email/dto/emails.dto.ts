import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailsDto {
  @IsEmail({}, { each: true })
  emails: string[];

  @IsNotEmpty()
  @IsString()
  text: string;
}
