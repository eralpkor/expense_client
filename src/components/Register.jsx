import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { register } from "../store/actions/auth";
import { Button, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alertDanger: {
    color: "red",
  },
  alertSuccess: {
    color: "blue"
  }

}));

const required = (value) => {
  if (!value) {
    return (
      <div className="alertDanger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!value) {
    return (
      <div className="alertDanger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alertDanger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alertDanger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default function Register() {
  const form = useRef();
  const checkBtn = useRef();
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(username, email, password))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Form onSubmit={handleRegister} ref={form} className={classes.form}>
            {!successful && (
              <div className="formGroup">
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Username"
                value={username}
                onChange={onChangeUsername}
                validations={[required, vusername]}
              />

              <TextField  
                variant="outlined"
                margin="normal"
                fullWidth
                label="Email"
                value={email}
                onChange={onChangeEmail}
                validations={[required, validEmail]}
              />

              <TextField  
                variant="outlined"
                margin="normal"
                fullWidth
                label="Password"
                value={password}
                onChange={onChangePassword}
                validations={[required, vpassword]}
              />

              <div>
                <Button 
                  type="sumbit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
              </div>
              </div>
            )}
            {message && (
              <div className={classes.form}>
              <div className={ successful ? classes.alertSuccess : classes.alertDanger} role="alert">
                {message}
              </div>
              </div>
              
            )}
            <CheckButton style={{ display: 'none' }} ref={checkBtn} />
          </Form>
        </div>
      </Container>
    </div>
  );
}
