import React, { useContext } from "react"
import { BrowserRouter, Switch } from "react-router-dom"
import { AuthContext } from "../../context/authContext/authContext"
import { PrivateRoute } from "../auth/PrivateRoute"
import { SimpleRoute } from "../auth/SimpleRoute"
import { Loading } from "../Loading_Backdrop/Loading"
import { Login } from "../Login/Login"
import { Signup } from "../Login/Signup"
import { Home } from "../pages/Home/Home"

export const Routing = () => {
  const context = useContext(AuthContext)
  console.log(context)
  return (
    <>
      {context.loading && <Loading />}
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <SimpleRoute exact path="/signup" component={Signup} />
          <SimpleRoute exact path="/signin" component={Login} />
        </Switch>
      </BrowserRouter>
    </>
  )
}
