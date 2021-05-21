import React,{useState, useEffect, ReactNode} from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { authAxios, accessToken } from "./helpers/helperFunc";

interface IProps {
  component: ReactNode;
  // any other props that come into the component
}
const PrivateRoutes = ({component:Component, ...rest}) => {

    const [requests, setRequests] = useState([]);

    const getRequests = async () => {
      try {
        const result = await authAxios.get("/requests");
        const requests = result.data.requests;
        console.log(requests);
        setRequests(requests);
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      getRequests();
    }, []);
    return (
        <Route {...rest} render={props=>document.cookie? <Component requests={requests} />: <Redirect to="/"/>}/>
    )
}

export default PrivateRoutes
