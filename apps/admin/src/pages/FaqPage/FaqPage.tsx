import { toast } from 'react-hot-toast';

import { useFaqGetAll } from '../../api/faq/useFaqGetAll';
import { useFaqRemove } from '../../api/faq/useFaqRemove';
import { TableDashboard } from '../../components/TableDashboard';
import { FaqForm } from '../../forms/FaqForm';

export const FaqPage = () => {
  const { data: faqs, refetch } = useFaqGetAll();
  const removeFaq = useFaqRemove();

  const handleDelete = async (ids: number[]) => {
    if (ids.length > 10) {
      toast.error('Možete obrisati maksimalno 10 zapisa odjednom.');
      return;
    }

    if (confirm('Jesi li siguran da želiš obrisati odabrane zapise?')) {
      for (const id of ids) {
        await removeFaq.mutateAsync(id);
      }
      refetch();
    }
  };

  if (!faqs) return <div>Loading...</div>;

  return (
    <TableDashboard
      data={faqs}
      dataType='FrequentlyAskedQuestionDto'
      onRefresh={refetch}
      renderForm={(onSuccess, id) => {
        const faq = faqs.find((f) => f.id === id);
        return <FaqForm onSuccess={onSuccess} faq={faq} />;
      }}
      onDelete={handleDelete}
      onEdit={() => {}}
    />
  );
};
