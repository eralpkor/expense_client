import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');

  return axios.create({
    baseURL: 'http://localhost:4000/auth',
    headers: {
      Authorization: token,
    }
  });
}

// clear the token with logout
export const logout = () => {
  localStorage.clear();
  window.location.href = window.location.origin + '/logout';
}

