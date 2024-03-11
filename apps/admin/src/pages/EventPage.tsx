import { useEffect, useState } from 'react';

import { useEventCreate } from '../api/event/useEventCreate';

const EventPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToEditId, setEventToEditId] = useState<number>();

  useEffect(() => {}, []);
  return <></>;
};

export default EventPage;
