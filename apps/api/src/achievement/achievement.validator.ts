import { AchievementNames } from '@ddays-app/types';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
class AchievementNameValidationPipe implements PipeTransform {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any) {
    const achievementNames = Object.values(AchievementNames);

    if (!achievementNames.includes(value)) {
      throw new BadRequestException(`Invalid name`);
    }

    return value;
  }
}

export { AchievementNameValidationPipe };
