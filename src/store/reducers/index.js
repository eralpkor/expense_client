import {
  FETCHING_DATA_START,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE,
  DELETE_DATA_SUCCESS,
} from '../actions';

const initialState = {
  data: [],
  isFetching: false,
  error: '',
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_DATA_START:
      return {
        ...state,
        isFetching: true,
        error: '',
      };
    case FETCHING_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      };
    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
      // DELETE some shit
    case DELETE_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      }
    default:
      return state;
  }
}









// export default function reducer(state, action) {
//   switch(action.type) {
//     case 'ADD':
//       return [...state, { task: action.task,
//       completed: false }];
//     case 'DELETE':
//       return state.filter(expense => expense.id !== action.id);
//     default:
//       return state;
//   }
// }