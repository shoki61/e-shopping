import * as types from '../actionTypes';

type userReducer = {
  profile: any;
  loggedIn: boolean;
};

const initialState: userReducer = {
  profile: {},
  loggedIn: false,
};

export const user = (state = initialState, { type, payload }: any): userReducer => {
  switch (type) {
    case types.LOGIN:
      return { ...state, profile: payload, loggedIn: true };
    default:
      return state;
  }
};
