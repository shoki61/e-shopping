import { width } from 'windowDimensions';

export type FontSizeKey = 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';

export type FontSize = {
  [key: string]: number;
};

export const fontSize: FontSize = {
  s: 0.005 * width,
  m: 0.01 * width,
  l: 0.015 * width,
  xl: 0.02 * width,
  xxl: 0.025 * width,
  xxxl: 0.03 * width,
};
