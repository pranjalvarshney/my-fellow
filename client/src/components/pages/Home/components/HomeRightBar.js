import React from "react"
import { Contacts } from "./Contacts"
import { PollCard } from "./PollCard"

export const HomeRightBar = () => {
  return (
    <div className="home-right-bar">
      <PollCard />
      <br />
      <Contacts />
    </div>
  )
}
