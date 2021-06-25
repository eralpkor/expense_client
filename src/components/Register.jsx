import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { registerUser } from "../store/actions/auth";
import { Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import LinkMe from "@material-ui/core/Link";
import ReCaptcha from "./Captcha";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { PrimaryButton } from './PrimaryButton';
import { MainContainer } from './MainContainer';
import { Form } from './Form';
import { Input } from './Input';
import Grid from "@material-ui/core/Grid";

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email is not in correct format!')
    .required('Email is required!'),
  username: yup
    .string().min(4, 'Minimum of 4 chars required')
    .max(50, 'Not more than 50 chars')
    .required('Username is required'),
  password: yup
    .string().min(4, 'Minimum of 4 chars required')
    .max(50, 'Not more than 50 chars'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirm is required'),
});

const useStyles = makeStyles((theme) => ({
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
    color: "#bf1650",
  },
  alertSuccess: {
    color: "#3f51b5",
    fontSize: "2rem"
  },
  navLink: {
    textDecoration: "none",
    color: "inherit",
  },
  captcha: {
    marginTop: "25em",
    color: "#bf1650"
  }
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <LinkMe color="inherit" href="https://eralpkor.com">
        eralpkor.com
      </LinkMe>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Register(props) {
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const classes = useStyles();
  const { control, register, errors, handleSubmit,  } = useForm({
    defaultValues: {
      username: "", 
      email: "", 
      password: "" 
    },
      resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('ONSUBMIT', data);
    setSuccessful(false);

    dispatch(registerUser(data.username, data.email, data.password))
      .then((res) => {
        props.history.push("/login");
        setSuccessful(true);
        console.log("user registered, ", res);
        // reset();
      })
      .catch((err) => {
        console.log(err);
        setSuccessful(false);
      });
  };

  return (
    <MainContainer >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register for Expenses
        </Typography>
        <Form
          onSubmit={handleSubmit(onSubmit)}
        >
          {!successful && (
            <div>
              <Input
                ref={register}
                name='username'
                type='text'
                placeholder='Username'
                label="Username"
                error={!!errors.username}
                helperText={errors?.username?.message}
              />
              <Input
                ref={register}
                name='email'
                type='email'
                label='email@example.com'
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
              <Input
                ref={register}
                name='password'
                type='password'
                label='Password'
                error={!!errors.password}
                helperText={errors?.password?.message}
              />
              <Input
                ref={register}
                name='confirmPassword'
                type='password'
                label='Confirm Password'
                error={!!errors.confirmPassword}
                helperText={errors?.confirmPassword?.message}
              />
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alertSuccess" : "alert alertDanger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <PrimaryButton >Sign In</PrimaryButton>
          <Grid container>
            <Grid item xs>
              <Link to={"/forgotPassword"} 
              className={classes.navLink} 
              variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to={'/login'} className={classes.navLink} variant="body2">
                {"Do you have an account? Log in"}
              </Link>
            </Grid>
          </Grid>
        </Form>
        <ReCaptcha className={classes.captcha} />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </MainContainer>
  );
}

// EOF