import React, { useState } from "react";
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
  IconButton,
} from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { isEmail } from "validator";

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
};

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const initialState = {
    username: "",
    usernameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    successful: false,
    message: "",
  };

  const [state, setState] = useState(initialState);
  const [showMessageBar, setShowMessageBar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

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

  const onChangeEmail = (e) => {
    setState({
      ...state,
      email: e.target.value,
      emailError:
        e.target.value === "" || e.target.value === undefined
          ? "Email id must not be empty"
          : "",
    });
  };

  const onChangePassword = (e) => {
    setState({
      ...state,
      password: e.target.value,
      passwordError:
        e.target.value === "" || e.target.value === undefined
          ? " Password must not be empty"
          : "",
    });
  };

  const messageBar = () => (
    <Snackbar
      open={showMessageBar}
      autoHideDuration={6000}
      onClose={() => setShowMessageBar(false)}
    >
      <Alert
        onClose={() => setShowMessageBar(false)}
        severity={state.successful ? "success" : "error"}
      >
        {state.message}
      </Alert>
    </Snackbar>
  );

  const handleRegister = (e) => {
    e.preventDefault();

    const {
      username,
      usernameError,
      passwordError,
      password,
      email,
      emailError,
    } = state;

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

    if (email === "") {
      setState({
        ...state,
        emailError: "Email id must not be empty",
      });
      return;
    } else
      setState({
        ...state,
        emailError: "",
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
      successful: false,
    });
    if (
      username !== "" &&
      usernameError === "" &&
      email !== "" &&
      emailError === "" &&
      password !== "" &&
      passwordError === ""
    ) {
      AuthService.register(username, email, password).then(
        (response) => {
          setState({
            ...state,
            message: response.data.message,
            successful: true,
          });
          setShowMessageBar(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setState({
            ...state,
            successful: false,
            message: resMessage,
          });
          setShowMessageBar(true);
        }
      );
    }
  };

  return (
    <div>
      <Header register />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {!state.successful ? (
              <div>Sign up</div>
            ) : (
              <div>
                User sign up successful. Click{" "}
                <Link
                  component="a"
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  here
                </Link>{" "}
                to login{messageBar()}
              </div>
            )}
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleRegister}>
            {!state.successful && (
              <div>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
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
                          : e.target.value.length < 3 ||
                            e.target.value.length > 20
                          ? "Username must be between 3 and 20 characters."
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
                  id="email"
                  label="Email"
                  autoComplete="false"
                  value={state.email || ""}
                  name="email"
                  onChange={onChangeEmail}
                  onBlur={(e) => {
                    setState({
                      ...state,
                      emailError:
                        e.target.value === "" || e.target.value === undefined
                          ? "Email id must not be empty"
                          : !isEmail(e.target.value)
                          ? "Email id is not valid"
                          : "",
                    });
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={state.emailError !== ""}
                  helperText={state.emailError || ""}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
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
                          : e.target.value.length < 6 ||
                            e.target.value.length > 40
                          ? "Password must be between 6 and 40 characters."
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
                  Sign Up
                </GreenButton>
                {messageBar()}
              </div>
            )}
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};

export default Register;
