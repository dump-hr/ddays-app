export enum FormStatus {
  Pending = 'Pending',
  Good = 'Good',
  Bad = 'Bad',
}

export type Form = {
  title: string;
  description: string;
  component: React.FC<{ validate: () => FormStatus }>;
};
