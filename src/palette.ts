export type PaletteKey = 'm' | 'd' | 'l' | 'e' | 's' | 'i';

export type Palette = {
  [key: string]: string;
};

export const palette: Palette = {
  m: '#d46124', // main color;
  d: '#212121', // dark;
  l: '#f0f0f0', // ligth;
  e: '#f73434', // error;
  s: '#08a360', // success;
  i: '#358696', // info;
  dg: '#696969', // dim gray;
};
