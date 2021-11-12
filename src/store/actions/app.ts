import * as types from '../actionTypes';

export const changeLanguage = (language: string) => {
  return {
    type: types.CHANGE_LANGUAGE,
    payload: language,
  };
};
