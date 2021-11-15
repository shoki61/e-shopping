import { store } from 'store';
import { en } from 'config/i18n';

export const translate = (key: keyof typeof en) => store.getState().app.languages[key];
