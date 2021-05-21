import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import NavSideBar from "./NavSideBar";
import First from "./First";
import Requests from "./components/Requests";
import Analytics from "./components/Analytics";
import Comment from "./components/Comment";
import Upgrade from "./components/Upgrade";
// import Error from "./components/Error";
import PrivateRoutes from "./PrivateRoutes";
import PrivateRoutes2 from "./PrivateRoute2";
import PrivateRoutes3 from "./PrivateRoute3";

function App() {
  return (
    <>
      <Router>
        <div id="containers">
          <PrivateRoutes path="/nav" component={NavSideBar} />
          <Switch>
            <PrivateRoutes exact path="/nav/dashboard" component={First} />
            <PrivateRoutes exact path="/nav/create" component={Requests} />
            <PrivateRoutes exact path="/nav/analytics" component={Analytics} />
            <PrivateRoutes2
              exact
              path="/nav/comments/:id"
              component={Comment}
            />
            <PrivateRoutes3 exact path="/nav/upgrade" component={Upgrade} />
            <PrivateRoutes2 exact path="/nav/comments" component={Comment} />
            {/* <PrivateRoutes exact path="*" component={Error} /> */}
          </Switch>
        </div>
        <Router>
          <Route exact path="/" component={Login} />
          
        </Router>
      </Router>
    </>
  );
}

export default App;
