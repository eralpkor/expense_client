// method for retrieving data from server.
// HTTP request needs Authorization header.
// check Local Storage for user item. If there is a logged in user with accessToken (JWT), return HTTP Authorization header. Otherwise, return an empty object.
// import { SET_MESSAGE, CLEAR_MESSAGE } from "../store/actions/types";
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

// Check if token expired
const isTokenExpired = () => {
  let isExpired = true;
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    jwt.verify(user.token, JWT_SECRET, (err, decoded) => {
      console.log("What is error message ", err);
      err ? isExpired = true : isExpired = false;
    });
  }
  return isExpired;
};

console.log("What is isExpired ", isTokenExpired());

const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token && !isTokenExpired()) {
    return { Authorization: user.token };
  } else {
    return {};
  }
};


export {
  authHeader as default,
  isTokenExpired,
}

//EOF
