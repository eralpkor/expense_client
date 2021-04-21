import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/auth";
import { Link } from "react-router-dom";
// for dark theme
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange
} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navLink: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default function Navigation() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);
console.log(currentUser);
  const dispatch = useDispatch();

  const classes = useStyles();
  const [darkState, setDarkState] = useState(false); // Dark mode
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];

  const [auth, setAuth] = useState(isLoggedIn); // if logged switch
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // dark theme
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      }
    }
  });
  // dark theme function
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  const handleChange = (event) => {
    if (auth) {
      setAuth(event.target.checked);

      // clear localStorage and go to signIn page
      dispatch(logout());
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>

    <ThemeProvider theme={darkTheme}>
      <div> Dark Mode </div>
      <Switch checked={darkState} onChange={handleThemeChange} />
      <FormControlLabel 
      control={
            <Switch
              checked={darkState}
              onChange={handleThemeChange}
              aria-label="darkMode switch"
            />
          }
          label={darkState ? "Go Light Mode" : "Go Dark Mode"}
      />
    </ThemeProvider>

      
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Expenses
          </Typography>
          <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? `Logout ${currentUser.firstname}` : "Login"}
        />
      </FormGroup>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {/* {currentUser.user} */}
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <Link to={"/profile"} className={classes.navLink}>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>
                <Link to={"/home"} className={classes.navLink}>
                  <MenuItem onClick={handleClose}>My expenses</MenuItem>
                </Link>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
