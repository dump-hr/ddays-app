import { ReactElement, useCallback } from 'react';
import { useModalManager } from '../hooks/UseModalManager';
import { ModalNames, RouteKey } from '../router/routes';
import { ModalContext } from '../context/ModalContext';
import { BaseModal } from '../components/Modal/BaseModal';
import { useLocation } from 'react-router-dom';

// TODO - delete test code and replace with actual modals
const EmptyModal = (): ReactElement => {
  return <div>Empty Modal</div>;
};

const MODAL_REGISTRY: Record<ModalNames, ReactElement> = {
  [ModalNames.NOTIFICATIONS]: <EmptyModal />,
  [ModalNames.ENTER_CODE]: <EmptyModal />,
  [ModalNames.RATE]: <EmptyModal />,
  [ModalNames.INTERESTS]: <EmptyModal />,
  [ModalNames.ACHIEVEMENTS]: <EmptyModal />,
  [ModalNames.AVATARS]: <EmptyModal />,
  [ModalNames.LEADERBOARD]: <EmptyModal />,
  [ModalNames.RECCOMENDATIONS]: <EmptyModal />,
  [ModalNames.PRIZES]: <EmptyModal />,
  [ModalNames.SETTINGS]: <EmptyModal />,
  [ModalNames.TRANSACTIONS]: <EmptyModal />,
  [ModalNames.CART]: <EmptyModal />,
};

type WithModalsProps = {
  withOverlay?: boolean;
  onModalClose?: () => void;
};

export const withModals = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  return function WithModalsComponent(props: P & WithModalsProps) {
    const { onModalClose, withOverlay, ...rest } = props;
    const location = useLocation();
    const currentRoute = location.pathname as RouteKey;
    const { modalState, openModal, closeModal, canOpenModal } = useModalManager(
      { currentRoute },
    );

    const handleClose = useCallback(() => {
      closeModal();
      onModalClose?.();
    }, [closeModal, onModalClose]);

    return (
      <ModalContext.Provider value={{ openModal, closeModal, canOpenModal }}>
        <WrappedComponent {...(rest as P)} />

        {modalState.modalName && (
          <BaseModal
            isOpen={modalState.isOpen}
            onClose={handleClose}
            withOverlay={withOverlay}
            title={modalState.modalName}>
            {MODAL_REGISTRY[modalState.modalName]}
          </BaseModal>
        )}
      </ModalContext.Provider>
    );
  };
};
