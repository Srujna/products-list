import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter, useHistory } from "react-router";
import img from "./logo.png";
import AuthService from "../../services/AuthService";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { fade } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    marginTop: "-50px",
    marginBottom: "-50px",
    width: "160px",
    cursor: "pointer",
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const Header = ({ register, profile }) => {
  const classes = useStyles();
  const history = useHistory();
  const currentUser = useState(AuthService.getCurrentUser());

  const logOut = () => {
    localStorage.removeItem("secret-key");
    AuthService.logout();
    history.push("/");
  };

  const signUp = () => {
    history.push("/register");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <div>
        <MenuItem>
          <IconButton aria-label="Logout" onClick={logOut}>
            <ExitToAppIcon />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
        {!profile && (
          <MenuItem
            onClick={() => {
              history.push("/profile");
            }}
          >
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
        )}
      </div>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        style={{ backgroundColor: "#2b2b2b", maxHeight: 70 }}
      >
        <Toolbar>
          <Tooltip title="Home">
            <img
              src={img}
              alt="logo"
              className={classes.logo}
              href="#"
              onClick={() => {
                history.push("/products");
              }}
            />
          </Tooltip>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {currentUser[0] ? (
              <div>
                <Tooltip title="Logout">
                  <IconButton aria-label="settings" onClick={logOut}>
                    <ExitToAppIcon style={{ color: "#f73f3d" }} />
                  </IconButton>
                </Tooltip>
                {!profile && (
                  <Tooltip title="Profile Information">
                    <IconButton
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={() => history.push("/profile")}
                      color="inherit"
                    >
                      <AccountCircle style={{ color: "#21bf88" }} />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            ) : (
              <div>
                {register ? (
                  <Tooltip title="Log in" aria-label="Sign up">
                    <IconButton
                      aria-label="settings"
                      onClick={() => history.push("/login")}
                    >
                      <LockOutlinedIcon style={{ color: "#f73f3d" }} />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Sign up" aria-label="Sign up">
                    <IconButton aria-label="settings" onClick={signUp}>
                      <PersonAddIcon style={{ color: "#f73f3d" }} />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            )}
          </div>
          <div className={classes.sectionMobile}>
            {currentUser[0] ? (
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            ) : (
              <div>
                {register ? (
                  <Tooltip title="Log in" aria-label="Sign up">
                    <IconButton
                      aria-label="settings"
                      onClick={() => history.push("/login")}
                    >
                      <LockOutlinedIcon style={{ color: "#f73f3d" }} />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Sign up" aria-label="Sign up">
                    <IconButton aria-label="settings" onClick={signUp}>
                      <PersonAddIcon style={{ color: "#f73f3d" }} />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default withRouter(Header);
