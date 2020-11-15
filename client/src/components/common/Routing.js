import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Login } from "../Login/Login"
import { Signup } from "../Login/Signup"
import { Home } from "../pages/Home/Home"

export const Routing = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Login} />
      </Switch>
    </BrowserRouter>
  )
}
