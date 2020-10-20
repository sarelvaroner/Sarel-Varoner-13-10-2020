import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Pagination from "@material-ui/lab/Pagination";

import { getEmails, setSkip } from "../../redux/actions/emails";
import { EmailListItem } from "../EmailListItem/EmailListItem";
import Error from "../Error/Error";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import { setUpdateUser } from "../../redux/actions/ui";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "86vh",
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },


  centered: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  empty: {
    backgroundColor: theme.palette.background.paper,
    textAlign: "center",
    height: "100%",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: " translate(-50%, 0)",
    color: "#092c09",
    fontSize: '1.2rem',
    "@media (max-width:600px)": {
      padding:0,
      fontSize: '1.2rem'
    },
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
  },
  pagination: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
    position: "fixed",
    bottom: 25,
    display:'flex',
    justifyContent:'center',
    width: '-webkit-fill-available'
  },
}));

export const EmailList = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.emails.emails);
  const loading = useSelector((state) => state.ui.loading);
  const error = useSelector((state) => state.ui.error);
  const userId = useSelector((state) => state.user.currentUser);
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const limit = 11;

  useEffect(() => {
    dispatch(setUpdateUser(true));
    dispatch(getEmails());
    const interval = setInterval(() => {
      dispatch(getEmails());
    }, 40000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPage(1);
    dispatch(getEmails());
  }, [userId]);

  useEffect(() => {
    dispatch(setSkip((page - 1) * limit));
  }, [page]);

  return (
    <div className={classes.root}>
      <div className={classes.centered}>{loading && !error && <Loading />}</div>
      <List component="nav" aria-label="main mailbox folders">
        {!loading &&
          !error &&
          Array.isArray(emails) &&
          emails.length > 0 &&
          emails.map((email) => <EmailListItem email={email} key={email.id} />)}
        {error && (
          <Error message={"There is problem at this moment please try later"} />
        )}
      </List>
      {!error && !loading && Array.isArray(emails) && emails.length === 0 && (
        <div className={classes.empty}>There is no emails to show</div>
      )}
      <div className={classes.pagination}>
        <Pagination
          count={3}
          variant="outlined"
          shape="rounded"
          onChange={(e, page) => setPage(page)}
          page={page}
        />
      </div>
    </div>
  );
};
