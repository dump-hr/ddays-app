import { useCallback, useState } from 'react';
import { findModalInRoute, ModalNames, RouteKey } from '../router/routes';

type ModalState = {
  isOpen: boolean;
  modalName: ModalNames | null;
  submenuOption?: string;
};

const defaultModalState: ModalState = {
  isOpen: false,
  modalName: null,
  submenuOption: undefined,
};

type UseModalManagerReturn = {
  modalState: ModalState;
  openModal: (modalName: ModalNames, submenuOption?: string) => void;
  closeModal: () => void;
  canOpenModal: (modalName: ModalNames) => boolean;
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
    (modalName: ModalNames, submenuOption?: string) => {
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
