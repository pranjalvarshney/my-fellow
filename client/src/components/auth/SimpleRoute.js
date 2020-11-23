import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { AuthContext } from "../../context/authContext/authContext"

export const SimpleRoute = ({ component: Component, ...rest }) => {
  const context = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={(props) =>
        !context.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  )
}
