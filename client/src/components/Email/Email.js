import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Divider } from "@material-ui/core";
import * as moment from "moment";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 500,
    minHeight: "95vh",
    // padding: '10px'
  },

  pos: {
    marginBottom: 12,
    margin: 5,
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    margin: 2,
    padding: "10px",
  },
  content: {
    margin: 20,
    display: "flex",
    // justifyContent: "center",
    padding: "10px",
  },
  icon: {
    backgroundColor: "#092c09",
    color: "orange",
    borderRadius: "50%",
    margin: 15,
    "&:hover": {
      backgroundColor: "orange",
      color: "#092c09",
    },
  },
});

export default function Email() {
  let history = useHistory();

  const classes = useStyles();
  let { id } = useParams();
  const emails = useSelector((state) => state.emails.emails);
  const index = emails.findIndex((item) => item.id === id);
  const email = emails[index];

  return (
    <Card className={classes.root} variant="outlined">
      <CloseIcon className={classes.icon} onClick={() => history.goBack()} />

      <CardContent>
        <Typography variant="h5" component="h2" className={classes.pos}>
          {email.subject}
        </Typography>
        <Divider />
        <div className={classes.info}>
          <Typography className={classes.pos} color="textSecondary">
            {email.from}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {moment(email.createdAt).format("D-MM-YYYY  HH:mm")}
          </Typography>
        </div>
        <Divider />

        <div className={classes.content}>
          <Typography variant="body2" component="p">
            {email.content}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
