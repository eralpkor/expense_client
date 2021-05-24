import React, { useEffect, useState } from "react";
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
import LandingPage from "./components/Landing";
// for dark theme
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange
} from "@material-ui/core/colors";


function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [darkState, setDarkState] = useState(false); // Dark mode
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
  // dark theme
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      typography: { useNextVariants: true },

      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      }
    }
  });

  const handleThemeChange = () => {
    setDarkState(!darkState);
  }
  

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  return (
    <Router history={history}>
      <div className="App">
    <ThemeProvider theme={darkTheme}>

        <Switch>
        <Route exact path='/landing' component={LandingPage} />
        <div>
          <Navigation 
            darkMode={handleThemeChange}
            checked={darkState}
            label={darkState ? "Go Light Mode" : "Go Dark Mode"}
          />
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
          <Switch>
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/home" component={UserHome} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <Route component={NotFoundPage} />
          </Switch>
          </div>
        </Switch>
      </ThemeProvider>

      </div>
    </Router>
  );
}

export default App;


  // useEffect(() => {
  //   if (currentUser) {
  //     setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
  //     setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
  //   }
  // }, [currentUser]);