import { Colors, Face, Accessory, Body } from '@ddays-app/types';

export type DuckObject = {
  imageSrc: string;
  name: string;
  description: string;
};

export enum DuckItems {
  COLORS = 'colors',
  FACE = 'face',
  ACCESSORIES = 'accessories',
  BODY = 'body',
}

export type Option = {
  name: string;
  imageSrc: string;
  value: Colors | Face | Accessory | Body;
  imagePreviewSrc: string | undefined;
};
