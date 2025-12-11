import {
  CodeModifyDto,
  CodeWithConnectedAchievementsDto,
} from '@ddays-app/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useForm } from 'react-hook-form';

import { useAchievementGetAll } from '../api/achievement/useAchievementGetAll';
import { useCodeUpdateAchievement } from '../api/code/useCodeConnectToAchievement';
import { useCodeCreate } from '../api/code/useCodeCreate';
import { useCodeGetAll } from '../api/code/useCodeGetAll';
import { useCodeUpdate } from '../api/code/useCodeUpdate';
import { Button } from '../components/Button';
import { InputHandler } from '../components/InputHandler';
import { CodeHelper } from '../helpers/code';
import { Helper } from '../helpers/date';
import { Question, QuestionType } from '../types/question';

import c from './Form.module.scss';

type CodeFormProps = {
  code?: CodeWithConnectedAchievementsDto;
  onSuccess: () => void;
};

export const CodeForm: React.FC<CodeFormProps> = ({ code, onSuccess }) => {
  const createCode = useCodeCreate();
  const updateCode = useCodeUpdate();
  const { data: allAchievements } = useAchievementGetAll();
  const { mutateAsync: updateAchievements } = useCodeUpdateAchievement();
  const { data: allCodes } = useCodeGetAll();

  const questions: Question[] = [
    {
      id: 'value',
      type: QuestionType.Field,
      title: 'Kod',
      defaultValue: code?.value || CodeHelper.generateUniqueCode(allCodes),
    },
    {
      id: 'description',
      type: QuestionType.Field,
      title: 'Opis',
      defaultValue: code?.description,
    },
    {
      id: 'points',
      type: QuestionType.Number,
      title: 'Bodovi',
      defaultValue: code?.points,
    },
    {
      id: 'isActive',
      type: QuestionType.Checkbox,
      title: 'Aktivan',
      defaultValue: code?.isActive,
    },
    {
      id: 'isSingleUse',
      type: QuestionType.Checkbox,
      title: 'Jednokratan',
      defaultValue: code?.isSingleUse,
    },
    {
      id: 'hasPage',
      type: QuestionType.Checkbox,
      title: 'Ima stranicu',
      defaultValue: code?.hasPage,
    },
    {
      id: 'expirationDate',
      type: QuestionType.DateTime,
      title: 'Datum isteka',
      defaultValue:
        Helper.formatExpirationDate(code?.expirationDate) ||
        Helper.formatExpirationDate(new Date('2025-05-24T20:00:00.000')), //DATUM
    },
    {
      id: 'achievements',
      type: QuestionType.MultipleSelect,
      title: 'Povezana postignuća',
      defaultValue: code?.connectedAchievements?.map((a) => a.id) ?? [],
      options:
        allAchievements
          ?.sort((a, b) => a.id - b.id)
          .map((achievement) => ({
            label: `${achievement.name} [${achievement.id}]`,
            value: achievement.id,
          })) ?? [],
    },
  ];

  const form = useForm<CodeModifyDto & { achievements: number[] }>({
    resolver: classValidatorResolver(CodeModifyDto),
  });

  return (
    <div className={c.formContainer}>
      {questions.map((q) => (
        <InputHandler question={q} form={form} key={q.id} />
      ))}
      <Button
        onClick={form.handleSubmit(async (formData) => {
          const selectedAchievements = formData.achievements;

          if (!code) {
            const newCode = await createCode.mutateAsync(formData);

            await updateAchievements({
              codeId: newCode.id,
              achievementIds: selectedAchievements,
            });

            onSuccess();
            return;
          }

          await updateCode.mutateAsync({
            ...formData,
            id: code.id,
          });

          await updateAchievements({
            codeId: code?.id,
            achievementIds: selectedAchievements,
          });

          onSuccess();
        })}>
        Submit
      </Button>
    </div>
  );
};
