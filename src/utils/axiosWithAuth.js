import axios from 'axios';
import { Redirect } from 'react-router-dom';

export const axiosWithAuth = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (!user) {
    console.log('is redirect working ', user)
    return <Redirect to='/' />
  }
  return axios.create({
    baseURL: 'http://localhost:4000/auth',
    headers: {
      Authorization: user.token,
    }
  });
}

// clear the token with logout
export const logout = () => {
  localStorage.clear();
  window.location.href = window.location.origin + '/';
  // return <Redirect to='/' />
}

