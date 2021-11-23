import { Dispatch } from 'redux';

import * as types from '../actionTypes';
import { Request } from '../../Request';

export const login =
  (email: string, password: string, callback = (res: any) => {}) =>
  async (dispatch: Dispatch) => {
    const res = await Request.post('/user/login', { email, password });
    callback(res);
    if (res.data) {
      dispatch(loginSuccess(res.data));
    }
  };

export const logout = () => ({
  type: types.LOGOUT,
});

export const loginSuccess = (data: any) => ({
  type: types.LOGIN_SUCCESS,
  payload: data,
});

export const signUp =
  (obj: { name: string; email: string; password: string }, callback = (res: any) => {}) =>
  async () => {
    const res = await Request.post('/user/sign_up', obj);
    callback(res);
  };

export const verifyEmail =
  (email: string, verificationCode: string, callback = (res: any) => {}) =>
  async (dispatch: Dispatch) => {
    const res = await Request.post(`/verify_email/${email}/${verificationCode}`);
    callback(res);
    if (res.data) {
      dispatch(signUpSuccess(res.data));
    }
  };

export const signUpSuccess = (data: any) => ({
  type: types.SIGN_UP_SUCCESS,
  payload: data,
});
