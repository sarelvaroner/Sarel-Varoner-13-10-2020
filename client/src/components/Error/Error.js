import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

import { cleanError } from "../../redux/actions/ui";
import { setCurrentUser } from "../../redux/actions/user";

const useStyles = makeStyles((theme) => ({
  title: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing(4) ,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  content: {
    margin: 0,
    padding: theme.spacing(2),
  },
  action: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing(1),
  },
}));

export default function Error() {
  const [open, setOpen] = React.useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const message = useSelector((state) => state.ui.error);

  const handleClose = () => {
    setOpen(false);
    dispatch(cleanError());
    dispatch(setCurrentUser(null));
    history.push("/login");
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <MuiDialogTitle disableTypography className={classes.title}>
          <Typography variant="h6">{"Something went wrong"}</Typography>
          <IconButton
            aria-label="Close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <MuiDialogContent className={classes.content}>
          <Typography gutterBottom>{message}</Typography>
        </MuiDialogContent>
        <MuiDialogActions className={classes.action}>
          <Button onClick={handleClose} color="primary">
            To Login Page
          </Button>
        </MuiDialogActions>
      </Dialog>
    </div>
  );
}
