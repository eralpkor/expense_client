import React, { useEffect } from "react";
import { Router, Redirect } from "react-router-dom";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import SignIn from "./components/SignIn";
import UserHome from "./components/UserHome";
import PrivateRoute from "./utils/PrivateRoute";
import Register from "./components/Register";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "./store/actions/message";
import { history } from "./helpers/history";
import Profile from "./components/Profile";
import NotFoundPage from "./components/NotFoundPage"


function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  // useEffect(() => {
  //   if (currentUser) {
  //     setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
  //     setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
  //   }
  // }, [currentUser]);

  return (
    <Router history={history}>
      <div className="App">
        <Navigation />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return isLoggedIn ? (
                <Redirect to="/home" />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/home" component={UserHome} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
