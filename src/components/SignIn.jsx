import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useForm, Controller } from "react-hook-form";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://eralpkor.com">
        eralpkor.com
      </Link>{" "}
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
}));

export default function SignIn(props) {
  const classes = useStyles();
  const { control, register, errors, handleSubmit,
     reset,
    } = useForm({ defaultValues: { username: '', password: ''}});

  const onSubmit = (data) => {
    axiosWithAuth()
      .post(`/login`, data)
      .then((res) => {
        console.log("This is response ", res);
        reset({ username: '', password: ''})

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.id);
        props.history.push('/home')
      })
      .catch((err) => console.log("Axios error ", err.response));
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

          {/* <TextField
          variant="outlined"
            margin="normal"

            rules={{ required: true }}
            inputRef={register}
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
      {errors.username && "username is required"}

          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}

            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
      {errors.username && "password is required"} */}

          {/* <FormControlLabel
            control={
              <Controller as={Checkbox} control={control} name="remember" color="primary" defaultValue={false} />}

             
             
            label="Remember me"
          /> */}

          {/* <FormControlLabel
            control={<Checkbox control={control} value="remember" color="primary" defaultValue={false} />}
            label="Remember me" 
          /> */}

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
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
