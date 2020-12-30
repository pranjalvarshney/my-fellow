import React, { useReducer } from "react"
import { PollContext } from "./PollContext"

const PollState = ({ children }) => {
  const initialState = {
    polls: [],
    error: "",
    loading: true,
  }
  const [state, dispatch] = useReducer(PollContext, initialState)

  return <PollContext.Provider value={{}}>{children}</PollContext.Provider>
}
