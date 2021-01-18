import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button
  } from "@material-ui/core";
import { GreenButton } from "../../helpers/utils";
  
  const AlertComponent = (props) => {
	const {
	  dialogHeader,
	  dialogMessage,
	  closeAction,
	  primaryAction,
	  closeLabel,
	  primaryLabel,
	  okOnly,
	} = props;
	return (
	  <Dialog
		open
		onClose={closeAction}
		aria-labelledby="alert-dialog-title"
		aria-describedby="alert-dialog-description"
	  >
		<DialogTitle id="alert-dialog-title">{dialogHeader}</DialogTitle>
		<DialogContent>
		  <DialogContentText id="alert-dialog-description">
			{dialogMessage}
		  </DialogContentText>
		</DialogContent>
		<DialogActions>
		  {!okOnly && (
			<Button onClick={closeAction} color="primary" autoFocus>
			  {closeLabel}
			</Button>
		  )}{" "}
		  {!okOnly && (
			<GreenButton
			  variant="contained"
			  onClick={primaryAction}
			  color="primary"
			  autoFocus
			>
			  {primaryLabel}
			</GreenButton>
		  )}{" "}
		  {okOnly && (
			<GreenButton
			  variant="contained"
			  onClick={closeAction}
			  color="primary"
			  autoFocus
			>
			  Ok
			</GreenButton>
		  )}
		</DialogActions>
	  </Dialog>
	);
  };
  
  export default AlertComponent;
  