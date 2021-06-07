import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4000/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      console.log("response from auth.service ", response.data);
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

// update user info /update
const updateUserInfo = (users) => {
  return axios
    .put(
      API_URL + "update",
      {
        ...users,
      },
      { headers: authHeader() }
    )
    .then((response) => {
      console.log("response from updateUserInfo", response);
      return response.data;
    });
};
// new get users expenses
const getUserExpense = () => {
  return axios
    .get(API_URL + 'user',
      { headers: authHeader() }
    )
    .then(response => {
      console.log('response from user expense ', response);
    
      return response.data;
    })
}

const logout = () => {
  // localStorage.removeItem("user");
  localStorage.clear();
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  login,
  logout,
  updateUserInfo,
  getUserExpense,
};
