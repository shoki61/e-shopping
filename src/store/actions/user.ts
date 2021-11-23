import { Dispatch } from 'redux';

import * as types from '../actionTypes';
import { Request } from '../../Request';

export const login =
  (email: string, password: string, callback = (res: any) => {}) =>
  async (dispatch: Dispatch) => {
    const res = await Request.post('/user/login', { email, password });
    callback(res);
  };

export const logout = () => ({
  type: types.LOGOUT,
});
