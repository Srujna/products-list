import {
  Dialog,
  DialogContent,
  DialogContentText,
  useMediaQuery,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

import { useTheme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const DialogComponent = (props) => {
  const {
    dialogHeader,
    dialogMessage,
    closeAction,
  } = props;
  const classes = useStyles();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Dialog
      fullScreen={fullScreen}
      open
      onClose={closeAction}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <AppBar
        className={classes.appBar}
        style={{
          backgroundColor: "#2b2b2b",
          maxHeight: 70,
          color: "#21bf88",
        }}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {dialogHeader}
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={closeAction}
            aria-label="close"
          >
            <CloseIcon style={{ color: "#f73f3d" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Container>{dialogMessage}</Container>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
