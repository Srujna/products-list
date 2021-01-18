import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

export const GreenButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#21bf88"),
    backgroundColor: "#21bf88",
    "&:hover": {
      backgroundColor: "#30785b",
    },
  },
}))(Button);

export const Copyright = () => {
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
