import * as types from '../actionTypes';
import { languages } from 'config/i18n';

type AppReducer = {
  languages: any;
};

const initialState: AppReducer = {
  languages: languages.en,
};

export const app = (state = initialState, { type, payload }: { type: string; payload?: any }): AppReducer => {
  switch (type) {
    case types.CHANGE_LANGUAGE:
      return { ...state, languages: languages[payload] };
    default:
      return state;
  }
};
