export type PaletteKey = 'm' | 'd' | 'l' | 'e' | 's' | 'i' | 'y' | 'b' | 'dg' | 'dg1' | 'lg';

export type Palette = {
  [key: string]: string;
};

export const palette: Palette = {
  m: '#d46124', // main color;
  d: '#212121', // dark;
  l: '#ffffff', // ligth;
  e: '#f73434', // error;
  s: '#08a360', // success;
  i: '#358696', // info;
  y: '#ffa200', // yellow;
  b: '#006aff', // blue;
  dg: '#696969', // dim gray;
  dg1: '#808080',
  lg: '#d9d9d9', // ligth gray
};
