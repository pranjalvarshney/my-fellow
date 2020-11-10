import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Home } from "../pages/Home/Home"

export const Routing = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  )
}
