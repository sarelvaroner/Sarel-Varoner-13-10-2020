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
  },
  icon: {
    marginTop: "17px",
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
              primary={
                <div style={{ width: 350, whiteSpace: "nowrap" }}>
                  <Box
                    component="div"
                    my={2}
                    textOverflow="ellipsis"
                    overflow="hidden"
                  >
                    {index !== 3 ? field : moment(field).format("MMM-D")}
                  </Box>
                </div>
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
