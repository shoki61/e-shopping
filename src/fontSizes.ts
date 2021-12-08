export type FontSizeKey = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';

export type FontSize = {
  [key: string]: number;
};

export const fontSize: FontSize = {
  xs: 10,
  s: 13,
  m: 15,
  l: 20,
  xl: 25,
  xxl: 30,
  xxxl: 35,
};
