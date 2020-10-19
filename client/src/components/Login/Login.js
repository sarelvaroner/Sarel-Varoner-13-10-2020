import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { loginError } from "../../redux/actions/ui";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { setCurrentUser } from "../../redux/actions/user";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "orange",
    backgroundColor: "#092c09",
    "&:hover": {
      color: "orange",
      backgroundColor: "#092c09",
    },
  },
}));

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [userId, setUserId] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isIdValid = () => {
    const isValidLetters = new RegExp("^[\u0590-\u05FF]+$").test(userId);
    setError(isValidLetters);
    setErrorMessage(isValidLetters ? "ID must be : a-z, A-Z, 1-9" : "");
    return isValidLetters;
  };

  const onLogin = async (e) => {
    try {
      e.preventDefault();
      if (userId.length === 0 || isIdValid()) {
        setUserId('')
        return;
      }
      else{
        dispatch(setCurrentUser(userId));
        history.push("/inbox");
      }
    } catch (err) {
      dispatch(loginError("there is a problem please try again"));
    }
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
        <form className={classes.form} noValidate onSubmit={onLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userId"
            label="User Id"
            name="email"
            autoComplete="userId"
            autoFocus
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            error={error}
            helperText={errorMessage}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Show My Emails
          </Button>
        </form>
      </div>
    </Container>
  );
}
