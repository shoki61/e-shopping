import { store } from 'store';

export const translate = (key: string) => store.getState().app.languages[key];
