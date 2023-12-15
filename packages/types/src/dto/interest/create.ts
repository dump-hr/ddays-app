import { EventTheme } from "@src/model";
import { IsEnum, IsString } from "class-validator";

export const getCreateInterestDto = (ApiPropertySwagger?: any) => {
    const ApiProperty = ApiPropertySwagger || function () {};
    
    class CreateInterestDto {
        @IsString()
        @ApiProperty()
        name: string;

        @IsEnum(EventTheme)
        @ApiProperty({ enum: EventTheme })
        theme: EventTheme;
    }
    
    return CreateInterestDto;
}