import { ShopItemModifyDto, ShopItemType } from '@ddays-app/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useForm } from 'react-hook-form';

import { useCreateShopItem } from '../api/shop/useCreateShopItem';
import { useGetSingleShopItem } from '../api/shop/useGetSingleShopItem';
import { useUpdateShopItem } from '../api/shop/useUpdateShopItem';
import { Button } from '../components/Button';
import { InputHandler } from '../components/InputHandler';
import { Question, QuestionType } from '../types/question';

type ShoppingFormProps = {
  id?: number;
  onSuccess: () => void;
};

export const ShoppingForm: React.FC<ShoppingFormProps> = ({
  id,
  onSuccess,
}) => {
  const { data: shopItem, isLoading } = useGetSingleShopItem(id);

  const updateShopItem = useUpdateShopItem();
  const createShopItem = useCreateShopItem();

  const questions: Question[] = [
    {
      id: 'itemName',
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
      type: QuestionType.Number,
      title: 'Cijena',
      defaultValue: shopItem?.price ?? undefined,
    },
  ];

  const form = useForm<ShopItemModifyDto>({
    resolver: classValidatorResolver(ShopItemModifyDto),
  });

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
          if (id) {
            await updateShopItem.mutateAsync({ dto: { ...formData }, id });
          } else {
            await createShopItem.mutateAsync(formData);
          }
          onSuccess();
        })}>
        Submit
      </Button>
    </>
  );
};
