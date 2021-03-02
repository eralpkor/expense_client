import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { registerUser } from "../store/actions/auth";
import { Button, TextField, Typography } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import LinkMe from "@material-ui/core/Link";
import ReCaptcha from "./Captcha";

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
  // const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const classes = useStyles();
  const { control, register, errors, handleSubmit, reset } = useForm(
    {
    defaultValues: { username: "", email: "", password: "" },
  }
  );

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
  console.log(errors);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register for Expenses
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          {!successful && (
            <div>
              <Controller
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                required
                inputRef={register}
                label="Username"
                autoFocus
                name="username"
                control={control}
                rules={{ 
                  required: true,
                  minLength: {
                  value: 5,
                  message: "min length is 5"
                },
                maxLength: {
                  value: 50,
                  message: "max length is 50"
                } 
                }}
                
              />
              {errors.username && 
              errors.username.type === "required" &&
              <span role="alert">Username is required!</span>}
              {errors.username && <span role="alert">{errors.username.message}</span>}

              <Controller 
              as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                required
                inputRef={register}
                label="Email"
                autoFocus
                name="email"
                control={control}
                rules={{ 
                  required: true,
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format"
                  }
                }}
                type='email'
                placeholder='example@mail.com'
              />
              {errors.email &&
              errors.email.type === "required" &&
              "Email is required."}
              {errors.email && <span role="alert">{errors.email.message}</span>}
            <Controller
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              required
              label="Password"
              type="password"
              name="password"
              control={control}
              rules={{
                required: true,
                
                minLength: {
                  value: 5,
                  message: "min length is 5"
                },
                maxLength: {
                  value: 50,
                  message: "max length is 50"
                }
              }}
            />
            {errors.password &&
              errors.password.type === "required" &&
              "Password is required."}
            {errors.password &&
             <span role="alert">{errors.password.message}</span>}
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
        <ReCaptcha className={classes.captcha} />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}


// test 
  // const [user, setUser] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  // })

  // const handleChange = (e) => {
  //   setUser({
  //     ...user,
  //     [e.target.name]: e.target.value,
  //   })
  // }

  // const handleSubmit = (e) => {
  //   console.log('SUbmitted ', user);
  //   e.preventDefault();

  //   dispatch(register(user.username, user.email, user.password))
  //     .then(res => {
  //       console.log('submit with success ', res);
  //     })
  // }

    // return (
  //   <div>
  //     <form onSubmit={handleSubmit} >
  //       <input type="text"
  //         name='username'
  //        value={user.username} onChange={handleChange} />
  //       <input type="email"
  //         name="email"
  //        value={user.email} onChange={handleChange} />
  //       <input type="password"
  //         name="password"
  //        value={user.password} onChange={handleChange} />

  //       <input type="submit" value="Submit" />
  //     </form>
  //   </div>
  // )
