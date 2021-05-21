import React, { useState, useEffect, ReactNode } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import useFetch from "./helpers/useFetch";
// import useFetch2 from "./helpers/useFetch2";
interface IProps {
  component: ReactNode;
  // any other props that come into the component
}
const PrivateRoute3 = ({ component: Component, ...rest }) => {
  const allUsers = useFetch("allusers");
  const allAdmins = useFetch("alladmins");
  const allAgents = useFetch("allagents");

  return (
    <Route
      {...rest}
      render={(props) =>
        document.cookie ? (
          <Component
            allUsers={allUsers}
            allAdmins={allAdmins}
            allAgents={allAgents}
          />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute3;
