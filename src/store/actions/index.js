import { axiosWithAuth } from '../../utils/axiosWithAuth';

export const FETCHING_DATA_START = 'FETCHING_DATA_START';
export const FETCHING_DATA_SUCCESS = 'FETCHING_DATA_SUCCESS';
export const FETCHING_DATA_FAILURE = 'FETCHING_DATA_FAILURE';

export const DELETE_DATA_SUCCESS = 'DELETE_DATA_SUCCESS';

export const fetchData = () => dispatch => {
  dispatch({ type: FETCHING_DATA_START });

  return axiosWithAuth().get('/')
  .then(res => {
    dispatch({ type: FETCHING_DATA_SUCCESS, payload: res.data })
  })
  .catch(err => {
    dispatch({ type: FETCHING_DATA_FAILURE, payload: err.response })
  })
}

export const deleteData = (id) => dispatch => {
  dispatch({ type: DELETE_DATA_SUCCESS});

  return axiosWithAuth().delete(`/expense/${id}`)
  .then(res => {
    dispatch({ type: DELETE_DATA_SUCCESS, payload: res.data.filter(obj => {
      return obj.id !== id;
    }) })
  })
  .catch(err => {
    dispatch({ type: FETCHING_DATA_FAILURE, payload: err.response })
  })
}