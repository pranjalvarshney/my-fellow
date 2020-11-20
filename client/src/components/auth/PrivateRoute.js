import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/authContext/authContext";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const context = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        context.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
