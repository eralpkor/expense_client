import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4000/auth/";

// user info for /profile page
const getUserInfo = () => {
  return axios.get(API_URL + "profile", { headers: authHeader() });
};

const updateUserInfo = () => {
  return axios.put(API_URL + "update", { headers: authHeader() })
};

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
// used for calling db for expenses
const getUserExpense = () => {
  // can we check if user have any expense here?
  
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getAdminExpense = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPublicContent,
  getUserExpense,
  getAdminExpense,
  getUserInfo,
  
};