import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LinkMe from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useForm, Controller } from "react-hook-form";
import ReCaptcha from './Captcha';

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
    color: "#bf1650"
  },
  navLink: {
    textDecoration: 'none',
    color: 'inherit'
  }
}));

export default function SignIn(props) {
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const classes = useStyles();
  const { control, register, errors, handleSubmit, reset } = useForm({
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = (data) => {
    console.log('ONSUBMIT', data);

    setLoading(true);
    
    dispatch(login(data.username, data.password))
      .then((res) => {
        props.history.push("/home");
        window.location.reload();
        console.log('User logged message: ', res);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Axios error ", message);
      });

    if (isLoggedIn) {
      return <Redirect to="/home" />;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
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
            rules={{ required: true }}
          />
          {errors.username && "Username is required!"}

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
            rules={{ required: true }}
          />
          {errors.password && "Password is required!"}


          {/* <FormControlLabel
            control={
              <Controller as={Checkbox} control={control} name="remember" color="primary" defaultValue={false} />}

             
             
            label="Remember me"
          /> */}

          {/* <FormControlLabel
            control={<Checkbox control={control} value="remember" color="primary" defaultValue={false} />}
            label="Remember me" 
          /> */}

          {message && (
              <div className={classes.alertDanger} role="alert">
                {message}
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
          
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to={'/register'} className={classes.navLink} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>

          
        </form>
        <ReCaptcha className={classes.paper} />

      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      
    </Container>
  );
}
