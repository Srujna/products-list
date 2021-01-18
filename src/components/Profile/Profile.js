import React from "react";
import AuthService from "../../services/AuthService";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../Header";
import { Copyright } from "../../helpers/utils";
import AccountCircle from "@material-ui/icons/AccountCircle";

import {
  Typography,
  Avatar,
  CssBaseline,
  Box,
  Container,
} from "@material-ui/core";

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

const Profile = (props) => {
  const classes = useStyles();
  const currentUser = AuthService.getCurrentUser();
  return (
    <div>
      <Header profile/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircle />
          </Avatar>
          <Typography component="h1" variant="h5">
            Username: {currentUser.username}
          </Typography>
          <p>
            <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)}{" "}
            ...{" "}
            {currentUser.accessToken.substr(
              currentUser.accessToken.length - 20
            )}
          </p>
          <p>
            <strong>Id:</strong> {currentUser.id}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <strong>Authorities:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
          </ul>
        </div>
        <Box mt={8}>{Copyright()}</Box>
      </Container>
    </div>
  );
};

const ProfilePropTypes = {
  // always use prop types!
};

Profile.propTypes = ProfilePropTypes;

export default Profile;
