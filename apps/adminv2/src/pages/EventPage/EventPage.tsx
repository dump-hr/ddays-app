import { TableDashboard } from '../../components/TableDashboard';
import { useEventGetAll } from '../../api/event/useEventGetAll';
import { EventForm } from '../../forms/EventForm';

export const EventPage = () => {
  const { data: events, refetch } = useEventGetAll();

  if (!events) return <div>Loading...</div>;

  return (
    <TableDashboard
      data={events}
      dataType='EventDto'
      onRefresh={refetch}
      renderForm={(onSuccess) => <EventForm onSuccess={onSuccess} />}
    />
  );
};
