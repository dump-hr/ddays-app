import { ShopItemType } from '@ddays-app/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useForm } from 'react-hook-form';

import { Button } from '../components/Button';
import { InputHandler } from '../components/InputHandler';
import { Question, QuestionType } from '../types/question';
import { useGetSingleShopItem } from '../api/shop/useGetSingleShopItem';
import { ShopItemDto } from '@ddays-app/types/src/dto/shop';

type EventFormProps = {
  id?: number;
  onSuccess: () => void;
};

export const ShoppingForm: React.FC<EventFormProps> = ({ id, onSuccess }) => {
  const { data: shopItem, isLoading } = useGetSingleShopItem(id);

  const questions: Question[] = [
    {
      id: 'name',
      type: QuestionType.Field,
      title: 'Naziv',
      defaultValue: shopItem?.itemName ?? undefined,
    },
    {
      id: 'quantity',
      type: QuestionType.Number,
      title: 'Količina',
      defaultValue: shopItem?.quantity ?? undefined,
    },
    {
      id: 'type',
      type: QuestionType.Select,
      title: 'Tip',
      options: Object.values(ShopItemType),
      defaultValue: shopItem?.type ?? undefined,
    },
    {
      id: 'price',
      type: QuestionType.Field,
      title: 'Cijena',
      defaultValue: shopItem?.price ?? undefined,
    },

  ];

  const form = useForm<ShopItemDto>({});

  if (id && isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {questions.map((q) => {
        return <InputHandler question={q} form={form} key={q.id} />;
      })}

      <Button
        onClick={form.handleSubmit(async (formData) => {
          onSuccess();
        })}>
        Submit
      </Button>
    </>
  );
};
