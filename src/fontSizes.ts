export type FontSizeKey = 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';

export type FontSize = {
  [key: string]: number;
};

export const fontSize: FontSize = {
  s: 10,
  m: 15,
  l: 20,
  xl: 25,
  xxl: 30,
  xxxl: 35,
};
