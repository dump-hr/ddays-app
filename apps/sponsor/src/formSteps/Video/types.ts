export enum State {
  input = 'input',
  fileDisplay = 'fileDisplay',
}

export type Props = {
  close: () => void;
  initialSrc?: string;
};
