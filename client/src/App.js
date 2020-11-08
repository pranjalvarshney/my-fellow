import React from "react"
import "./App.css"
import { Routing } from "./components/common/Routing"
import { AuthState } from "./context/authContext/AuthState"

export const App = () => {
  return (
    <AuthState>
      <Routing />
    </AuthState>
  )
}
