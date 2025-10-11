import { CodeDto, CodeWithConnectedAchievementsDto } from '@ddays-app/types';

export class CodeHelper {
  static generateRandomCode(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static generateUniqueCode(
    existingCodes: CodeDto[] | CodeWithConnectedAchievementsDto[] | undefined,
  ): string {
    if (existingCodes === undefined || existingCodes.length === 0) {
      return this.generateRandomCode(6);
    }
    while (true) {
      const uniqueCode = this.generateRandomCode(6);
      if (
        existingCodes.find((code) => code.value === uniqueCode) === undefined
      ) {
        return uniqueCode;
      }
    }
  }
}
