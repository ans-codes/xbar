import {USER_LOGIN, USER_LOGOUT, USER_UPDATE} from './types';

const initialState = {
  uid: null,
  loggedIn: false,
};

const userReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case USER_LOGIN:
      return {
        ...state,
        ...payload,
        loggedIn: true,
      };
    case USER_UPDATE:
      return {
        ...state,
        ...payload,
      };
    case USER_LOGOUT:
      return {
        uid: null,
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default userReducer;
