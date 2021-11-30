import { Action } from 'redux';

import * as types from '../actionTypes';

type userReducer = {
  profile: any;
  loggedIn: boolean;
  guestUserId: string | null;
};

const initialState: userReducer = {
  profile: {},
  loggedIn: false,
  guestUserId: null,
};

export const user = (state = initialState, { type, payload }: any): userReducer => {
  switch (type) {
    case types.LOGIN_SUCCESS:
      return { ...state, profile: payload, loggedIn: true, guestUserId: null };

    case types.LOGOUT:
      return { ...initialState };

    case types.SIGN_UP_SUCCESS:
      return { ...state, profile: payload, guestUserId: null };

    case types.GUEST_USER:
      return { ...state, guestUserId: payload };

    default:
      return state;
  }
};
