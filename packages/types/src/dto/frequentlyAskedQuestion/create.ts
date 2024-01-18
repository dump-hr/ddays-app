import { IsString } from 'class-validator';

export const getCreateFrequentlyAskedQuestionDto = (
  ApiPropertySwagger?: any,
) => {
  const ApiProperty = ApiPropertySwagger || function () {};

  class CreateFrequentlyAskedQuestionDto {
    @IsString()
    question: string;

    @IsString()
    answer: string;
  }

  return CreateFrequentlyAskedQuestionDto;
};
