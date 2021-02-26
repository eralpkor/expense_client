import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  JWT_EXPIRED,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILED,
} from './types';

import AuthService from '../../services/auth.service';

export const register = (username, email, password) => (dispatch) => {
  return AuthService.register(username, email, password).then(
    (data) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {user: data }
      });
console.log('THIS IS FROM REGISTER ', data)

      dispatch({
        type: SET_MESSAGE,
        payload: data.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      // let message = '';
      let username = error.response.data.errors[0].username;
      let email = error.response.data.errors[0].email;
      var message = [];

      if (error.response.data.errors.length === 0) {
        console.log('No fucking errors ')
      }
      if (error.response.data.errors.length === 1) {
        if (error.response.data.errors[0].username) {
          message.push(username);
        } else {
          message.push(email);
        }
      }
      if (error.response.data.errors.length === 2) {
        message.push(error.response.data.errors[0].username);
        message.push(' / ');
        message.push(error.response.data.errors[1].email);
      }
console.log(message)
      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password)
    .then((data) => {
      console.log(data)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {user: data }
      });

      return Promise.resolve();
    },
      (error) => {
        const message = 
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: LOGIN_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    )
}

export const updateUserInfo = (data) => (dispatch) => {
  return AuthService.updateUserInfo(data)
    .then(data => {
  console.log('data from actions/auth edituser ', data)

      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: {data: data}
      })
      return Promise.resolve();
    },
    (errors) => {
      const message = 
        (errors.response &&
          errors.response.data &&
          errors.response.data.message) ||
          errors.message ||
          errors.toString();

      dispatch({
        type: USER_UPDATE_FAILED,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
    )
}

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};