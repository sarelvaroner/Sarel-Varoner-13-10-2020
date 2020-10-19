import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { closeSuccessMessage } from "../../redux/actions/ui";

export const Success = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.ui.success);

  const handleClose = () => {
    dispatch(closeSuccessMessage());
  };

  return (
    <>
      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiAlert
          onClose={handleClose}
          severity="success"
          elevation={6}
          variant="filled"
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};
