import React from "react";
import { useDispatch } from "react-redux";
import { deleteEmail, setSelectedEmail } from "../../redux/actions/emails";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import * as moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
    "@media (max-width:600px)": {
      flexDirection: "column",
      // width: "-webkit-fill-available",
    },
  },
  texts: {
    width: '350px',
    "@media (max-min:600px)": {
      // width: '100px',
    },
    "@media (max-width:600px)": {
      width: '100px',

      padding: 0,
      margin: 0,
    },
  },
  icon: {
    marginTop: "17px",
  },
  fonts: {
    "@media (max-width:600px)": {
      fontSize: "1rem",
    },
    "@media (min-width:600px)": {
      fontSize: "1.2rem",
    },
  },
}));

export const EmailListItem = ({ email }) => {
  let history = useHistory();

  const classes = useStyles();
  const dispatch = useDispatch();

  const deleteMessage = (id, e) => {
    try {
      e.stopPropagation();
      dispatch(deleteEmail(id));
    } catch (e) {}
  };

  const onSelectedEmail = () => {
    history.push(`/email/${email.id}`);
    dispatch(setSelectedEmail(email));
  };

  return (
    <>
      <ListItem
        alignItems="flex-start"
        button
        onClick={onSelectedEmail}
        className={classes.root}
      >
        {[email.from, email.subject, email.content, email.createdAt].map(
          (field, index) => (
            <ListItemText
              key={field + Math.random()}
              className={classes.texts}
              primary={
                // <div sclassName={classes.fonts}tyle={{  whiteSpace: "nowrap" }}>
                <Box
                  component="div"
                  my={2}
                  textOverflow="ellipsis"
                  overflow="hidden"
                  className={classes.fonts}
                >
                  {index !== 3 ? field : moment(field).format("MMM-D")}
                </Box>
                // </div>
              }
            />
          )
        )}
        <ListItemIcon className={classes.icon}>
          <DeleteIcon onClick={(e) => deleteMessage(email.id, e)} />
        </ListItemIcon>
      </ListItem>
      <Divider />
    </>
  );
};
