import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailsSendDto {
  @IsEmail({}, { each: true })
  emails: string[];

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  subject: string;
}
