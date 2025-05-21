import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { AchievementNames } from '@ddays-app/types';

@Injectable()
class AchievementNameValidationPipe implements PipeTransform {
  transform(value: any) {
    const achievementNames = Object.values(AchievementNames);

    if (!achievementNames.includes(value)) {
      throw new BadRequestException(`Invalid name`);
    }

    return value;
  }
}

export { AchievementNameValidationPipe };
