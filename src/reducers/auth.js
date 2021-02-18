import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  JWT_EXPIRED,
} from '../store/actions/types';
// new
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

const user = JSON.parse(localStorage.getItem("user"));
// Check if token expired
let token = user.token;

  let isExpired = jwt.verify(token, JWT_SECRET, function (err, decoded) {
    if (err) {
      err = {
        name: 'TokenExpiredError',
        message: 'JWT expired',
      }
    }
    return err;
  });

const initialState = user && !isExpired
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

  // eslint-disable-next-line import/no-anonymous-default-export
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
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
        }
      default:
        return state;
    }
  }