import React, { useContext } from "react";
import { AuthContext } from "context";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = props => {
  const authCtx = useContext(AuthContext);
  if (authCtx.isLogin()) {
    return <Route {...props} />;
  }
  return <Redirect to="/auth/login" />;
};

export default PrivateRoute;
