import { useModal } from '../../context/ModalContext';
import { withModals } from '../../helpers/WithModals';
import { ModalNames } from '../../router/routes';

const HomePage = () => {
  const { openModal } = useModal();

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => openModal(ModalNames.NOTIFICATIONS)}>
        Open Notifications
      </button>
    </div>
  );
};

export const HomePageWithModals = withModals(HomePage);
