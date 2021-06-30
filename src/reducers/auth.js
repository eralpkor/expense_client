import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  JWT_EXPIRED,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILED,
  USER_EXPENSE_SUCCESS,
  USER_EXPENSE_FAILED,
} from '../store/actions/types';
import { isTokenExpired } from '../services/auth-header';
// new
// const jwt = require("jsonwebtoken");
// const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
// let isExpired = false;

console.log('New is token expired ', isTokenExpired())
const user = JSON.parse(localStorage.getItem("user"));
// // Check if token expired
// if (user) {
//   jwt.verify(user.token, JWT_SECRET, (err, decoded) => {
//     if (err) {
//       isExpired = true;
//     } else {
//       isExpired = false;
//     }
//     return isExpired;
//   });
// };

console.log('isExpired: ', isTokenExpired())

const initialState = user && !isTokenExpired()
  ? { isLoggedIn: true, user, isExpired: isTokenExpired() }
  : { isLoggedIn: false, user: null, isExpired: isTokenExpired() };

  // eslint-disable-next-line import/no-anonymous-default-export
  export default function (state = initialState, action) {
    const { type, payload } = action;
  // console.log(state)
    switch (type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
        };
      case REGISTER_FAIL:
        return {
          ...state,
          isLoggedIn: false,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: payload.user,
          isExpired: payload.isExpired,
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      case JWT_EXPIRED:
        return {
          ...state,
          isLoggedIn: false,
          isExpired: payload.isExpired,
          user: null
        };
        case USER_UPDATE_SUCCESS:
          return {
            ...state,
            data: payload.data,
          };
          case USER_UPDATE_FAILED:
            return {
              ...state,
              data: null,
              isExpired: payload.isExpired,
            };
          case USER_EXPENSE_SUCCESS:
            return {
              ...state,
              data: payload.data,
            };
          case USER_EXPENSE_FAILED:
            return { 
              ...state,
              data: null,
              isExpired: payload.isExpired,
            }
      default:
        return state;
    }
  }