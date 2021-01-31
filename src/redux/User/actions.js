import {USER_LOGIN, USER_LOGOUT} from './types';

export const loginUser = (user) => {
  return {
    type: USER_LOGIN,
    payload: user,
  };
};

export const updateUser = (fields) => {
  return {
    type: USER_LOGIN,
    payload: fields,
  };
};

export const logoutUser = () => {
  return {
    type: USER_LOGOUT,
  };
};
