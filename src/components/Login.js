import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import AuthService from "../services/AuthService";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import Header from "../components/Header";
import { GreenButton } from "../helpers/utils";

import {
  Typography,
  Avatar,
  CssBaseline,
  TextField,
  Box,
  Container,
  InputAdornment,
  Snackbar,
  IconButton
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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


const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="" color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [showMessageBar, setShowMessageBar] = useState(false);
  const currentUser = useState(AuthService.getCurrentUser());
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (currentUser[0]) history.push("/");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialState = {
    username: "",
    usernameError: "",
    password: "",
    passwordError: "",
    loading: false,
    message: "",
  };
  const [state, setState] = useState(initialState);

  const onChangeUsername = (e) => {
    setState({
      ...state,
      username: e.target.value,
      usernameError:
        e.target.value === "" || e.target.value === undefined
          ? "Username must not be empty"
          : "",
    });
  };

  const onChangePassword = (e) => {
    setState({
      ...state,
      password: e.target.value,
      passwordError:
        e.target.value === "" || e.target.value === undefined
          ? "Password must not be empty"
          : "",
    });
  };

  const messageBar = () => (
    <Snackbar
      open={showMessageBar}
      autoHideDuration={6000}
      onClose={() => setShowMessageBar(false)}
    >
      <Alert onClose={() => setShowMessageBar(false)} severity="error">
        {state.message}
      </Alert>
    </Snackbar>
  );

  const handleLogin = (e) => {
    e.preventDefault();

    const { username, usernameError, passwordError, password } = state;

    if (username === "") {
      setState({
        ...state,
        usernameError: "Username must not be empty",
      });
      return;
    } else
      setState({
        ...state,
        usernameError: "",
      });

    if (password === "") {
      setState({
        ...state,
        passwordError: "Password must not be empty",
      });
      return;
    } else
      setState({
        ...state,
        passwordError: "",
      });

    setState({
      ...state,
      message: "",
      loading: true,
    });

    if (
      username !== "" &&
      usernameError === "" &&
      password !== "" &&
      passwordError === ""
    ) {
      AuthService.login(username, password).then(
        (response) => {
          localStorage.setItem("secret-key", response.accessToken);
          history.push("/products");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setState({
            loading: false,
            message: resMessage,
          });
          setShowMessageBar(true);
        }
      );
    } else {
      setState({
        loading: false,
      });
    }
  };

  return (
    <div>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleLogin}>
            {" "}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="User name"
              autoComplete="false"
              value={state.username || ""}
              name="username"
              onChange={onChangeUsername}
              onBlur={(e) => {
                setState({
                  ...state,
                  usernameError:
                    e.target.value === "" || e.target.value === undefined
                      ? "Username must not be empty"
                      : "",
                });
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon />
                  </InputAdornment>
                ),
              }}
              error={state.usernameError !== ""}
              helperText={state.usernameError || ""}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type= {showPassword ? "text":"password"}
              id="password"
              autoComplete="false"
              value={state.password}
              onChange={onChangePassword}
              onBlur={(e) => {
                setState({
                  ...state,
                  passwordError:
                    e.target.value === "" || e.target.value === undefined
                      ? "Password must not be empty"
                      : "",
                });
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={state.passwordError !== ""}
              helperText={state.passwordError || ""}
            />
            <GreenButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.submit}
            >
              Sign In
            </GreenButton>
            {messageBar()}
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};

export default Login;
