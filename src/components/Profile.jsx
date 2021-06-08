import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import EditProfile from "./EditProfile";
import UserService from "../services/user.service";

import AuthService from "../services/auth.service";
import { updateUserInfo } from "../store/actions/auth";


const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "100%",
    // paddingLeft: "4rem",
    justifyContent: "center",
    // flexGrow: 1,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    // marginTop: "60px",
    // backgroundColor: "#cfe8fc",
    // height: "100vh",
    // height: "calc(100vh - 60px)",
    // height: "100vh",
    // flexGrow: 1,
  },
  profileContent: {
    margin: "10px 0 10px 0",
    // height: '2em',
    // background: 'blue'
  },
  submit: {
    height: "40px",
    width: "200px",
  },
  alertDanger: {
    marginTop: "20px"
  }
});

const Profile = (props) => {
  const classes = useStyles();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [showComponent, setShowComponent] = useState(false);
  const [user, setUser] = useState({});
  const { isExpired } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);

// console.log('is isExpired in ', message);


  const { message } = useSelector((state) => state.message);
  console.log('what is the message ', message);

  const dispatch = useDispatch();

  useEffect(() => {
    // if user not logged in or token expired redirect to login
    if (!currentUser) {
      props.history.push("/login");
      window.location.reload();
    }
    // else get user data
    UserService.getUserInfo()
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log("Error from profile ", err);
      });
  }, []);

  // handle empty fields
  let firstname = user.firstname;
  let lastname = user.lastname;
  let email = user.email;

  const editUser = (data) => {
    if (!data.firstname) {
      data.firstname = firstname;
    }
    if (!data.lastname) {
      data.lastname = lastname;
    }

    if (!data.email) {
      data.email = email;
    }
    
    dispatch(updateUserInfo(data))
      .then(res => {
        console.log('lets see if works', res);
        UserService.getUserInfo()
          .then((res) => {
            setUser(res.data);
          })
          .catch((err) => {
            console.log("Error from profile ", err);
          });
        // user updated successfully
        setShowComponent(!showComponent);

      }).catch(err => {
        console.log('NO shit it dont work', err);
        if (err.includes("Invalid token")) {
          console.log('what is error ', err)
          props.history.push("/login");
          window.location.reload();
        }
      })
  }

  const _onClick = () => {
    setShowComponent(!showComponent);
  };

  return (
    <div className={classes.root} >
      <CssBaseline />
      <Container maxWidth="xl" className={classes.content}>
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          style={{ textTransform: "uppercase" }}
        >
        
        </Typography>
        <div className={classes.profileContent}>
          <Typography variant="h6">Email: {user.email}</Typography>
        </div>
        <div className={classes.profileContent}>
          <Typography variant="h6">User Name: {user.username}</Typography>
        </div>
        <div className={classes.profileContent}>
          <Typography variant="h6">First Name: {user.firstname}</Typography>
        </div>
        <div className={classes.profileContent}>
          <Typography variant="h6">Last Name: {user.lastname}</Typography>
        </div>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
          onClick={_onClick}
        >
          Edit Profile
        </Button>
        {showComponent ? (
          <EditProfile
          username={user.username}
          firstname={user.firstname}
          lastname={user.lastname}
          email={user.email}
          edit={editUser}
          />
        ) : null}

        {message && (
          <div className={classes.alertDanger}  role="alert">
            {message}
          </div>
        )}
      </Container>
      
    </div>
  );
};

export default Profile;
