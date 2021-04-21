// This reducer updates message state when message action is dispatched from anywhere in the application
import { SET_MESSAGE, CLEAR_MESSAGE } from '../store/actions/types';

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload };

    case CLEAR_MESSAGE:
      return { message: '' };

    default: 
      return state;
  }
}