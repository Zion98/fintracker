import React,{useState, useEffect, ReactNode} from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// import { accessToken } from "./helpers/helperFunc";
// import jwt_decode from "jwt-decode";

interface IProps {
    component: ReactNode;
    // any other props that come into the component
}

const PrivateRoutes2 = ({component:Component, ...rest}) => {

    return (
        <Route {...rest} render={props=>document.cookie? <Component  />: <Redirect to="/"/>}/>
    )
}

export default PrivateRoutes2;
