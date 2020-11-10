import React from "react"
import { Header } from "../Header/Header"

export const Base = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
