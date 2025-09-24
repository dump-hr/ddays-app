import { TableDashboard } from '../../components/TableDashboard';
import { useEventGetAll } from '../../api/event/useEventGetAll';
import { EventForm } from '../../forms/EventForm';
import { useEventRemove } from '../../api/event/useEventRemove';
import toast from 'react-hot-toast';

export const EventPage = () => {
  const { data: events, refetch } = useEventGetAll();
  const removeEvent = useEventRemove();

  const handleDelete = async (ids: number[]) => {
    if (ids.length > 10) {
      toast.error('Možete obrisati maksimalno 10 zapisa odjednom.');
      return;
    }

    if (confirm('Jesi li siguran da želiš obrisati odabrane zapise?')) {
      for (const id of ids) {
        await removeEvent.mutateAsync(id);
      }
      refetch();
    }
  };

  if (!events) return <div>Loading...</div>;

  return (
    <TableDashboard
      data={events}
      dataType='EventDto'
      onRefresh={refetch}
      renderForm={(onSuccess, id) => (
        <EventForm onSuccess={onSuccess} id={id} />
      )}
      onDelete={handleDelete}
      onEdit={() => {}}
    />
  );
};
