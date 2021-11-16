import * as types from '../actionTypes';

export const login = (profile: any) => ({
  type: types.LOGIN,
  payload: profile,
});

export const logout = () => ({
  type: types.LOGOUT,
});
