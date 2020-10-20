import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { PrivateRoute } from "./components/PrivateRout/PrivateRout";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { NavBar } from "./components/NavBar/NavBar";
import {  makeStyles } from "@material-ui/core";
import { Inbox } from "./components/Inbox/Inbox";
import { Sent } from "./components/Sent/Sent";
import { All } from "./components/All/All";
import Login from "./components/Login/Login";
import { Compose } from "./components/Compose/Compose";
import Email from "./components/Email/Email";
import { Success } from "./components/Success/Success";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    "@media (max-width:600px)": {
      padding:0,
    },
  },
}));

function App() {
  const classes = useStyles();


  return (
    <div className="App">
      <Router>
        <Switch>
          <>
            <div className={classes.root}>
              <NavBar />
              <Sidebar />
              {true && (
                <main className={classes.content}>
                  <div className={classes.toolbar} />
                  <Route exact path="/">
                    <PrivateRoute component={Inbox} />
                  </Route>
                  <Route path="/inbox">
                    <PrivateRoute component={Inbox} />
                  </Route>
                  <Route path="/sent">
                    <PrivateRoute component={Sent} />
                  </Route>
                  <Route path="/all">
                    <PrivateRoute component={All} />
                  </Route>
                  <Route path="/login">
                    <Login />
                  </Route>
                  <Route path="/compose">
                    <PrivateRoute component={Compose} />
                  </Route>
                  <Route path="/email/:id">
                    <PrivateRoute component={Email} />
                  </Route>
                </main>
              )}
            </div>
          </>
        </Switch>
      </Router>
      <Success/>
    </div>
  );
}

export default App;
