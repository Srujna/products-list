import React from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router";

const ProtectedRoute = ({ children, ...rest }) => {
  const history = useHistory();

  if (!localStorage.getItem("secret-key")) history.push("/login");
  return <Route {...rest} render={() => children} />;

};
export default ProtectedRoute;
