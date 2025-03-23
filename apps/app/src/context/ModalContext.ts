import { createContext, useContext } from 'react';
import { ModalNames } from '../router/routes';

type ModalContextProps = {
  openModal: (modalName: ModalNames, submenuOption?: string) => void;
  closeModal: () => void;
  canOpenModal: (modalName: ModalNames) => boolean;
};

const defaultModalContext: ModalContextProps = {
  openModal: () => {},
  closeModal: () => {},
  canOpenModal: () => false,
};

export const ModalContext =
  createContext<ModalContextProps>(defaultModalContext);

export const useModal = () => useContext(ModalContext);
