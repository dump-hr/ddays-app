import { useCallback, useState } from 'react';
import { findModalInRoute, RouteKey } from '../router/routes';

type ModalState = {
  isOpen: boolean;
  modalName: string | null;
  submenuOption?: string;
};

const defaultModalState: ModalState = {
  isOpen: false,
  modalName: null,
  submenuOption: undefined,
};

type UseModalManagerReturn = {
  modalState: ModalState;
  openModal: (modalName: string, submenuOption?: string) => void;
  closeModal: () => void;
  canOpenModal: (modalName: string) => boolean;
};

type UseModalManagerProps = {
  currentRoute: RouteKey;
};

export const useModalManager = ({
  currentRoute,
}: UseModalManagerProps): UseModalManagerReturn => {
  const [modalState, setModalState] = useState<ModalState>(defaultModalState);

  const canOpenModal = useCallback(
    (modalName: string) => {
      const modalConfig = findModalInRoute(currentRoute, modalName);
      return !!modalConfig;
    },
    [currentRoute],
  );

  const openModal = useCallback(
    (modalName: string, submenuOption?: string) => {
      if (!canOpenModal(modalName)) {
        console.warn(
          `Modal ${modalName} is not allowed on route ${currentRoute}`,
        );
        return;
      }
      setModalState({ isOpen: true, modalName, submenuOption });
    },
    [canOpenModal, currentRoute],
  );

  const closeModal = useCallback(() => {
    setModalState(defaultModalState);
  }, []);

  return {
    modalState,
    openModal,
    closeModal,
    canOpenModal,
  };
};
