import React, { useContext } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { AuthContext } from "../../context/authContext/authContext"
import { PrivateRoute } from "../auth/PrivateRoute"
import { Loading } from "../Loading_Backdrop/Loading"
import { Login } from "../Login/Login"
import { Signup } from "../Login/Signup"
import { Home } from "../pages/Home/Home"

export const Routing = () => {
  const context = useContext(AuthContext)
  return (
    <>
      {context.loading && <Loading />}
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Login} />
        </Switch>
      </BrowserRouter>
    </>
  )
}
