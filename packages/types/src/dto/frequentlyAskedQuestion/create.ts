import { IsString } from 'class-validator';

export const getCreateFrequentlyAskedQuestionDto = (
  ApiPropertySwagger?: any,
) => {
  const ApiProperty = ApiPropertySwagger || function () {};

  class CreateFrequentlyAskedQuestionDto {
    @IsString()
    @ApiProperty()
    question: string;

    @IsString()
    @ApiProperty()
    answer: string;
  }

  return CreateFrequentlyAskedQuestionDto;
};
