import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

// import { logout } from '../utils/axiosWithAuth';

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/auth";
import { Link } from "react-router-dom";


const useStyles = makeStyles(theme => ({
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
    textDecoration: 'none',
    color: 'inherit'
  }
}));

export default function Navigation() {
  const { isLoggedIn } = useSelector(state => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();



  const classes = useStyles();
  const [auth, setAuth] = React.useState(isLoggedIn); // if logged switch
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {

console.log('Navigation button change ', event.target.checked);
console.log('is logged in ', isLoggedIn)
    if (auth) {
      console.log(auth);
    setAuth(event.target.checked);

      // clear localStorage and got to signIn page
      dispatch(logout())
    }
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <FormGroup>
        <FormControlLabel
          control={<Switch 
          checked={auth} 
          onChange={handleChange} 
          aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}

          
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Expenses
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
              {currentUser.user}
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
              <Link to={'/profile'} className={classes.navLink}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </Link>
              <Link to={'/home'} className={classes.navLink}>
                <MenuItem onClick={handleClose}>My expenses</MenuItem>
              </Link>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}