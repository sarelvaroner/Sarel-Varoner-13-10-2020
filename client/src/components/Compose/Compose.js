import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import { TextareaAutosize } from "@material-ui/core";

import { saveEmail, saveEmailFail } from "../../redux/actions/emails";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
    width: "100%",
  },

  header: {
    color: "orange",
    backgroundColor: "#092c09",
    textAlign: "center",
    width: "100%",
    padding: theme.spacing(2),
    borderRadius: "2%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  icon: {
    "&:hover": {
      backgroundColor: "orange",
      borderRadius: "50%",
      color: "#092c09",
    },
  },
  reachText: {
    height: 200,
  },
  content: {
    margin: 0,
    width: "100%",
    border: "white",
  },
  container: {
    width: "100%",
    border: "white",
  },
}));

export const Compose = () => {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const [to, setTo] = useState("");
  const [from, setFrom] = useState(user);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [fromErrorMessage, setFromErrorMessage] = useState("");
  const [toErrorMessage, setToErrorMessage] = useState("");
  const [toError, setToError] = useState(false);
  const [fromError, setFromError] = useState(false);

  const onToChange = (val) => {
    setTo(val);
  };

  const onFromChange = (val) => {
    setFrom(val);
  };
  
  const isToValid = () => {
    const result = to.length === 0;
    setToError(result);
    setToErrorMessage(result ? "please insert Sender ID here" : "");
    return !result;
  };

  const isFromValid = () => {
    const result = from.length === 0;
    setFromError(result);
    setFromErrorMessage(result ? "please insert Receiver ID here" : "");
    return !result;
  };

  const validateFields = () => {
    const isToOk = isToValid();
    const isFromOk = isFromValid();
    return isToOk && isFromOk;
  };

  const onSubmit = () => {
    try {
      if (!validateFields()) {
        return;
      }
      dispatch(saveEmail({ from, to, subject, content }));
      setContent("");
      setSubject("");
      setTo("");
      setFrom("");
      setContent("");
      history.goBack();
    } catch (e) {
      dispatch(saveEmailFail(e.message));
    }
  };

  useEffect(() => {
    setFrom(user);
  }, [user]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CloseIcon className={classes.icon} onClick={() => history.goBack()} />
        <span>New Email</span>
        <SendIcon className={classes.icon} onClick={onSubmit} />
      </div>
      <div className={classes.container}>
        <TextField
          error={fromError}
          helperText={fromErrorMessage}
          className={classes.textField}
          id="a"
          label="from"
          fullWidth
          value={from}
          onChange={(e) => onFromChange(e.target.value)}
          disabled={true}
        />
        <TextField
          error={toError}
          className={classes.textField}
          id="s"
          helperText={toErrorMessage}
          label="to"
          fullWidth
          value={to}
          onChange={(e) => onToChange(e.target.value)}
        />
        <TextField
          className={classes.textField}
          id="sf"
          label="subject"
          fullWidth
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <TextareaAutosize
          aria-label="minimum height"
          value={content}
          rowsMin={35}
          className={classes.content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
};
