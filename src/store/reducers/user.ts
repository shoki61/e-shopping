import * as types from '../actionTypes';

type UserReducer = {
  profile: any;
  loggedIn: boolean;
};

const initialState: UserReducer = {
  profile: {},
  loggedIn: false,
};

export const user = (state = initialState, { type, payload }: any): UserReducer => {
  switch (type) {
    case types.LOGIN_SUCCESS:
      return { ...state, profile: payload, loggedIn: true };

    case types.LOGOUT:
      return { ...initialState };

    case types.SIGN_UP_SUCCESS:
      return { ...state, profile: payload };

    default:
      return state;
  }
};
