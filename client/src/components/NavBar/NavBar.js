import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import PersonIcon from "@material-ui/icons/Person";

import MenuIcon from "@material-ui/icons/Menu";
import { loginError, toggleMenu } from "../../redux/actions/ui";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-lodash-debounce";
import { setCurrentUser } from "../../redux/actions/user";
import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    color: "orange",
    backgroundColor: "#092c09",
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },

  userId: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  userIdIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    color: "orange",
    backgroundColor: "#204720",
    "&:hover": {
      color: "#204720",
      backgroundColor: "orange",
    },
  },
  rootError: {
    width: "20%",
    "& > * + *": {
      marginTop: theme.spacing(2),
      backgroundColor: "#f2c2c2",
      position: "absolute",
    },
  },
  wrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export const NavBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();

  const isSideBarOpen = useSelector((state) => state.ui.isSideBarOpen);
  const allowUpdateUser = useSelector((state) => state.ui.allowUpdateUser);
  const user = useSelector((state) => state.user.currentUser);
  const [userId, setUserId] = useState("");
  const debouncedUserId = useDebounce(userId, 1000);
  const [openError, setOpenError] = useState(false);

  useEffect(() => {
    setUserId(user);
  }, [user]);



  useEffect(() => {
    try {
      if (debouncedUserId.length === 0) {
        return;
      }

      if (new RegExp("^[\u0590-\u05FF]+$").test(debouncedUserId)) {
        setOpenError(true);
        setUserId("");
      } else {
        setOpenError(false);
        dispatch(setCurrentUser(debouncedUserId));
      }
    } catch (err) {
      dispatch(
        loginError("there is a problem with you User ID please try again")
      );
    }
  }, [debouncedUserId]);

  const handleDrawerOpen = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isSideBarOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: isSideBarOpen,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Email App
          </Typography>
          {user && (
            <Fab
              variant="extended"
              className={classes.extendedIcon}
              onClick={() => history.push("/compose")}
            >
              <AddIcon />
              New Email
            </Fab>
          )}
          {allowUpdateUser && (
            <div className={classes.userId}>
              <div className={classes.userIdIcon}>
                <PersonIcon />
              </div>
              <InputBase
                error={true}
                placeholder="User ID here"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "userId" }}
                onChange={(e) => setUserId(e.target.value)}
                value={userId || ""}
              />
            </div>
          )}
        </Toolbar>
        <div className={classes.wrapper}>
          <div className={classes.rootError}>
            <Collapse in={openError}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpenError(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                ID must be : a-z, A-Z, 1-9
              </Alert>
            </Collapse>
          </div>
        </div>
      </AppBar>
    </div>
  );
};
