import { IsString } from 'class-validator';

export const getUpdateFrequentlyAskedQuestionDto = (
  ApiPropertySwagger?: any,
) => {
  const ApiProperty = ApiPropertySwagger || function () {};

  class UpdateFrequentlyAskedQuestionDto {
    @IsString()
    @ApiProperty()
    question: string;

    @IsString()
    @ApiProperty()
    answer: string;
  }

  return UpdateFrequentlyAskedQuestionDto;
};
