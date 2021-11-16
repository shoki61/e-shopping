import * as types from '../actionTypes';

export const login = (profile: any) => ({
  type: types.LOGIN,
  payload: profile,
});
