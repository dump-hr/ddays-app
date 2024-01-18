import { IsString } from 'class-validator';

export const getUpdateFrequentlyAskedQuestionDto = (
  ApiPropertySwagger?: any,
) => {
  const ApiProperty = ApiPropertySwagger || function () {};

  class UpdateFrequentlyAskedQuestionDto {
    @IsString()
    question: string;

    @IsString()
    answer: string;
  }

  return UpdateFrequentlyAskedQuestionDto;
};
