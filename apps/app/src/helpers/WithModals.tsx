import { useCallback } from 'react';
import { useModalManager } from '../hooks/UseModalManager';
import { RouteKey } from '../router/routes';
import { ModalContext } from '../context/ModalContext';

type WithModalsProps = {
  currentRoute: RouteKey;
  onModalClose?: () => void;
};

export const withModals = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  return function WithModalsComponent(props: P & WithModalsProps) {
    const { currentRoute, onModalClose, ...rest } = props;
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
      </ModalContext.Provider>
    );
  };
};
